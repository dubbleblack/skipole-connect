import assert from "node:assert/strict";
import { existsSync, readFileSync, mkdtempSync, cpSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, resolve, join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const json = (path) => JSON.parse(readFileSync(path, "utf8"));

test("repository marketplace resolves the existing plugin in a clean package copy", () => {
  const marketplace = json(join(root, ".cursor-plugin/marketplace.json"));
  assert.equal(marketplace.plugins.length, 1);
  const entry = marketplace.plugins[0];
  assert.equal(entry.source, "cursor");
  assert.equal(entry.name, "skipole-connect");
  assert.ok(!entry.source.includes("..") && !entry.source.startsWith("/"));
  const temp = mkdtempSync(join(tmpdir(), "skipole-cursor-package-"));
  try {
    cpSync(join(root, entry.source), temp, { recursive: true });
    const manifest = json(join(temp, ".cursor-plugin/plugin.json"));
    assert.equal(manifest.name, entry.name);
    assert.match(manifest.version, /^\d+\.\d+\.\d+(?:-[a-z0-9.-]+)?$/);
    assert.equal(manifest.repository, "https://github.com/dubbleblack/skipole-connect");
    for (const path of [manifest.logo, "mcp.json", "skills/skipole/SKILL.md", "README.md", "LICENSE"]) {
      assert.ok(path && !path.includes("..") && !path.startsWith("/"));
      assert.ok(existsSync(join(temp, path)), `missing ${path}`);
    }
    const skill = readFileSync(join(temp, "skills/skipole/SKILL.md"), "utf8");
    assert.match(skill, /^---\nname: skipole\ndescription: [^\n]+\n---/);
    assert.match(skill, /human payment approval/i);
    assert.match(skill, /skipole_quote_purchase/);
    assert.match(skill, /orders:read/);
    assert.match(skill, /not independently verified/);
  } finally {
    rmSync(temp, { recursive: true, force: true });
  }
});

test("MCP configuration uses the existing OAuth endpoint without embedded credentials", () => {
  const config = json(join(root, "cursor/mcp.json"));
  assert.deepEqual(config, {
    mcpServers: { skipole: { url: "https://skipole-data-platform.replit.app/mcp" } },
  });
  assert.equal(config.mcpServers.skipole.headers, undefined);
  assert.equal(config.mcpServers.skipole.command, undefined);
});

import assert from "node:assert/strict";
import { existsSync, readFileSync, mkdtempSync, cpSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, resolve, join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { createHash } from "node:crypto";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const json = (path) => JSON.parse(readFileSync(path, "utf8"));

test("integration branding uses the exact owner-approved PNG", () => {
  const manifest = json(join(root, "cursor/.cursor-plugin/plugin.json"));
  assert.equal(manifest.logo, "assets/skipole-icon-512.png");
  const bytes = readFileSync(join(root, "cursor", manifest.logo));
  assert.equal(bytes.subarray(0, 8).toString("hex"), "89504e470d0a1a0a");
  assert.equal(bytes.readUInt32BE(16), 512);
  assert.equal(bytes.readUInt32BE(20), 512);
  assert.equal(createHash("sha256").update(bytes).digest("hex"),
    "10398663c2cc6735a0aaa375349fea7e94a7c127767527ea333531dd04d062fa");
  const registry = json(join(root, "registry/server.json"));
  assert.deepEqual(registry.icons, [{
    src: "https://raw.githubusercontent.com/dubbleblack/skipole-connect/main/cursor/assets/skipole-icon-512.png",
    mimeType: "image/png",
    sizes: ["512x512"],
  }]);
  assert.equal(existsSync(join(root, "cursor/assets/skipole-mark.svg")), false);
});

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

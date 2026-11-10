import { cp, mkdir, rm } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const packageRoot = resolve(scriptDirectory, "..");
const sourceRoot = resolve(packageRoot, "src");
const distRoot = resolve(packageRoot, "dist");
const licensePath = resolve(packageRoot, "..", "LICENSE");

await rm(distRoot, { recursive: true, force: true });
await mkdir(distRoot, { recursive: true });
await cp(resolve(sourceRoot, "index.js"), resolve(distRoot, "index.js"));
await cp(resolve(sourceRoot, "index.d.ts"), resolve(distRoot, "index.d.ts"));
await cp(licensePath, resolve(packageRoot, "LICENSE"));

console.error("Built @skipole/sdk into dist/.");

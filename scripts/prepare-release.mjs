import { copyFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const packageRoot = resolve(scriptDirectory, "..");
const sourceLicense = resolve(packageRoot, "LICENSE");
const destinations = [
  "javascript/LICENSE",
  "python/LICENSE",
  "cursor/LICENSE",
];

for (const relativePath of destinations) {
  const target = resolve(packageRoot, relativePath);
  await mkdir(dirname(target), { recursive: true });
  await copyFile(sourceLicense, target);
}

console.log("Prepared Apache-2.0 license files for the SDKs and Cursor package.");

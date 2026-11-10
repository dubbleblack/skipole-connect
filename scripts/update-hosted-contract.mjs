// Maintainer-only: copy the cash API contract from the monorepo, without private account/operator paths.
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
const source = await readFile(fileURLToPath(new URL("../../../lib/api-spec/openapi.yaml", import.meta.url)), "utf8");
const destination = fileURLToPath(new URL("../openapi.yaml", import.meta.url));
let target = await readFile(destination, "utf8");
function block(text, label, indent) {
  const lines = text.split("\n"), prefix = " ".repeat(indent);
  const start = lines.indexOf(`${prefix}${label}:`);
  if (start < 0) throw new Error(`Contract block missing: ${label}`);
  let end = start + 1;
  while (end < lines.length && (!lines[end].trim() || lines[end].startsWith(prefix + " "))) end++;
  return lines.slice(start, end).join("\n") + "\n";
}
for (const path of ["/v1/customer/purchase-quotes", "/v1/customer/purchases/{idempotencyKey}",
  "/v1/customer/orders/{orderId}", "/v1/customer/orders/{orderId}/csv"]) {
  if (target.includes(`  ${path}:\n`)) target = target.replace(block(target, path, 2), "");
  const item = block(source, path, 2).replace(/^(    (?:get|post):\n)/m,
    "$1      security:\n        - skipoleApiKey: []\n");
  target = target.replace("paths:\n", `paths:\n${item}`);
}
for (const schema of ["HostedPurchaseInput", "HostedPurchaseQuote", "HostedPurchaseOrder"]) {
  if (target.includes(`    ${schema}:\n`)) target = target.replace(block(target, schema, 4), "");
  target = target.replace("  schemas:\n", `  schemas:\n${block(source, schema, 4)}`);
}
await writeFile(destination, target);
console.log("Updated public cash-purchase API contract without private routes.");

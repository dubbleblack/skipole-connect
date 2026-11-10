import { SkipoleClient } from "../src/index.js";

const skipole = new SkipoleClient();
const products = await skipole.listProducts();

for (const product of products) {
  console.log(`${product.name}: ${product.status}`);
}

if (products.length === 0) {
  console.log("No catalog categories were returned.");
}

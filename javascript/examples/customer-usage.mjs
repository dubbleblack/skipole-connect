import { SkipoleClient } from "../src/index.js";

const apiKey = process.env.SKIPOLE_API_KEY;
if (!apiKey) {
  throw new Error("Set SKIPOLE_API_KEY in the server-side secret manager.");
}

const skipole = new SkipoleClient({ apiKey });
const usage = await skipole.getUsage();
console.log({
  creditsAvailable: usage.creditsAvailable,
  periodStart: usage.periodStart,
  usageByMetric: usage.usageByMetric,
  rateLimit: usage.rateLimit,
});

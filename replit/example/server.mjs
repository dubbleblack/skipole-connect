import express from "express";
import { SkipoleClient } from "@skipole/sdk";

const app = express();
const port = Number(process.env.PORT || 3000);

app.get("/api/skipole/catalog", async (_req, res) => {
  try {
    const client = new SkipoleClient();
    res.json(await client.listProducts());
  } catch (error) {
    res.status(502).json({ error: "Skipole catalog is temporarily unavailable." });
  }
});

app.get("/api/skipole/usage", async (_req, res) => {
  const user = _req.user;
  if (!user?.isSkipoleCustomerAdmin) {
    res.status(401).json({
      error: "Sign in and authorize this customer workspace first.",
    });
    return;
  }
  const apiKey = process.env.SKIPOLE_API_KEY;
  if (!apiKey) {
    res.status(503).json({ error: "Add the SKIPOLE_API_KEY Replit Secret first." });
    return;
  }
  try {
    const client = new SkipoleClient({ apiKey });
    res.json(await client.getUsage());
  } catch (error) {
    res.status(502).json({ error: "Skipole usage could not be loaded." });
  }
});

app.listen(port, "0.0.0.0", () => {
  console.info(`Skipole Replit example listening on port ${port}`);
});

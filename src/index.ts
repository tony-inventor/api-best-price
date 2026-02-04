// src/index.ts
import "dotenv/config";
import express from "express";

// Type-safe environment variables
const nodeEnv = process.env.NODE_ENV || "development";
const port = parseInt(process.env.PORT || "3000", 10);

console.log("Environment:", nodeEnv);
console.log("Port:", port);

// Express app with TypeScript
const app: express.Express = express();

// Define route handler types
app.get("/", (req: express.Request, res: express.Response) => {
  res.json({
    environment: nodeEnv,
    app: "My App",
    timestamp: new Date().toISOString(),
    port: port,
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running in ${nodeEnv} mode on port ${port}`);
});

// Handle shutdown gracefully
process.on("SIGTERM", () => {
  console.log("SIGTERM signal received: closing HTTP server");
  process.exit(0);
});

process.on("SIGINT", () => {
  console.log("SIGINT signal received: closing HTTP server");
  process.exit(0);
});

// Export app for testing
export default app;

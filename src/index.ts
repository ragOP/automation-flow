import express, { Express, Request, Response } from "express";
import cors from "cors";
import { ENV } from "./config/env";

const app: Express = express();
const port: number = Number(ENV.PORT) || 8000;

import router from "./router/index";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use("/api", router);

app.get("/health", (req: Request, res: Response) => {
  res.send("Server is up and running!");
});

app.use((req: Request, res: Response) => {
  res.status(404).send("Route not found");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

// Import and start workers
import "./workers/index";

console.log("⚙ Worker started in same process...");
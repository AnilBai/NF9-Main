import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import contactRouter from "./routes/contact.js";

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 3000);

if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
  console.warn("⚠️ SMTP credentials are not fully configured. Email sending will fail.");
}

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api", contactRouter);

app.listen(port, () => {
  console.log(`Contact API server running at http://localhost:${port}`);
});

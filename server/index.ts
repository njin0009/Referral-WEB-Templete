import cors from "cors";
import express from "express";
import { z } from "zod";
import { jobs, profile } from "../src/data/site-data.js";

const app = express();
const port = Number(process.env.PORT ?? 8787);

const messageSchema = z.object({
  name: z.string().min(1).max(80),
  email: z.string().email().max(120),
  message: z.string().min(4).max(1200),
});

type Message = z.infer<typeof messageSchema> & {
  id: string;
  createdAt: string;
};

const messages: Message[] = [];

app.use(cors());
app.use(express.json());

app.get("/api/profile", (_req, res) => {
  res.json(profile);
});

app.get("/api/jobs", (_req, res) => {
  res.json(jobs);
});

app.get("/api/messages", (_req, res) => {
  res.json(messages);
});

app.post("/api/messages", (req, res) => {
  const parsed = messageSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({ error: "Invalid message payload", issues: parsed.error.flatten() });
    return;
  }

  const message: Message = {
    ...parsed.data,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };

  messages.unshift(message);
  res.status(201).json(message);
});

app.listen(port, "127.0.0.1", () => {
  console.log(`API ready on http://127.0.0.1:${port}`);
});

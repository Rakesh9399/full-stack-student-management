import express from "express";
import cors from "cors";

import studentRoutes from "./routes/studentRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/v1", studentRoutes);

export default app;
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import userRoutes from './routes/userRoutes.js';
import analysisRoutes from './routes/analysisRoutes.js';

const app = express();

app.use(express.json());

app.get("/", (req, res) => res.send("Hello Backend!"));

app.use('/api/users', userRoutes);
app.use('/api/analysis', analysisRoutes);

app.listen(3000, () => console.log("Server running on port 3000"));
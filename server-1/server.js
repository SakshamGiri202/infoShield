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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
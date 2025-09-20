import express from 'express';
import { analyzeText, analyzeImage, analyzeVideo } from '../controllers/analysisController.js';

const router = express.Router();

router.post('/text', analyzeText);
router.post('/image', analyzeImage);
router.post('/video', analyzeVideo);

export default router;
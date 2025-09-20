import { LanguageServiceClient } from '@google-cloud/language';
import { ImageAnnotatorClient } from '@google-cloud/vision';
import { VideoIntelligenceServiceClient } from '@google-cloud/video-intelligence';

// Make sure to set GOOGLE_APPLICATION_CREDENTIALS in your environment
const client = new LanguageServiceClient();
const visionClient = new ImageAnnotatorClient();
const videoClient = new VideoIntelligenceServiceClient();

export const analyzeText = async (req, res) => {
    const { text } = req.body;

    if (!text) {
        return res.status(400).json({ message: 'Text is required' });
    }

    try {
        const document = {
            title: text,
            content: text,
            type: 'PLAIN_TEXT',
        };

        const [result] = await client.analyzeSentiment({ document });
        const sentiment = result.documentSentiment;

        res.status(200).json({
            message: 'Text analysis successful',
            sentiment: sentiment,
        });
    } catch (error) {
        console.error('Error analyzing text:', error);
        res.status(500).json({ message: 'Error analyzing text' });
    }
};

export const analyzeImage = async (req, res) => {
    const { imageUrl } = req.body;

    if (!imageUrl) {
        return res.status(400).json({ message: 'Image URL is required' });
    }

    try {
        const [result] = await visionClient.webDetection(imageUrl);
        const webDetection = result.webDetection;

        res.status(200).json({
            message: 'Image analysis successful',
            webDetection: webDetection,
        });
    } catch (error) {
        console.error('Error analyzing image:', error);
        res.status(500).json({ message: 'Error analyzing image' });
    }
};

export const analyzeVideo = async (req, res) => {
    const { gcsUri } = req.body;

    if (!gcsUri) {
        return res.status(400).json({ message: 'GCS URI is required' });
    }

    try {
        const request = {
            inputUri: gcsUri,
            features: ['LABEL_DETECTION'],
        };

        const [operation] = await videoClient.annotateVideo(request);
        res.status(200).json({
            message: 'Video analysis started',
            operation: operation.name,
        });
    } catch (error) {
        console.error('Error analyzing video:', error);
        res.status(500).json({ message: 'Error analyzing video' });
    }
};
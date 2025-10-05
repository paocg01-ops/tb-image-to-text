import { Router } from 'express';
import { OCRController } from '../controllers/ocr.controller';
import { upload } from '../middleware/upload.middleware';

const router = Router();
const ocrController = new OCRController();

router.post('/process', upload.array('images', 10), (req, res) =>
  ocrController.processImages(req, res)
);

router.get('/health', (req, res) =>
  ocrController.healthCheck(req, res)
);

export default router;

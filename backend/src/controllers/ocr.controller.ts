import { Request, Response } from 'express';
import { TesseractService } from '../services/tesseract.service';
import { ProcessImagesResponse } from '../types';

const tesseractService = new TesseractService();

export class OCRController {
  async processImages(req: Request, res: Response): Promise<void> {
    try {
      if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
        res.status(400).json({ error: 'No images uploaded' });
        return;
      }

      const files = req.files as Express.Multer.File[];

      if (files.length > 10) {
        res.status(400).json({ error: 'Maximum 10 images allowed' });
        return;
      }

      const buffers = files.map(file => file.buffer);

      // Process all images
      const results = await tesseractService.processMultipleImages(buffers);

      const response: ProcessImagesResponse = {
        results,
        totalProcessed: files.length,
        sorted: true
      };

      res.json(response);
    } catch (error) {
      console.error('OCR processing error:', error);
      res.status(500).json({
        error: 'Failed to process images',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  async healthCheck(req: Request, res: Response): Promise<void> {
    res.json({ status: 'ok', service: 'tb-image-to-text-backend' });
  }
}

import type { VercelRequest, VercelResponse } from '@vercel/node';
import multiparty from 'multiparty';
import { TesseractService } from '../lib/services/tesseract.service';
import { ProcessImagesResponse } from '../lib/types';

export const config = {
  api: {
    bodyParser: false,
  },
};

const tesseractService = new TesseractService();

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const form = new multiparty.Form();

    // Parse the multipart form data
    const { files } = await new Promise<{ files: any }>((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        else resolve({ files });
      });
    });

    if (!files || !files.images) {
      return res.status(400).json({ error: 'No images uploaded' });
    }

    const uploadedFiles = Array.isArray(files.images) ? files.images : [files.images];

    if (uploadedFiles.length > 10) {
      return res.status(400).json({ error: 'Maximum 10 images allowed' });
    }

    // Read file buffers
    const fs = await import('fs/promises');
    const buffers = await Promise.all(
      uploadedFiles.map((file: any) => fs.readFile(file.path))
    );

    // Process all images
    const results = await tesseractService.processMultipleImages(buffers);

    // Clean up temporary files
    await Promise.all(uploadedFiles.map((file: any) => fs.unlink(file.path).catch(() => {})));

    const response: ProcessImagesResponse = {
      results,
      totalProcessed: uploadedFiles.length,
      sorted: true,
    };

    return res.status(200).json(response);
  } catch (error) {
    console.error('OCR processing error:', error);
    return res.status(500).json({
      error: 'Failed to process images',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  } finally {
    await tesseractService.terminate();
  }
}

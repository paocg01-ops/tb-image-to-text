import sharp from 'sharp';

export class ImagePreprocessingService {
  async preprocessImage(buffer: Buffer): Promise<Buffer> {
    try {
      // Preprocess image for better OCR accuracy
      const processedImage = await sharp(buffer)
        .grayscale() // Convert to grayscale
        .normalize() // Normalize contrast
        .sharpen() // Sharpen edges
        .resize(null, 2000, { // Upscale if needed for better text recognition
          withoutEnlargement: true,
          fit: 'inside'
        })
        .toBuffer();

      return processedImage;
    } catch (error) {
      console.error('Image preprocessing error:', error);
      return buffer; // Return original if preprocessing fails
    }
  }
}

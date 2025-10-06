import { createWorker, Worker } from 'tesseract.js';
import type { PlayerData } from '../types/index.js';
import { DataParser } from '../utils/dataParser.js';
import { ImagePreprocessingService } from './imagePreprocessing.service.js';

export class TesseractService {
  private worker: Worker | null = null;
  private dataParser: DataParser;
  private imagePreprocessing: ImagePreprocessingService;

  constructor() {
    this.dataParser = new DataParser();
    this.imagePreprocessing = new ImagePreprocessingService();
  }

  async initialize(): Promise<void> {
    if (!this.worker) {
      this.worker = await createWorker('eng');
    }
  }

  async processImage(buffer: Buffer): Promise<PlayerData[]> {
    try {
      await this.initialize();

      if (!this.worker) {
        throw new Error('Tesseract worker not initialized');
      }

      // Preprocess image
      const processedBuffer = await this.imagePreprocessing.preprocessImage(buffer);

      // Perform OCR
      const { data: { text } } = await this.worker.recognize(processedBuffer);

      console.log('OCR Raw Text:', text);

      // Parse text to extract player data
      const players = this.dataParser.parseOCRText(text);

      return players;
    } catch (error) {
      console.error('OCR processing error:', error);
      throw error;
    }
  }

  async processMultipleImages(buffers: Buffer[]): Promise<PlayerData[]> {
    const allPlayers: PlayerData[][] = [];

    for (const buffer of buffers) {
      const players = await this.processImage(buffer);
      allPlayers.push(players);
    }

    // Merge and sort all players by points
    return this.dataParser.mergeAndSort(allPlayers);
  }

  async terminate(): Promise<void> {
    if (this.worker) {
      await this.worker.terminate();
      this.worker = null;
    }
  }
}

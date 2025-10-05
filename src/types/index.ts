export interface PlayerData {
  rank: number;
  name: string;
  kingdom?: string;
  points: number;
  rawText?: string;
}

export interface ProcessImagesResponse {
  results: PlayerData[];
  totalProcessed: number;
  sorted: boolean;
}

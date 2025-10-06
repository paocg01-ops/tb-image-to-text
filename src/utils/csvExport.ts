import Papa from 'papaparse';
import type { PlayerData } from '../types';

export const exportToCSV = (data: PlayerData[]): string => {
  const csvData = data.map(player => ({
    Rank: player.rank,
    Name: player.name,
    Kingdom: player.kingdom || '',
    Points: player.points,
  }));

  return Papa.unparse(csvData);
};

export const exportToTSV = (data: PlayerData[]): string => {
  const header = ['Rank', 'Name', 'Kingdom', 'Points'].join('\t');
  const rows = data.map(player =>
    [player.rank, player.name, player.kingdom || '', player.points].join('\t')
  );

  return [header, ...rows].join('\n');
};

export const downloadCSV = (data: PlayerData[], filename = 'leaderboard.csv'): void => {
  const csv = exportToCSV(data);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const copyToClipboard = async (text: string): Promise<void> => {
  await navigator.clipboard.writeText(text);
};

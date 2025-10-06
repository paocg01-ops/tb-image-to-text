import { useState } from 'react';
import { Download, Copy, Check } from 'lucide-react';
import type { PlayerData } from '../types';
import { downloadCSV, exportToTSV, copyToClipboard } from '../utils/csvExport';

interface ExportButtonsProps {
  data: PlayerData[];
}

export const ExportButtons = ({ data }: ExportButtonsProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopyTSV = async () => {
    const tsv = exportToTSV(data);
    await copyToClipboard(tsv);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadCSV = () => {
    downloadCSV(data);
  };

  if (data.length === 0) {
    return null;
  }

  return (
    <div className="flex gap-4">
      <button
        onClick={handleCopyTSV}
        className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        {copied ? (
          <>
            <Check className="h-5 w-5" />
            Copied!
          </>
        ) : (
          <>
            <Copy className="h-5 w-5" />
            Copy as TSV
          </>
        )}
      </button>
      <button
        onClick={handleDownloadCSV}
        className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
      >
        <Download className="h-5 w-5" />
        Download CSV
      </button>
    </div>
  );
};

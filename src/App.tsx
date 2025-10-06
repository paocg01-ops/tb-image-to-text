import { useState } from 'react';
import { ImageUploader } from './components/ImageUploader';
import { DataTable } from './components/DataTable';
import { ExportButtons } from './components/ExportButtons';
import { ProgressIndicator } from './components/ProgressIndicator';
import type { PlayerData } from './types';
import { ocrApi } from './services/api';

function App() {
  const [files, setFiles] = useState<File[]>([]);
  const [data, setData] = useState<PlayerData[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleProcess = async () => {
    if (files.length === 0) {
      setError('Please upload at least one image');
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const response = await ocrApi.processImages(files);
      setData(response.results);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to process images');
      console.error('OCR error:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            TB Image-to-Text OCR
          </h1>
          <p className="text-lg text-gray-600">
            Extract leaderboard data from game screenshots
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <ImageUploader files={files} onFilesChange={setFiles} maxFiles={10} />

          {files.length > 0 && (
            <div className="mt-6 flex justify-center">
              <button
                onClick={handleProcess}
                disabled={isProcessing}
                className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                {isProcessing ? 'Processing...' : 'Process Images'}
              </button>
            </div>
          )}
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        <ProgressIndicator
          isProcessing={isProcessing}
          totalFiles={files.length}
          message="Extracting text from images..."
        />

        {data.length > 0 && !isProcessing && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Extracted Data ({data.length} players)
                </h2>
                <ExportButtons data={data} />
              </div>

              <DataTable data={data} onDataChange={setData} />
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <strong>Tip:</strong> You can edit any cell by clicking the pencil icon.
                Copy as TSV to paste directly into Excel or Google Sheets, or download as CSV.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

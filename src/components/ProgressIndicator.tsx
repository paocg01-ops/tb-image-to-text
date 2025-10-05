import { Loader2 } from 'lucide-react';

interface ProgressIndicatorProps {
  isProcessing: boolean;
  currentFile?: number;
  totalFiles?: number;
  message?: string;
}

export const ProgressIndicator = ({
  isProcessing,
  currentFile,
  totalFiles,
  message = 'Processing images...',
}: ProgressIndicatorProps) => {
  if (!isProcessing) return null;

  return (
    <div className="w-full p-6 bg-blue-50 border border-blue-200 rounded-lg">
      <div className="flex items-center justify-center gap-3">
        <Loader2 className="h-6 w-6 text-blue-600 animate-spin" />
        <div>
          <p className="text-blue-900 font-medium">{message}</p>
          {currentFile !== undefined && totalFiles !== undefined && (
            <p className="text-sm text-blue-700">
              Processing image {currentFile} of {totalFiles}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

import { useState } from 'react';
import type { PlayerData } from '../types';
import { Pencil, Check, X } from 'lucide-react';

interface DataTableProps {
  data: PlayerData[];
  onDataChange: (data: PlayerData[]) => void;
}

export const DataTable = ({ data, onDataChange }: DataTableProps) => {
  const [editingRow, setEditingRow] = useState<number | null>(null);
  const [editedData, setEditedData] = useState<PlayerData | null>(null);

  const startEdit = (index: number) => {
    setEditingRow(index);
    setEditedData({ ...data[index] });
  };

  const cancelEdit = () => {
    setEditingRow(null);
    setEditedData(null);
  };

  const saveEdit = () => {
    if (editingRow !== null && editedData) {
      const newData = [...data];
      newData[editingRow] = editedData;
      onDataChange(newData);
      setEditingRow(null);
      setEditedData(null);
    }
  };

  const updateField = (field: keyof PlayerData, value: string | number) => {
    if (editedData) {
      setEditedData({ ...editedData, [field]: value });
    }
  };

  if (data.length === 0) {
    return null;
  }

  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Rank
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Kingdom
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Points
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((player, index) => (
            <tr key={index} className="hover:bg-gray-50">
              {editingRow === index ? (
                <>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="number"
                      value={editedData?.rank || ''}
                      onChange={(e) => updateField('rank', parseInt(e.target.value))}
                      className="w-20 px-2 py-1 border border-gray-300 rounded"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="text"
                      value={editedData?.name || ''}
                      onChange={(e) => updateField('name', e.target.value)}
                      className="w-full px-2 py-1 border border-gray-300 rounded"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="text"
                      value={editedData?.kingdom || ''}
                      onChange={(e) => updateField('kingdom', e.target.value)}
                      className="w-32 px-2 py-1 border border-gray-300 rounded"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="number"
                      value={editedData?.points || ''}
                      onChange={(e) => updateField('points', parseInt(e.target.value))}
                      className="w-32 px-2 py-1 border border-gray-300 rounded"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex gap-2">
                      <button
                        onClick={saveEdit}
                        className="text-green-600 hover:text-green-800"
                        aria-label="Save"
                      >
                        <Check className="h-5 w-5" />
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="text-red-600 hover:text-red-800"
                        aria-label="Cancel"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </>
              ) : (
                <>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {player.rank}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {player.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {player.kingdom || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {player.points.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => startEdit(index)}
                      className="text-blue-600 hover:text-blue-800"
                      aria-label="Edit"
                    >
                      <Pencil className="h-5 w-5" />
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

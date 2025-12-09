import { useQuery } from '@tanstack/react-query';
import apiClient from '../api/client';

export default function DataPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['data'],
    queryFn: async () => {
      const response = await apiClient.get('/data');
      return response.data;
    },
  });

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Loading data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">Error loading data</p>
      </div>
    );
  }

  return (
    <div className="px-4 py-6 sm:px-0">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Your Data</h1>
      
      {data?.data?.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No data found. Create your first item!</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {data?.data?.map((item: any) => (
            <div
              key={item.id}
              className="bg-white dark:bg-gray-800 shadow rounded-lg p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {item.title}
              </h3>
              {item.content && (
                <p className="mt-2 text-gray-600 dark:text-gray-400">{item.content}</p>
              )}
              <p className="mt-4 text-sm text-gray-500">
                Created: {new Date(item.created_at).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


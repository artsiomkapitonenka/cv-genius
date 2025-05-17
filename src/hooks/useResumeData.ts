import { useState, useEffect } from 'react';
import { ResumeData } from '../types/resume';
import { sampleResumeData } from '../data/sampleResumeData';

interface UseResumeDataProps {
  initialData?: ResumeData;
  jsonUrl?: string;
}

export const useResumeData = ({ 
  initialData = sampleResumeData,
  jsonUrl 
}: UseResumeDataProps = {}) => {
  const [data, setData] = useState<ResumeData>(initialData);
  const [loading, setLoading] = useState<boolean>(!!jsonUrl);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!jsonUrl) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(jsonUrl);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
        }
        
        const jsonData = await response.json();
        setData(jsonData);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error occurred'));
        console.error('Error loading resume data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [jsonUrl]);

  const updateData = (newData: Partial<ResumeData>) => {
    setData(prevData => ({
      ...prevData,
      ...newData
    }));
  };

  return { data, loading, error, updateData };
}; 
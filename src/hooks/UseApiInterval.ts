import { useEffect, useState } from 'react';
import api from './Api';
import { useJwt } from '../contexts/JwtContext';

interface UseApiIntervalProps {
  method?: 'GET' | 'POST';
}

export default function useApiInterval<T>(
  url: string,
  interval: number,
  { method = 'GET' }: UseApiIntervalProps,
) {
  const [obj, setObj] = useState<T>();
  const { jwt } = useJwt();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api(url, {
          JWT: jwt,
          init: { method },
        });
        const data = await response.json();
        setObj(data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    const intervalId = setInterval(() => {
      fetchUser();
    }, interval);

    if (jwt) {
      fetchUser();
    }

    return () => {
      clearInterval(intervalId);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jwt]);

  return [obj];
}

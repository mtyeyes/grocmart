import { useState, useEffect } from 'react';

import { storeInCache, getFromCache } from '../utils/session-storage-as-cache';

type UseFetchAdnCacheJson = (url: string, cacheMaxAge: number) => FetchJsonState;

type FetchJsonState = {
  isLoading: boolean;
  isError: boolean;
  data: any | null;
};

const useFetchAndCacheJson: UseFetchAdnCacheJson = (url, cacheMaxAge) => {
  const [state, setState] = useState<FetchJsonState>({
    isLoading: true,
    isError: false,
    data: null,
  });

  const abortController = new AbortController();

  useEffect(() => {
    const fetchData = async () => {
      const cachedData = getFromCache(url);
      if (cachedData !== false && Date.now() - cachedData.age <= cacheMaxAge) {
        setState({
          isLoading: false,
          isError: false,
          data: cachedData.data,
        });
      } else {
        try {
          const response = await fetch(url, { signal: abortController.signal });

          if (!response.ok) {
            throw new Error(`Request error ${response.status}`);
          }

          const data = await response.json();
          setState({
            isLoading: false,
            isError: false,
            data,
          });
          storeInCache(url, data);
        } catch (e) {
          if (!abortController.signal.aborted) {
            setState({
              isLoading: false,
              isError: true,
              data: null,
            });
          }
        }
      }
    };

    fetchData();

    return () => {
      abortController.abort();
    };
  }, [url]);

  return state;
};

export default useFetchAndCacheJson;

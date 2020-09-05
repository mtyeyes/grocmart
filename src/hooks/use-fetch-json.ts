import { useState, useEffect } from 'react';

type UseFetchJson = (url: string) => FetchJsonState;

type FetchJsonState = {
  isLoading: boolean,
  isError: boolean,
  data: any | null,
}

const useFetchJson: UseFetchJson = (url) => {
  const [state, setState] = useState<FetchJsonState>({
    isLoading: true,
    isError: false,
    data: null,
  });

  const abortController = new AbortController();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, {signal: abortController.signal});

        if(!response.ok) {
          throw new Error(`Request error ${response.status}`);
        }

        setState({
          isLoading: false,
          isError: false,
          data: await response.json(),
        });
      } catch(e) {
        if (!abortController.signal.aborted) {
          setState({
            isLoading: false,
            isError: true,
            data: null,
          });
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

export default useFetchJson;
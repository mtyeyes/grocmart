import { useState, useRef, useEffect, useCallback } from 'react';

const useRecursiveTimeout = (callback: any, delay: number) => {
  const [isRunning, setIsRunning] = useState(false);
  const stop = useCallback(() => setIsRunning(false), [setIsRunning]);
  const play = useCallback(() => setIsRunning(true), [setIsRunning]);
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!isRunning) return;
    let id: ReturnType<typeof setTimeout> | 0 = 0;

    const tick = () => {
      if (!isRunning && id !== 0) return clearTimeout(id);
      savedCallback.current();
      requestAnimationFrame(() => (id = setTimeout(tick, delay)));
    };
    requestAnimationFrame(() => (id = setTimeout(tick, delay)));

    return () => {
      if (id) clearTimeout(id);
      stop();
    };
  }, [isRunning, delay, stop]);

  return { play, stop };
};

export default useRecursiveTimeout;
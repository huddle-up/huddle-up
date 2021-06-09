import { useEffect, useState } from 'react';

export function useCurrentTick(interval = 1000) {
  const [currentDate, setCurrentDate] = useState(new Date());
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return currentDate;
}

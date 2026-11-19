import { useState, useEffect } from 'react';

export function useClock() {
  const [time, setTime] = useState(() => new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  return time.toLocaleTimeString('vi-VN');
}

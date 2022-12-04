import { useState, useEffect, useCallback } from 'react';

export const useHeaderColor = () => {
  const [color, setColor] = useState('#fce9df');

  const listenScroll = useCallback(() => {
    if (window.scrollY > 50) {
      const windowScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const windowHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setColor(`rgba(252, 233, 223, ${(1 - (windowScroll / windowHeight) * 0.3).toFixed(3)}`);
    } else {
      setColor('#fce9df');
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', listenScroll);
    return () => window.removeEventListener('scroll', listenScroll);
  }, [listenScroll]);

  return color;
};

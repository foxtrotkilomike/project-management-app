import { useState, useEffect, useCallback } from 'react';
import { MAX_HEADER_OPACITY, PUBLIC_HEADER_COLOR } from '../config/constants';

export const useHeaderColor = () => {
  const [color, setColor] = useState(PUBLIC_HEADER_COLOR);

  const listenScroll = useCallback(() => {
    if (window.scrollY > 50) {
      const windowScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const windowHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setColor(
        `rgba(252, 233, 223, ${(1 - (windowScroll / windowHeight) * MAX_HEADER_OPACITY).toFixed(3)}`
      );
    } else {
      setColor(PUBLIC_HEADER_COLOR);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', listenScroll);
    return () => window.removeEventListener('scroll', listenScroll);
  }, [listenScroll]);

  return color;
};

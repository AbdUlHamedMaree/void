import { useCallback, useRef, useState } from 'react';
import { View } from 'react-native';

export const useViewWidth = () => {
  const ref = useRef<React.ComponentRef<typeof View>>(null);

  const [width, setWidth] = useState(0);

  const measureWidth = useCallback(() => {
    ref.current?.measureInWindow((_pageX, _pageY, width, _height) => {
      setWidth(width);
    });
  }, []);

  return {
    ref,
    measureWidth,
    width,
  };
};

import React from 'react';
import {useColorMode} from '@docusaurus/theme-common';
import BasicZoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

export default function Zoom({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const {colorMode} = useColorMode();
  return (
    <BasicZoom
      overlayBgColorEnd={
        colorMode === 'dark'
          ? 'rgba(22,19,28, 0.9)'
          : 'rgba(255, 255, 255, 0.9)'
      }>
      {children}
    </BasicZoom>
  );
}

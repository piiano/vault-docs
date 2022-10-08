import React from 'react';
import clsx from 'clsx';

export type Props = {
  width?: number
  height?: number
  className?: string
};

export default function IconRightArrow({
  width = 16,
  height = 16,
  className = ''
}: Props): JSX.Element {
  const classes = clsx(
    'iconRightArrow',
    className,
  );

  return (
    <svg 
      aria-hidden="true" 
      role="img" 
      className={classes} 
      viewBox={`0 0 ${width} ${height}`} 
      width={width}
      height={height} 
      fill="currentColor"
      style={{ display: "inline-block", "userSelect": "none", "verticalAlign": "text-bottom", "overflow": "visible" }}
      >
      {
        width > 20 ?
        <path 
          fillRule="evenodd" 
          d="M13.22 19.03a.75.75 0 001.06 0l6.25-6.25a.75.75 0 000-1.06l-6.25-6.25a.75.75 0 10-1.06 1.06l4.97 4.97H3.75a.75.75 0 000 1.5h14.44l-4.97 4.97a.75.75 0 000 1.06z">
        </path>
        :
        <path fillRule="evenodd" 
          d="M8.22 2.97a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06-1.06l2.97-2.97H3.75a.75.75 0 010-1.5h7.44L8.22 4.03a.75.75 0 010-1.06z">
        </path>
      }
    </svg>
  );
}


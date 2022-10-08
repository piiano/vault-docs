import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import IconRightArrow from '../IconRightArrow';

import './styles.css';

const ButtonLink = (props) => {
  const {
    children,
    type = 'button',
    className,
    theme = "primary",
    size = "normal",
    outline,
    active,
    disabled,
    block,
    to,
    ...restProps
  } = props;

  const classes = clsx(
    'buttonLink',
    'button',

    `button--${theme}`,

    {
      'button--sm': size === 'small',
      'button--lg': size === 'large',
    },

    {'button--outline': outline},
    {'button--active': active},
    {'button--block': block},
    {disabled},

    className,
  );

  const iconSize = size === 'large' ? 23 : (size === 'normal' ? 16 : 13.75);

  return (
    <Link to={props.to} {...restProps} disabled={disabled} type={type} className={classes}>
      {children}<IconRightArrow width={iconSize} height={iconSize} className="arrowIcon" />
    </Link>
  );
};

export default ButtonLink;
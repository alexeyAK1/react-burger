import React, { memo } from 'react';

import styles from './scroll-container.module.css';

interface IProps {
  children: React.ReactChild;
  style?: React.CSSProperties;
  className?: string;
  styleInner?: React.CSSProperties;
  classNameInner?: string;
  forceUpdate?: string;
}

function ScrollContainer({
  children,
  style = {},
  className = '',
  styleInner = {},
  classNameInner = '',
}: IProps) {
  return (
    <div className={`${styles.scroll_container} ${className}`} style={style}>
      <div
        className={`${styles.scroll_container_inner} ${classNameInner}`}
        style={styleInner}
      >
        {children}
      </div>
    </div>
  );
}

export default memo(ScrollContainer);

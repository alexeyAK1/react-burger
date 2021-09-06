import React, { LegacyRef, memo } from 'react';

interface IProps {
  children: React.ReactChild;
  categoryName: string;
  style?: React.CSSProperties;
  className?: string;
  currentTabRef?: LegacyRef<HTMLDivElement> | undefined;
}

function CategoriesSection({
  children,
  categoryName,
  style = {},
  className = '',
  currentTabRef,
}: IProps) {
  return (
    <div style={style} className={className} ref={currentTabRef}>
      <h2 className="pt-10 pb-6">{categoryName}</h2>
      {children}
    </div>
  );
}

export default memo(CategoriesSection);

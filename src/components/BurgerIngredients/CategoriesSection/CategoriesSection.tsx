import React, { memo } from 'react';

interface IProps {
  children: React.ReactChild;
  categoryName: string;
  style?: React.CSSProperties;
  className?: string;
}

function CategoriesSection({
  children,
  categoryName,
  style = {},
  className = '',
}: IProps) {
  return (
    <div style={style} className={className}>
      <h2 className="pt-10 pb-6">{categoryName}</h2>
      {children}
    </div>
  );
}

export default memo(CategoriesSection);

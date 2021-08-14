import React from 'react';

interface IProps {
  children: React.ReactChild;
}

export default function MainIndent({ children }: IProps) {
  return <div className={`pl-5 pr-5`}>{children}</div>;
}

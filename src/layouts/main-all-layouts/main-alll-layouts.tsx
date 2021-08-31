import React from 'react';
import Main from '../main/main';
import MainIndent from '../main-indent/main-indent';
import MainMaximumHeight from '../main-maximum-height/main-maximum-height';

interface IProps {
  children: React.ReactChild;
}

export default function MainAllLayouts({ children }: IProps) {
  return (
    <Main>
      <MainIndent>
        <MainMaximumHeight>{children}</MainMaximumHeight>
      </MainIndent>
    </Main>
  );
}

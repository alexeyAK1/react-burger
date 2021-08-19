import React from 'react';
import Main from '../Main/Main';
import MainIndent from '../MainIndent/MainIndent';
import MainMaximumHeight from '../MainMaximumHeight/MainMaximumHeight';

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

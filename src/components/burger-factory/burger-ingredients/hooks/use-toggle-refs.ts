import { useEffect, useRef, useState } from 'react';
import { TCategory } from '../../../../models/ingredients';

export const useToggleRefs = (initialName: TCategory) => {
  const [currentTabName, setCurrentTabNameLocal] =
    useState<TCategory>(initialName);
  const tabListRefs = useRef<{ [key in TCategory]?: HTMLDivElement | null }>(
    {}
  );

  useEffect(() => {
    if (tabListRefs.current[currentTabName]) {
      tabListRefs.current[currentTabName]!.scrollIntoView({
        block: 'start',
        behavior: 'smooth',
      });
    }

    return () => {};
  }, [currentTabName]);

  function setCurrentType(name: TCategory) {
    setCurrentTabNameLocal(name);
  }

  return { currentTabName, tabListRefs, setCurrentType };
};

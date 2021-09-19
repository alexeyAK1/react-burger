import React from 'react';

import BurgerFactory from '../../components/burger-factory/burger-factory';
import MainAllLayouts from '../../layouts/main-all-layouts/main-all-layouts';

export default function BurgerFactoryPage() {
  return (
    <MainAllLayouts>
      <BurgerFactory />
    </MainAllLayouts>
  );
}

import React, { FC } from 'react';

import { Container } from '@material-ui/core';
import { Navbar } from 'UI';

import type { IMain } from 'types/components/layout/types';

const Main: FC<IMain> = ({ children }) => {
  return (
    <div>
      <Navbar />
      <Container>{children}</Container>
    </div>
  );
};

export default Main;

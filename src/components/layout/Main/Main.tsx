import React, { FC } from 'react';

import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Navbar } from 'UI';

import type { IMain } from 'types/components/layout/types';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3)
  }
}));

const Main: FC<IMain> = ({ children, className }) => {
  const classes = useStyles();

  return (
    <div className={className}>
      <Navbar />
      <div className={classes.root}>
        <Grid container spacing={3}>
          {children}
        </Grid>
      </div>
    </div>
  );
};

export default Main;

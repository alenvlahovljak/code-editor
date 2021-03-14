import React from 'react';
import { AppBar } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    width: 300
  }
});

export default function PageAnimation() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Skeleton />
      <Skeleton animation={false} />
      <Skeleton animation="wave" />
    </div>
  );
}

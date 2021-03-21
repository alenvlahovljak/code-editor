import React, { FC } from 'react';
import { CircularProgress } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

import type { ILoader } from 'types/components/animations/types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      position: 'absolute',
      '& > * + *': {
        marginLeft: theme.spacing(2)
      }
    }
  })
);

const Loader: FC<ILoader> = ({ size, top, right, bottom, left }) => {
  const classes = useStyles({});

  return (
    <div className={classes.root} style={{ top, right, bottom, left }}>
      <CircularProgress size={size} color="secondary" />
    </div>
  );
};
export default Loader;

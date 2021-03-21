import React, { FC } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import type { IPrimaryButton } from 'types/components/UI/types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1)
      }
    }
  })
);

const PrimaryButton: FC<IPrimaryButton> = ({ children, onClick, style }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Button variant="contained" size="small" color="primary" style={style} onClick={onClick}>
        {children}
      </Button>
    </div>
  );
};

export default PrimaryButton;

import React, { FC, useState } from 'react';

import {
  AppBar,
  Toolbar,
  Typography,
  Switch,
  FormControlLabel,
  FormGroup
} from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import { Brightness2 as MoonIcon, Flare as SunIcon } from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    title: {
      flexGrow: 1
    }
  })
);

const Navbar: FC = () => {
  const classes = useStyles();
  const [mode, setMode] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMode(event.target.checked);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Code Editor
          </Typography>
          <FormGroup>
            <FormControlLabel
              control={<Switch checked={mode} onChange={handleChange} aria-label="login switch" />}
              label=""
            />
          </FormGroup>
          {mode ? <MoonIcon /> : <SunIcon />}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;

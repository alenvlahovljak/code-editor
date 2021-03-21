import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Switch,
  FormControlLabel,
  FormGroup
} from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { LangPicker } from 'UI';
import { useThemeContext } from '../../../context/theme-context';
import { useTheme } from '../../../hooks';

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
  const { t } = useTranslation();
  const [mode, setMode] = useState(false);
  const [theme, setTheme] = useTheme();
  const { dispatch } = useThemeContext();
  const classes = useStyles();

  useEffect(() => {
    if (theme == 'dark') setMode(true);
  }, []);

  useEffect(() => dispatch({ type: 'CHANGE_THEME', payload: theme }), [theme]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;

    setMode(checked);
    if (checked) {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <FormGroup>
            <FormControlLabel
              control={<Switch checked={mode} onChange={handleChange} aria-label="login switch" />}
              label=""
            />
          </FormGroup>
          {mode ? <MoonIcon /> : <SunIcon />}
          <Typography align="center" variant="h5" className={classes.title}>
            {t('navigation.title')}
          </Typography>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <LangPicker />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;

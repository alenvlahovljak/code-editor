import React, { FC } from 'react';

import { Grid, PaletteType } from '@material-ui/core';
import { MuiThemeProvider, makeStyles, createMuiTheme } from '@material-ui/core/styles';
import { Navbar } from 'UI';
import type { IMain } from 'types/components/layout/types';
import { useThemeContext } from '../../../context/theme-context';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3)
  }
}));

const Main: FC<IMain> = ({ children, className }) => {
  const { state: theme } = useThemeContext();
  const classes = useStyles();

  const setTheme = (type: PaletteType) =>
    createMuiTheme({
      palette: {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        type
      }
    });

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <MuiThemeProvider theme={setTheme(theme)}>
      <div className={className}>
        <Navbar />
        <div className={classes.root}>
          <Grid container spacing={3}>
            {children}
          </Grid>
        </div>
      </div>
    </MuiThemeProvider>
  );
};

export default Main;

import React from 'react';
import { CssBaseline, ThemeProvider as MuiThemeProvider } from '@material-ui/core';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { createTheme, useGlobalStyles } from '../../styles';
import { useLocales } from '../locales';

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { uiLocale, dateLocale } = useLocales();
  const theme = createTheme(uiLocale);
  useGlobalStyles();
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={dateLocale}>
        {children}
      </MuiPickersUtilsProvider>
    </MuiThemeProvider>
  );
}

export default ThemeProvider;

import React from 'react';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { createTheme } from './theme';
import { useLocales } from '../locales';

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { uiLocale, dateLocale } = useLocales();
  const theme = createTheme(uiLocale);
  return (
    <MuiThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={dateLocale}>
        {children}
      </MuiPickersUtilsProvider>
    </MuiThemeProvider>
  );
}

export default ThemeProvider;

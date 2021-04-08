import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { enUS, de } from 'date-fns/locale';
import { enUS as uiEN, deDE as uiDE } from '@material-ui/core/locale';
import DateFnsUtils from '@date-io/date-fns';
import LandingPage from './pages/landing-page';
import Meetings from './pages/meetings';

function App() {
  const { t, i18n } = useTranslation();
  const locale = i18n.language.startsWith('de') ? de : enUS;
  const uiLocale = i18n.language.startsWith('de') ? uiDE : uiEN;
  const theme = createMuiTheme({}, uiLocale);
  return (
    <ThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={locale}>
        <LandingPage />
        <Meetings />
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
}

export default App;

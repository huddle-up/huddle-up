import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import LandingPage from './pages/landing-page';

const theme = createMuiTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <LandingPage />
    </ThemeProvider>
  );
}

export default App;

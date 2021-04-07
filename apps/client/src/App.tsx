import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import LandingPage from './pages/landing-page';
import Meetings from './pages/meetings';

const theme = createMuiTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <LandingPage />
      <Meetings />
    </ThemeProvider>
  );
}

export default App;

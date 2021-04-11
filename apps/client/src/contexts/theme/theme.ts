import { createMuiTheme } from '@material-ui/core/styles';
import { blueGrey, pink } from '@material-ui/core/colors';
import { Localization } from '@material-ui/core/locale';

export function createTheme(locale: Localization) {
  return createMuiTheme(
    {
      palette: {
        primary: {
          main: blueGrey[900],
        },
        secondary: {
          main: pink[700],
        },
      },
    },
    locale
  );
}

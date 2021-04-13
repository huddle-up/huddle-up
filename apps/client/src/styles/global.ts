import { makeStyles } from '@material-ui/core';

export const useGlobalStyles = makeStyles({
  '@global': {
    'html, body': {
      minHeight: '100vh',
      width: '100%',
    },
  },
});

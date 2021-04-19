import { makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  main: {
    flex: '1 0',
    marginTop: theme.spacing(5),
  },
}));

interface AppPageMainProps {
  children: React.ReactNode;
  className?: string;
}

function AppPageMain({ children, className }: AppPageMainProps) {
  const classes = useStyles();
  return <main className={[classes.main, className].join(' ')}>{children}</main>;
}
AppPageMain.defaultProps = {
  className: '',
};

export default AppPageMain;

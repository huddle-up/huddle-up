import { makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  main: {
    marginTop: theme.spacing(5),
    gridArea: 'main',
  },
}));

interface AppPageMainProps {
  children: React.ReactNode;
  className?: string;
  component?: React.ElementType;
}

function AppPageMain({ children, className, component: Component }: AppPageMainProps) {
  const classes = useStyles();
  return <Component className={[classes.main, className].join(' ')}>{children}</Component>;
}
AppPageMain.defaultProps = {
  className: '',
  component: 'main',
};

export default AppPageMain;

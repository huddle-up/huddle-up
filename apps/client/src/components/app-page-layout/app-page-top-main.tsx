import { makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  top: {
    gridArea: 'top',
    [theme.breakpoints.up('md')]: {
      gridArea: 'top-main',
    },
  },
}));

interface AppPageTopMainProps {
  children: React.ReactNode;
  component?: React.ElementType;
  className?: string;
}

function AppPageTopMain({ children, className, component: Component }: AppPageTopMainProps) {
  const classes = useStyles();
  return <Component className={[classes.top, className].join(' ')}>{children}</Component>;
}
AppPageTopMain.defaultProps = {
  component: 'div',
  className: '',
};

export default AppPageTopMain;

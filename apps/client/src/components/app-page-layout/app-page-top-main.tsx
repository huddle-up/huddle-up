import { makeStyles } from '@material-ui/core';
import React from 'react';

interface StyleProps {
  noAside: boolean;
}

const useStyles = makeStyles((theme) => ({
  top: (props: StyleProps) => ({
    gridArea: 'top',
    [theme.breakpoints.up('md')]: {
      gridArea: props.noAside ? 'top-aside / top-aside / top-aside / top-main' : 'top-main',
    },
    [theme.breakpoints.up('lg')]: {
      gridArea: 'top-main',
    },
  }),
}));

interface AppPageTopMainProps {
  children: React.ReactNode;
  component?: React.ElementType;
  className?: string;
  noAside?: boolean;
}

function AppPageTopMain({ children, className, component: Component, noAside }: AppPageTopMainProps) {
  const classes = useStyles({ noAside });
  return <Component className={[classes.top, className].join(' ')}>{children}</Component>;
}
AppPageTopMain.defaultProps = {
  component: 'div',
  className: '',
  noAside: false,
};

export default AppPageTopMain;

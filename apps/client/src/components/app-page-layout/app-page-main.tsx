import { makeStyles } from '@material-ui/core';
import React from 'react';

interface StyleProps {
  noAside: boolean;
}
const useStyles = makeStyles((theme) => ({
  main: (props: StyleProps) => ({
    marginTop: theme.spacing(5),
    gridArea: 'main',
    [theme.breakpoints.up('md')]: {
      gridArea: props.noAside ? 'aside / aside / aside / main' : 'main',
    },
    [theme.breakpoints.up('lg')]: {
      gridArea: 'main',
    },
  }),
}));

interface AppPageMainProps {
  children: React.ReactNode;
  className?: string;
  component?: React.ElementType;
  noAside?: boolean;
}

function AppPageMain({ children, className, component: Component, noAside }: AppPageMainProps) {
  const classes = useStyles({ noAside });
  return <Component className={[classes.main, className].join(' ')}>{children}</Component>;
}
AppPageMain.defaultProps = {
  className: '',
  component: 'main',
  noAside: false,
};

export default AppPageMain;

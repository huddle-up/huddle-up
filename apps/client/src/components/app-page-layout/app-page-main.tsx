import { makeStyles } from '@material-ui/core';
import React from 'react';

interface StyleProps {
  noAside: boolean;
  noMarginTop: boolean;
}
const useStyles = makeStyles((theme) => ({
  main: (props: StyleProps) => ({
    marginTop: props.noMarginTop ? 0 : theme.spacing(5),
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
  noMarginTop?: boolean;
}

function AppPageMain({ children, className, component: Component, noAside, noMarginTop }: AppPageMainProps) {
  const classes = useStyles({ noAside, noMarginTop });
  return <Component className={[classes.main, className].join(' ')}>{children}</Component>;
}
AppPageMain.defaultProps = {
  className: '',
  component: 'main',
  noAside: false,
  noMarginTop: false,
};

export default AppPageMain;

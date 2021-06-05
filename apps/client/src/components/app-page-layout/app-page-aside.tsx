import { makeStyles } from '@material-ui/core';
import React from 'react';

interface StyleProps {
  noMarginTop: boolean;
}

const useStyles = makeStyles((theme) => ({
  aside: (props: StyleProps) => ({
    gridArea: 'aside',
    [theme.breakpoints.up('sm')]: {
      marginTop: props.noMarginTop ? 0 : theme.spacing(5),
    },
  }),
}));

interface AppPageAsideProps {
  children: React.ReactNode;
  component?: React.ElementType;
  className?: string;
  noMarginTop?: boolean;
}

function AppPageAside({ children, className, component: Component, noMarginTop }: AppPageAsideProps) {
  const classes = useStyles({ noMarginTop });
  return <Component className={[classes.aside, className].join(' ')}>{children}</Component>;
}
AppPageAside.defaultProps = {
  component: 'aside',
  className: '',
  noMarginTop: false,
};

export default AppPageAside;

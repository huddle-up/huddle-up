import { makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  aside: {
    gridArea: 'aside',
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(5),
    },
  },
}));

interface AppPageAsideProps {
  children: React.ReactNode;
  component?: React.ElementType;
  className?: string;
}

function AppPageAside({ children, className, component: Component }: AppPageAsideProps) {
  const classes = useStyles();
  return <Component className={[classes.aside, className].join(' ')}>{children}</Component>;
}
AppPageAside.defaultProps = {
  component: 'aside',
  className: '',
};

export default AppPageAside;

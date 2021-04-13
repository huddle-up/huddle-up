import React from 'react';
import { makeStyles } from '@material-ui/core';

interface LargeLogoProps {
  width?: number;
}

const useStyles = makeStyles({
  logo: {
    width: (props: LargeLogoProps) => props.width,
  },
});

function LargeLogo({ width }: LargeLogoProps) {
  const classes = useStyles({ width });
  return <img className={classes.logo} src="logo.svg" alt="HuddleUp Logo" />;
}
LargeLogo.defaultProps = {
  width: 100,
};

export default LargeLogo;

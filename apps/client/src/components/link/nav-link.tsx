import React from 'react';
import { Link as MuiLink, LinkProps as MuiLinkProps, makeStyles } from '@material-ui/core';
import { NavLink as RouterNavLink, NavLinkProps as RouterNavLinkProps } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  base: {
    fontWeight: theme.typography.fontWeightMedium,
    '&:hover': {
      textDecoration: 'none',
      color: theme.palette.secondary.light,
    },
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  active: {
    color: theme.palette.secondary.main,
    fontWeight: theme.typography.fontWeightBold,
  },
}));

type NavLinkProps = MuiLinkProps<RouterNavLink, Pick<RouterNavLinkProps, 'to' | 'exact' | 'strict' | 'isActive'>>;

const Link = React.forwardRef((props: NavLinkProps, ref) => {
  const classes = useStyles();
  return (
    <MuiLink
      variant="subtitle1"
      component={RouterNavLink}
      className={classes.base}
      activeClassName={classes.active}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  );
});

export default Link;

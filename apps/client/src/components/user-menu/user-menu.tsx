import { makeStyles, Typography } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import React from 'react';
import { useUser } from '../../models/user';
import { ROUTES } from '../../routes';
import { Link } from '../link';

const useStyles = makeStyles((theme) => ({
  link: {
    '&:hover': {
      textDecoration: 'none',
    },
  },
  container: {
    display: 'flex',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(0, 1, 0, 2),
  },
  text: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'block',
    },
  },
}));

interface UserMenuProps {
  user: {
    name: string;
    email: string;
  };
}

export function UserMenu({ user }: UserMenuProps) {
  const classes = useStyles();
  return (
    <Link to={ROUTES.profile.profile} className={classes.link}>
      <div className={classes.container}>
        <AccountCircle fontSize="large" className={classes.avatar} />
        <Typography className={classes.text}>{user.name}</Typography>
      </div>
    </Link>
  );
}

function UserMenuWithData() {
  const { user } = useUser();
  return user ? <UserMenu user={user} /> : null;
}

export default UserMenuWithData;

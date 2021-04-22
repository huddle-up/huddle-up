import { Avatar, makeStyles, Typography } from '@material-ui/core';
import React, { useMemo } from 'react';
import { useUser } from '../../models/user';
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
    margin: theme.spacing(0, 2),
  },
}));

interface UserMenuProps {
  user: {
    name: string;
    email: string;
  };
}

export function UserMenu({ user }: UserMenuProps) {
  const initial = useMemo(() => (user.name ? user.name.charAt(0).toUpperCase() : ''), [user.name]);
  const classes = useStyles();
  return (
    <Link to="/profile" className={classes.link}>
      <div className={classes.container}>
        <Avatar className={classes.avatar}>{initial}</Avatar>
        <Typography>{user.name}</Typography>
      </div>
    </Link>
  );
}

function UserMenuWithData() {
  const { user } = useUser();
  return user ? <UserMenu user={user} /> : null;
}

export default UserMenuWithData;

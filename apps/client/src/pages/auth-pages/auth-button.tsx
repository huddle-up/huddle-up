import { Avatar, Button, makeStyles, Typography } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  button: {
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.secondary.contrastText,
    backgroundColor: theme.palette.secondary.main,
    '&:hover': {
      backgroundColor: theme.palette.secondary.dark,
    },
  },
  avatar: {
    marginRight: theme.spacing(1),
    color: 'inherit',
    backgroundColor: 'inherit',
  },
  label: {
    marginRight: theme.spacing(1),
  },
}));

interface AuthButtonProps {
  label: string;
  iconSrc?: string;
  icon?: React.ReactNode;
  onClick: React.MouseEventHandler;
}

function AuthButton({ label, iconSrc, icon, onClick }: AuthButtonProps) {
  const classes = useStyles();
  return (
    <Button className={classes.button} onClick={onClick}>
      <Avatar className={classes.avatar} src={iconSrc}>
        {icon}
      </Avatar>
      <Typography className={classes.label} component="span" variant="h6">
        {label}
      </Typography>
    </Button>
  );
}
AuthButton.defaultProps = {
  iconSrc: undefined,
  icon: null,
};

export default AuthButton;

import { Avatar, Button, makeStyles, Typography } from '@material-ui/core';
import { AccountCircle, EmailOutlined, Facebook, GitHub } from '@material-ui/icons';
import React from 'react';

const icons = {
  account: () => <AccountCircle />,
  facebook: () => <Facebook />,
  github: () => <GitHub />,
  email: () => <EmailOutlined />,
};

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
    fontSize: theme.typography.subtitle1.fontSize,
  },
}));

interface AuthButtonProps {
  label: string;
  iconSrc?: string;
  icon?: keyof typeof icons;
  onClick: React.MouseEventHandler;
}

function AuthButton({ label, iconSrc, icon, onClick }: AuthButtonProps) {
  const classes = useStyles();
  const iconComponent = icon && Object.keys(icons).includes(icon) ? icons[icon]() : icons.account();
  return (
    <Button className={classes.button} onClick={onClick}>
      <Avatar className={classes.avatar} src={iconSrc}>
        {iconComponent}
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

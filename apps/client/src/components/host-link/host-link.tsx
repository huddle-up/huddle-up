import { Grid, makeStyles, Typography } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { UserCoreFields } from '../../models/user/__generated-interfaces__/UserCoreFields';

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: 'none',
    color: 'inherit',
    transition: theme.transitions.create('color'),
    '&:hover': {
      color: theme.palette.text.secondary,
    },
  },
  icon: {
    marginRight: theme.spacing(0.5),
  },
}));

interface HostLinkProps {
  host: UserCoreFields;
  currentUser?: UserCoreFields;
  small?: boolean;
}

function HostLink({ host, currentUser, small }: HostLinkProps) {
  const { t } = useTranslation();
  const classes = useStyles();
  const isHost = currentUser && currentUser.id === host.id;
  return (
    <Link to="/profile" className={classes.link}>
      <Grid container direction="row" alignItems="center">
        <AccountCircleIcon className={classes.icon} fontSize={small ? 'default' : 'large'} />
        <Typography component="span" variant="body2">
          {isHost ? t('meetings.hostedbyYou') : t('meetings.hostedby', { host: host.name })}
        </Typography>
      </Grid>
    </Link>
  );
}
HostLink.defaultProps = {
  currentUser: undefined,
  small: false,
};

export default HostLink;

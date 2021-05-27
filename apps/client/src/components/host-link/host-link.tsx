import { Avatar, Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { UserCoreFields } from '../../models/user/__generated-interfaces__/UserCoreFields';
import { generateLink, ROUTES } from '../../routes';

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
  iconRegular: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  iconSmall: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    fontSize: theme.typography.body2.fontSize,
    lineHeight: theme.typography.body2.lineHeight,
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
    <Link to={generateLink(ROUTES.profile.publicProfile, { id: host.id })} className={classes.link}>
      <Grid container direction="row" alignItems="center">
        <Avatar className={[classes.icon, small ? classes.iconSmall : classes.iconRegular].join(' ')}>
          {host.name.charAt(0).toUpperCase()}
        </Avatar>
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

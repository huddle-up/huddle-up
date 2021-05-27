import React from 'react';
import { Avatar, makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { AvatarGroup } from '@material-ui/lab';
import { MeetingFields } from '../../models/meetings/__generated-interfaces__/MeetingFields';
import { generateLink, ROUTES } from '../../routes';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      marginBottom: theme.spacing(1),
    },
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
    transition: theme.transitions.create('background-color'),
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
    },
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
    border: 'none',
  },
}));

interface ParticipantAvatarsProps {
  meeting: MeetingFields;
  maxVisible: number;
}

function ParticipantAvatars({ meeting, maxVisible }: ParticipantAvatarsProps) {
  const classes = useStyles();
  const users = meeting.participations.map((p) => {
    return { id: p.user.id, name: p.user.name, shortName: p.user.name.charAt(0).toUpperCase() };
  });

  return (
    <div className={classes.root}>
      <AvatarGroup max={maxVisible}>
        {users.map((user) => (
          <Link to={generateLink(ROUTES.profile.profile, { id: user.id })} className={classes.link} key={user.id}>
            <Avatar alt={user.name} className={[classes.avatar, 'MuiAvatarGroup-avatar'].join(' ')}>
              {user.shortName}
            </Avatar>
          </Link>
        ))}
      </AvatarGroup>
    </div>
  );
}

export default ParticipantAvatars;

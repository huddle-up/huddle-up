import { makeStyles, Tooltip, Typography } from '@material-ui/core';
import { Group } from '@material-ui/icons';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { MeetingFields } from '../../models/meetings/__generated-interfaces__/MeetingFields';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    '& > span': {
      marginLeft: theme.spacing(0.5),
      padding: 0,
      lineHeight: 0,
    },
  },
}));

interface ParticipantCountProps {
  meeting: MeetingFields;
}

function ParticipantCount({ meeting }: ParticipantCountProps) {
  const { t } = useTranslation();
  const classes = useStyles();
  const count = meeting.participations.length;
  return (
    <div className={classes.root}>
      <Group fontSize="small" />
      <Typography variant="subtitle2" component="span">
        {t('meetings.participation.count.participant', { count })}
      </Typography>
    </div>
  );
}

export default ParticipantCount;

import React from 'react';
import { useTranslation } from 'react-i18next';
import { fade, makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography, Grid, Chip, Box } from '@material-ui/core';
import { CheckCircle, Videocam, AccountCircle } from '@material-ui/icons';
import { format, isToday } from 'date-fns';
import { Meeting_meeting as Meeting } from '../../models/meetings/__generated-interfaces__/Meeting';
import { Link } from '../link';
import { TagsList } from '../tags';
import { HostLink } from '../host-link';
import { useUser } from '../../models/user';
import { ParticipantCount } from '../participant-count';
import { isHost, isParticipant } from '../../utils';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  metaFont: {
    fontSize: 14,
  },
  tags: {
    margin: theme.spacing(0.5, 0),
  },
  card: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    transition: theme.transitions.create('background-color'),
  },
  cardHighlight: {
    backgroundColor: fade(theme.palette.secondary.light, 0.2),
  },
  cardContent: {
    flexGrow: 1,
  },
  spacer: {
    flex: '1 1',
  },
}));

interface MeetingCardProps {
  meeting: Meeting;
}

function MeetingCard({ meeting }: MeetingCardProps) {
  const { t } = useTranslation();
  const classes = useStyles();
  const { user } = useUser();
  const bull = <span className={classes.bullet}>•</span>;

  const { id, title, startDate, host, conference } = meeting;
  const meetingStart = new Date(startDate);
  const live = conference && conference.publishedAt && !conference.stoppedAt;

  return (
    <Card className={[classes.card, live ? classes.cardHighlight : ''].join(' ')} variant="outlined">
      <CardContent className={classes.cardContent}>
        <Grid container direction="row" alignItems="center">
          <Typography className={classes.metaFont} gutterBottom>
            {isToday(meetingStart) ? t('meetings.today') : format(meetingStart, 'dd. MMMM yyyy')} {bull}{' '}
            {format(meetingStart, 'HH:mm')}
          </Typography>
          <div className={classes.spacer} />
          {isParticipant(user, meeting) && (
            <Chip
              size="small"
              color="primary"
              icon={<CheckCircle />}
              label={t('meetings.participation.participating')}
            />
          )}
          {isHost(user, meeting) && (
            <Chip size="small" color="primary" icon={<AccountCircle />} label={t('meetings.host')} />
          )}
          {live && (
            <Box ml={1}>
              <Chip label="Live" size="small" color="secondary" icon={<Videocam />} />
            </Box>
          )}
        </Grid>
        <Typography variant="h5" component="h2">
          <Link to={`/meetings/${id}`}>{title}</Link>
        </Typography>
        <div className={classes.tags}>
          <TagsList tags={meeting.tags} />
        </div>
        <Grid container direction="row" justify="space-between" alignItems="center">
          <HostLink host={host} currentUser={user} small />
          <ParticipantCount meeting={meeting} />
        </Grid>
      </CardContent>
    </Card>
  );
}

export default MeetingCard;

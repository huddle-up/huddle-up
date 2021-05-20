import React from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography, Grid, CardActions, Box, Chip, Divider } from '@material-ui/core';
import { Edit, Event, Videocam } from '@material-ui/icons';
import { format, isToday, parseISO } from 'date-fns';
import { Meeting_meeting as Meeting } from '../../models/meetings/__generated-interfaces__/Meeting';
import { LinkButton } from '../link';
import { useUser } from '../../models/user';
import { TagsList } from '../tags';
import { HostLink } from '../host-link';
import { useMeetingState } from '../../models/meetings';
import { ConferenceAccess } from '../conference-access';
import { ConferenceControl } from '../conference-control';
import { MeetingParticipation } from '../meeting-participation';
import { ParticipantCount } from '../participant-count';
import { ParticipantAvatars } from '../participant-avatars';

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
  statusIcon: {
    display: 'flex',
    alignItems: 'center',
  },
  tags: {
    marginTop: theme.spacing(1),
  },
  card: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  cardContent: {
    flexGrow: 1,
  },
  description: {
    marginTop: theme.spacing(1),
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  spacer: {
    flex: '1 1',
  },
}));

interface MeetingCardProps {
  meeting: Meeting;
}

function MeetingDetailCard({ meeting }: MeetingCardProps) {
  const { user } = useUser();
  const { t } = useTranslation();
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  const meetingState = useMeetingState(meeting);
  const { id, title, description, startDate, endDate, host } = meeting;
  const meetingStart = parseISO(startDate);
  const meetingEnd = parseISO(endDate);

  const isHost = meetingState.isHost(user);

  return (
    <Card className={classes.card} variant="outlined">
      <CardContent className={classes.cardContent}>
        <Grid container direction="row" justify="space-between" alignItems="center">
          <Typography className={classes.metaFont} color="textSecondary" gutterBottom>
            {isToday(meetingStart) ? t('meetings.today') : format(meetingStart, 'dd. MMMM yyyy')} {bull}{' '}
            {format(meetingStart, 'HH:mm')}
          </Typography>
          {meetingState.isPublished && (
            <Box ml={1}>
              <Chip label="Live" size="small" color="secondary" icon={<Videocam />} />
            </Box>
          )}
        </Grid>
        <Typography variant="h5" component="h2">
          {title}
        </Typography>
        <div className={classes.tags}>
          <TagsList tags={meeting.tags} />
        </div>
      </CardContent>
      <Divider />
      <CardContent className={classes.cardContent}>
        <Grid container direction="row" justify="space-between" alignItems="center" spacing={2}>
          <Grid item>
            <HostLink host={host} currentUser={user} />
          </Grid>
          <Grid item>
            <ConferenceAccess meeting={meeting} state={meetingState} />
          </Grid>
        </Grid>
        <Grid container direction="row" justify="space-between" alignItems="center" spacing={2}>
          <Grid item>
            <ParticipantAvatars meeting={meeting} maxVisible={10} />
            <ParticipantCount meeting={meeting} />
          </Grid>
          <Grid item>
            <MeetingParticipation meeting={meeting} state={meetingState} />
          </Grid>
        </Grid>
      </CardContent>
      {meetingState.canManage(user) && (
        <>
          <Divider />
          <CardContent className={classes.cardContent}>
            <ConferenceControl meeting={meeting} state={meetingState} user={user} />
          </CardContent>
        </>
      )}
      <Divider />
      <CardContent className={classes.cardContent}>
        <Grid container direction="row" justify="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h6">{t('meetings.title.details')}</Typography>
          </Grid>
          <Grid item>
            <Grid container direction="row" alignItems="center">
              <Event />
              {format(meetingStart, 'dd. MMMM yyyy HH:mm')} - {format(meetingEnd, 'dd. MMMM yyyy HH:mm')}
            </Grid>
          </Grid>
        </Grid>
        <Typography variant="body2" className={classes.description}>
          {description || t('meetings.noDescription')}
        </Typography>
      </CardContent>
      {isHost && (
        <>
          <Divider />
          <CardActions className={classes.actions}>
            <LinkButton to={`/meetings/${id}/edit`} variant="outlined" color="primary" startIcon={<Edit />}>
              {t('meetings.button.edit')}
            </LinkButton>
          </CardActions>
        </>
      )}
    </Card>
  );
}

export default MeetingDetailCard;

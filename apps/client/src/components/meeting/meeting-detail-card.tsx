import React from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography, Grid, CardActions } from '@material-ui/core';
import VideocamIcon from '@material-ui/icons/Videocam';
import { format, isToday } from 'date-fns';
import Divider from '@material-ui/core/Divider';
import EventIcon from '@material-ui/icons/Event';
import EditIcon from '@material-ui/icons/Edit';
// TODO implement different meeting actions
// import CheckIcon from '@material-ui/icons/Check';
// import PersonAddIcon from '@material-ui/icons/PersonAdd';
// import CloseIcon from '@material-ui/icons/Close';
import { Meeting_meeting as Meeting } from '../../models/meetings/__generated-interfaces__/Meeting';
import { LinkButton } from '../link';
import { useUser } from '../../models/user';
import { TagsList } from '../tags';
import { HostLink } from '../host-link';
import { useMeetingState } from '../../models/meetings';
import { ConferenceAccess } from '../conference-access';
import { ConferenceControl } from '../conference-control';

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
  const meetingStart = new Date(startDate);
  const meetingEnd = new Date(endDate);

  const isHost = user.id === host.id;

  // TODO implement different meeting actions
  // const options = [
  //   t('meetings.button.member'),
  //   t('meetings.button.join'),
  //   t('meetings.button.leave'),
  //   t('meetings.button.cancel'),
  // ];
  // const iconOptions = [
  //   <CheckIcon fontSize="small" />,
  //   <PersonAddIcon fontSize="small" />,
  //   <CloseIcon fontSize="small" />,
  //   <CloseIcon fontSize="small" />,
  // ];

  return (
    <Card className={classes.card} variant="outlined">
      <CardContent className={classes.cardContent}>
        <Grid container direction="row" justify="space-between" alignItems="center">
          <Typography className={classes.metaFont} color="textSecondary" gutterBottom>
            {isToday(meetingStart) ? t('meetings.today') : format(meetingStart, 'dd. MMMM yyyy')} {bull}{' '}
            {format(meetingStart, 'HH:mm')}
          </Typography>
          {meetingState.isPublished && (
            <div className={classes.statusIcon}>
              <Typography className={classes.metaFont} color="textSecondary">
                Live
              </Typography>
              <VideocamIcon />
            </div>
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
        <Grid container direction="row" justify="space-between" alignItems="center">
          <HostLink host={host} currentUser={user} />
          <ConferenceAccess meeting={meeting} state={meetingState} />
          {/* <LinkButton
            to="/meetings"
            variant="contained"
            color="secondary"
            size="small"
            disableElevation
            endIcon={<VideocamIcon />}>
            {t('meetings.button.attend')}
          </LinkButton> */}
        </Grid>
        {/* TODO implement different meeting actions
          <br />
          <Grid container direction="row" justify="space-between" alignItems="center">
            <Typography variant="body2">...</Typography>
            <SplitButton options={options} icons={iconOptions} defaultSelectedIndex={1} />
          </Grid> */}
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
              <EventIcon />
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
            <LinkButton to={`/meetings/${id}/edit`} variant="outlined" color="primary" startIcon={<EditIcon />}>
              {t('meetings.button.edit')}
            </LinkButton>
          </CardActions>
        </>
      )}
    </Card>
  );
}

export default MeetingDetailCard;

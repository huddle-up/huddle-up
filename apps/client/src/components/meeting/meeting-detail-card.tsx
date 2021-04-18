import React from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography, Grid } from '@material-ui/core';
import VideocamIcon from '@material-ui/icons/Videocam';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { format, isToday, isWithinInterval } from 'date-fns';
import Divider from '@material-ui/core/Divider';
import EventIcon from '@material-ui/icons/Event';
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import CloseIcon from '@material-ui/icons/Close';
import { Meeting_meeting as Meeting } from '../../pages/meetings/__generated-interfaces__/Meeting';
import { Link, LinkButton } from '../link';
import { SplitButton } from '../button';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
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
}));

interface MeetingCardProps {
  meeting: Meeting;
}

function MeetingDetailCard({ meeting }: MeetingCardProps) {
  const { t } = useTranslation();
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  const { id, title, description, startDate, endDate, host } = meeting;
  const meetingStart = new Date(startDate);
  const meetingEnd = new Date(endDate);
  const live = isWithinInterval(new Date(), { start: meetingStart, end: meetingEnd });

  const options = [
    t('meetings.button.member'),
    t('meetings.button.join'),
    t('meetings.button.leave'),
    t('meetings.button.cancel'),
  ];

  const iconOptions = [
    <CheckIcon fontSize="small" />,
    <PersonAddIcon fontSize="small" />,
    <CloseIcon fontSize="small" />,
    <CloseIcon fontSize="small" />,
  ];

  return (
    <>
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <Grid container direction="row" justify="space-between" alignItems="center">
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              {isToday(meetingStart) ? t('meetings.today') : format(meetingStart, 'dd. MMMM yyyy')} {bull}{' '}
              {format(meetingStart, 'HH:mm')}
            </Typography>
            {live && (
              <Link to="/meeting">
                <Grid container direction="row" alignItems="center">
                  <Typography className={classes.title} color="textSecondary">
                    Live
                  </Typography>
                  <VideocamIcon />
                </Grid>
              </Link>
            )}
          </Grid>
          <Typography variant="h5" component="h2">
            <Link to="/meeting">{title}</Link>
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            Tags
          </Typography>
        </CardContent>
        <Divider />
        <CardContent className={classes.cardContent}>
          <Grid container direction="row" justify="space-between" alignItems="center">
            <Link to="/profile">
              <Grid container direction="row" alignItems="center">
                <AccountCircleIcon fontSize="large" />{' '}
                <Typography variant="body2">
                  {t('meetings.hostedby')} {host.name}
                </Typography>
              </Grid>
            </Link>
            <LinkButton to="/meeting" variant="contained" color="secondary" size="small" endIcon={<VideocamIcon />}>
              {t('meetings.button.attend')}
            </LinkButton>
          </Grid>
          <br />
          <Grid container direction="row" justify="space-between" alignItems="center">
            <Typography variant="body2">...</Typography>
            <SplitButton options={options} icons={iconOptions} defaultSelectedIndex={1} />
          </Grid>
        </CardContent>
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
            {description}
          </Typography>
        </CardContent>
      </Card>
      <Grid container direction="row" justify="space-between" alignItems="center">
        <LinkButton
          to={`/update-meeting/${id}`}
          variant="contained"
          color="primary"
          size="small"
          startIcon={<EditIcon />}>
          {t('meetings.button.edit')}
        </LinkButton>
      </Grid>
    </>
  );
}

export default MeetingDetailCard;

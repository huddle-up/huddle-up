import React from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography, Grid } from '@material-ui/core';
import VideocamIcon from '@material-ui/icons/Videocam';
import CheckIcon from '@material-ui/icons/Check';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { format, isToday, isWithinInterval } from 'date-fns';
import { Meeting_meeting as Meeting } from '../../models/meetings/__generated-interfaces__/Meeting';
import { Link, LinkButton } from '../link';
import { TagsList } from '../tags';

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
  card: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  cardContent: {
    flexGrow: 1,
  },
}));

interface MeetingCardProps {
  meeting: Meeting;
}

function MeetingCard({ meeting }: MeetingCardProps) {
  const { t } = useTranslation();
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  const { id, title, startDate, endDate, host } = meeting;
  const meetingStart = new Date(startDate);
  const meetingEnd = new Date(endDate);
  const live = isWithinInterval(new Date(), { start: meetingStart, end: meetingEnd });

  return (
    <Card className={classes.card} variant="outlined">
      <CardContent className={classes.cardContent}>
        <Grid container direction="row" justify="space-between" alignItems="center">
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            {isToday(meetingStart) ? t('meetings.today') : format(meetingStart, 'dd. MMMM yyyy')} {bull}{' '}
            {format(meetingStart, 'HH:mm')}
          </Typography>
          {live && (
            <Link to={`/meetings/${id}`}>
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
          <Link to={`/meetings/${id}`}>{title}</Link>
        </Typography>
        <Typography>
          <TagsList tags={meeting.tags} />
        </Typography>
        <Grid container direction="row" justify="space-between" alignItems="center">
          <Link to="/profile">
            <Grid container direction="row" alignItems="center">
              <AccountCircleIcon />{' '}
              <Typography variant="body2">
                {t('meetings.hostedby')} {host.name}
              </Typography>
            </Grid>
          </Link>
          <LinkButton to="/meetings" variant="outlined" size="small" startIcon={<CheckIcon />}>
            {t('meetings.participant')}
          </LinkButton>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default MeetingCard;

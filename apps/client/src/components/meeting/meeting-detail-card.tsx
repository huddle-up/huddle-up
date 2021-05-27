import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { fade, makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography, Grid, Box, Collapse, CardActions, Divider } from '@material-ui/core';
import { Edit, Event } from '@material-ui/icons';
import { format, isToday, parseISO } from 'date-fns';
import { Meeting_meeting as Meeting } from '../../models/meetings/__generated-interfaces__/Meeting';
import { LinkButton } from '../link';
import { useUser } from '../../models/user';
import { TagsList } from '../tags';
import { HostLink } from '../host-link';
import { useMeetingState } from '../../models/meetings';
import { ConferenceState } from '../conference-state';
import { ConferenceControl } from '../conference-control';
import { MeetingParticipation } from '../meeting-participation';
import { ParticipantCount } from '../participant-count';
import { ParticipantAvatars } from '../participant-avatars';
import { ConferenceJoinButton } from '../conference-join-button';
import { CanceledStatusChip, HostStatusChip, LiveStatusChip } from './status-chips';

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
  statusChips: {
    display: 'flex',
    alignItems: 'center',
  },
  card: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  cardContent: {
    flexGrow: 1,
    transition: theme.transitions.create('background-color'),
  },
  contentHighlight: {
    backgroundColor: fade(theme.palette.secondary.light, 0.3),
  },
  description: {
    marginTop: theme.spacing(1),
  },
  spacer: {
    flex: '1 1',
  },
}));

interface CardSectionProps {
  children: React.ReactNode;
  className?: string;
  highlight?: boolean;
}

function CardSection({ children, className, highlight }: CardSectionProps) {
  const classes = useStyles();
  return (
    <CardContent
      className={[classes.cardContent, highlight ? classes.contentHighlight : '', className]
        .filter((c) => !!c)
        .join(' ')}>
      {children}
    </CardContent>
  );
}
CardSection.defaultProps = {
  className: '',
  highlight: false,
};

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

  const [showControls, setShowControls] = useState(false);
  useEffect(() => {
    setShowControls(showControls || meetingState.canManage(user));
  }, [showControls, meetingState, user]);

  return (
    <Card className={classes.card} variant="outlined">
      <CardSection highlight={meetingState.isPublished}>
        <Grid container direction="row" justify="space-between" alignItems="center">
          <Typography className={classes.metaFont} gutterBottom>
            {isToday(meetingStart) ? t('meetings.today') : format(meetingStart, 'dd. MMMM yyyy')} {bull}{' '}
            {format(meetingStart, 'HH:mm')}
          </Typography>
          <div className={classes.statusChips}>
            {isHost && (
              <Box ml={1}>
                <HostStatusChip />
              </Box>
            )}
            {meetingState.isPublished && (
              <Box ml={1}>
                <LiveStatusChip />
              </Box>
            )}
            {meetingState.isCanceled && (
              <Box ml={1}>
                <CanceledStatusChip />
              </Box>
            )}
          </div>
        </Grid>
        <Typography variant="h5" component="h1">
          {title}
        </Typography>
        <Box mt={1}>
          <Grid container direction="row" justify="space-between" alignItems="center" spacing={2}>
            <Grid item>
              <HostLink host={host} currentUser={user} />
            </Grid>
            <Grid item>
              <ConferenceState meeting={meeting} state={meetingState} />
            </Grid>
          </Grid>
        </Box>
      </CardSection>
      <Divider />
      <Collapse in={meetingState.isParticipant(user) && meetingState.canJoin(user)}>
        <CardSection>
          <Grid container direction="row" justify="space-between" alignItems="center">
            <Grid item>
              <Typography>{t('meetings.details.joinNow')}</Typography>
            </Grid>
            <Grid item>
              <ConferenceJoinButton conferenceId={meeting.conference?.id} />
            </Grid>
          </Grid>
        </CardSection>
        <Divider />
      </Collapse>
      <Collapse in={showControls}>
        <CardSection>
          <Typography variant="h6">{t('meetings.details.manage')}</Typography>
          <Box mt={1}>
            <ConferenceControl meeting={meeting} state={meetingState} user={user} />
          </Box>
        </CardSection>
        <Divider />
      </Collapse>
      <CardSection>
        <Typography variant="h6">{t('meetings.details.participants')}</Typography>
        <Grid container direction="row" justify="space-between" alignItems="center" spacing={2}>
          <Grid item>
            <ParticipantAvatars meeting={meeting} maxVisible={10} />
            <ParticipantCount meeting={meeting} />
          </Grid>
          <Grid item>
            <MeetingParticipation meeting={meeting} state={meetingState} />
          </Grid>
        </Grid>
      </CardSection>
      <Divider />
      <CardSection>
        <Grid container direction="row" justify="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h6">{t('meetings.details.details')}</Typography>
          </Grid>
          <Grid item>
            <Grid container direction="row" alignItems="center">
              <Event />
              {format(meetingStart, 'dd. MMMM yyyy HH:mm')} - {format(meetingEnd, 'dd. MMMM yyyy HH:mm')}
            </Grid>
          </Grid>
        </Grid>
        <Box mt={1}>
          <TagsList tags={meeting.tags} />
        </Box>
        <Typography variant="body2" className={classes.description}>
          {description || t('meetings.details.noDescription')}
        </Typography>
      </CardSection>
      {isHost && (
        <>
          <Divider />
          <CardActions>
            <Grid container justify="flex-end">
              <LinkButton to={`/meetings/${id}/edit`} variant="outlined" color="primary" startIcon={<Edit />}>
                {t('meetings.button.edit')}
              </LinkButton>
            </Grid>
          </CardActions>
        </>
      )}
    </Card>
  );
}

export default MeetingDetailCard;

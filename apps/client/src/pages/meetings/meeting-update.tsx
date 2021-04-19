import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { DateTimePicker } from '@material-ui/pickers';
import EventIcon from '@material-ui/icons/Event';
import { Button, IconButton, InputAdornment } from '@material-ui/core';
import { useQuery, useMutation, gql } from '@apollo/client';
import { Redirect, useParams } from 'react-router-dom';
import SaveIcon from '@material-ui/icons/Save';
import { Meeting, MeetingVariables, Meeting_meeting } from './__generated-interfaces__/Meeting';
import { UpdateMeeting, UpdateMeetingVariables } from './__generated-interfaces__/UpdateMeeting';
import { LinkButton } from '../../components/link';
import { AppPageMain } from '../../components/app-page-layout';

const useStyles = makeStyles((theme) => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    padding: theme.spacing(1),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
      padding: theme.spacing(3),
    },
  },
}));

export const MEETING = gql`
  query Meeting($id: String!) {
    meeting(id: $id) {
      id
      title
      description
      startDate
      endDate
      __typename
      host {
        id
        email
        name
        __typename
      }
    }
  }
`;

const UPDATE_MEETING = gql`
  mutation UpdateMeeting($id: String!, $title: String, $description: String, $startDate: DateTime, $endDate: DateTime) {
    updateMeeting(
      updateMeetingInput: {
        id: $id
        title: $title
        description: $description
        startDate: $startDate
        endDate: $endDate
      }
    ) {
      id
      title
      description
      startDate
      endDate
      __typename
    }
  }
`;

// TODO is it possible to remove a meeting?
// const REMOVE_MEETING = gql`
//   mutation RemoveMeeting($id: Int) {
//     removeMeeting(id: $id)
//   }
// `;

function MeetingUpdate() {
  const { t } = useTranslation();
  const classes = useStyles();
  const { id } = useParams<MeetingVariables>();

  const { loading: queryLoading, error: queryError, data } = useQuery<Meeting>(MEETING, {
    variables: { id },
  });

  const [updateMeeting, { loading: mutationLoading, error: mutationError, called: mutationCalled }] = useMutation<
    UpdateMeeting,
    UpdateMeetingVariables
  >(UPDATE_MEETING);

  const [meeting, setMeeting] = useState<Meeting_meeting | undefined>();

  useEffect(() => {
    if (!queryError && data && data.meeting && !meeting) {
      setMeeting(data.meeting);
    }
  }, [queryError, data, meeting]);

  function handleMeetingUpdate(e) {
    e.preventDefault();
    updateMeeting({
      variables: meeting,
    });
  }

  if (queryLoading || !meeting) return <Paper className={classes.paper}>Loading...</Paper>;
  if (queryError) return <Paper className={classes.paper}>`Error loading meeting! ${queryError.message}`</Paper>;

  return (
    <>
      <Helmet>
        <title>{t('meetings.head.title.edit')}</title>
      </Helmet>
      <AppPageMain className={classes.layout}>
        <Typography variant="h6" gutterBottom>
          {t('meetings.title.edit')}
        </Typography>
        {mutationLoading && <p>Loading...</p>}
        {mutationError && <p>Error... ${mutationError.message}</p>}
        {!mutationLoading && !mutationError && mutationCalled && <Redirect to={`/meetings/${id}`} />}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            updateMeeting({
              variables: meeting,
            });
          }}>
          <Paper className={classes.paper}>
            <Typography variant="h6" gutterBottom>
              {t('meetings.title.about')}
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  id="title"
                  name="title"
                  label={t('meetings.form.title')}
                  value={meeting.title}
                  onChange={(e) => setMeeting({ ...meeting, title: e.target.value.toString() })}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="description"
                  label={t('meetings.form.description')}
                  value={meeting.description}
                  onChange={(e) => setMeeting({ ...meeting, description: e.target.value.toString() })}
                  multiline
                  fullWidth
                  rows={10}
                  rowsMax={10}
                />
              </Grid>
            </Grid>
          </Paper>
          <Paper className={classes.paper}>
            <Typography variant="h6" gutterBottom>
              {t('meetings.title.dateTime')}
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <DateTimePicker
                  value={meeting.startDate}
                  onChange={(date) => setMeeting({ ...meeting, startDate: date ? date.toString() : null })}
                  label={t('meetings.form.startDate')}
                  okLabel={t('global.datepicker.okLabel')}
                  cancelLabel={t('global.datepicker.cancelLabel')}
                  clearLabel={t('global.datepicker.clearLabel')}
                  todayLabel={t('global.datepicker.todayLabel')}
                  format="dd.MM.yyyy hh:mm"
                  // disablePast
                  showTodayButton
                  clearable
                  required
                  autoOk
                  ampm={false}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton>
                          <EventIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <DateTimePicker
                  value={meeting.endDate}
                  onChange={(date) => setMeeting({ ...meeting, endDate: date ? date.toString() : null })}
                  label={t('meetings.form.endDate')}
                  okLabel={t('global.datepicker.okLabel')}
                  cancelLabel={t('global.datepicker.cancelLabel')}
                  clearLabel={t('global.datepicker.clearLabel')}
                  todayLabel={t('global.datepicker.todayLabel')}
                  format="dd.MM.yyyy hh:mm"
                  // disablePast
                  showTodayButton
                  clearable
                  required
                  autoOk
                  ampm={false}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton>
                          <EventIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
          </Paper>
          <Paper className={classes.paper} elevation={0}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <LinkButton to={`/meetings/${id}`} variant="outlined" color="primary" size="small">
                  {t('global.button.cancel')}
                </LinkButton>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  onClick={handleMeetingUpdate}
                  variant="contained"
                  color="primary"
                  size="small"
                  startIcon={<SaveIcon />}>
                  {t('meetings.button.save')}
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </form>
      </AppPageMain>
    </>
  );
}

export default MeetingUpdate;

import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { DateTimePicker } from '@material-ui/pickers';
import EventIcon from '@material-ui/icons/Event';
import { IconButton, Button, InputAdornment } from '@material-ui/core';
import { useMutation, gql } from '@apollo/client';
import CreateIcon from '@material-ui/icons/Create';
import { Redirect } from 'react-router';
import { LinkButton } from '../../components/link';
import { CreateMeeting } from './__generated-interfaces__/CreateMeeting';
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
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
      padding: theme.spacing(3),
    },
  },
}));

const CREATE_MEETING = gql`
  mutation CreateMeeting($title: String!, $description: String, $startDate: DateTime!, $endDate: DateTime!) {
    createMeeting(
      createMeetingInput: { title: $title, description: $description, startDate: $startDate, endDate: $endDate }
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
interface FormProps {
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
}

function MeetingCreate() {
  const { t } = useTranslation();
  const classes = useStyles();

  const [
    createMeeting,
    { loading: mutationLoading, error: mutationError, called: mutationCalled, data: mutationData },
  ] = useMutation<CreateMeeting>(CREATE_MEETING);

  const endDate = new Date();
  endDate.setHours(endDate.getHours() + 1);

  const [meeting, setMeeting] = useState<FormProps>({
    title: '',
    description: '',
    startDate: new Date().toUTCString(),
    endDate: endDate.toUTCString(),
  });

  function handleCreateMeeting(e) {
    e.preventDefault();
    createMeeting({
      variables: meeting,
    });
  }

  return (
    <>
      <Helmet>
        <title>{t('meetings.head.title.create')}</title>
      </Helmet>
      <AppPageMain className={classes.layout}>
        <Typography variant="h6" gutterBottom>
          {t('meetings.title.new')}
        </Typography>
        {mutationLoading && <p>Loading...</p>}
        {mutationError && <p>Error... ${mutationError.message}</p>}
        {!mutationLoading && !mutationError && mutationCalled && (
          <Redirect to={`/meetings/${mutationData.createMeeting.id}`} />
        )}
        <form>
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
                  onChange={(e) => setMeeting({ ...meeting, title: e.target.value })}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="description"
                  label={t('meetings.form.description')}
                  value={meeting.description}
                  onChange={(e) => setMeeting({ ...meeting, description: e.target.value })}
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
                  format="dd.MM.yyyy HH:mm"
                  disablePast
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
                  format="dd.MM.yyyy HH:mm"
                  disablePast
                  minDate={meeting.startDate}
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
                <LinkButton to="/meetings" variant="outlined" color="primary">
                  {t('global.button.cancel')}
                </LinkButton>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  onClick={handleCreateMeeting}
                  color="primary"
                  variant="contained"
                  disabled={!meeting.title || !meeting.startDate || !meeting.endDate}
                  startIcon={<CreateIcon />}>
                  {t('meetings.button.create')}
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </form>
      </AppPageMain>
    </>
  );
}

export default MeetingCreate;

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { DateTimePicker } from '@material-ui/pickers';
import EventIcon from '@material-ui/icons/Event';
import { IconButton, Button, InputAdornment } from '@material-ui/core';
import { useQuery, useMutation, gql } from '@apollo/client';

const useStyles = makeStyles((theme) => ({
  mainContent: {},
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

const MEETING = gql`
  query getMeeting($id: Int!) {
    meeting(id: $id) {
      id
      title
      description
      startDate
      endDate
      __typename
    }
  }
`;

const UPDATE_MEETING = gql`
  mutation updateMeeting($id: Int!, $title: String, $description: String, $startDate: DateTime, $endDate: DateTime) {
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

// const REMOVE_MEETING = gql`
//   mutation removeMeeting($id: Int) {
//     removeMeeting(id: $id)
//   }
// `;

interface FormProps {
  id: number;
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
}

function MeetingUpdate() {
  const { t } = useTranslation();
  const classes = useStyles();

  const { loading: queryLoading, error: queryError, data } = useQuery(MEETING, {
    variables: { id: 1 },
  });

  const [updateMeeting, { loading: mutationLoading, error: mutationError }] = useMutation(UPDATE_MEETING);

  const [meeting, setMeeting] = useState<FormProps | undefined>();

  useEffect(() => {
    if (!queryError && data && data.meeting && !meeting) {
      setMeeting(data.meeting);
    }
  }, [queryError, data, meeting]);

  if (queryLoading || !meeting) return <Paper className={classes.paper}>Loading...</Paper>;
  if (queryError) return <Paper className={classes.paper}>`Error loading meeting! ${queryError.message}`</Paper>;

  return (
    <>
      <Typography variant="h6" gutterBottom>
        {t('meetings.title.edit')} (ID 1)
      </Typography>
      {mutationLoading && <p>Loading...</p>}
      {mutationError && <p>Error... ${mutationError.message}</p>}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          updateMeeting({
            variables: meeting,
          });
        }}>
        <Paper className={classes.paper}>
          <div className={classes.mainContent}>
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
          </div>
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
              <Button href="#" color="primary" variant="outlined">
                {t('global.button.cancel')}
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button type="submit" color="primary" variant="contained">
                {t('meetings.button.save')}
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </form>
    </>
  );
}

export default MeetingUpdate;

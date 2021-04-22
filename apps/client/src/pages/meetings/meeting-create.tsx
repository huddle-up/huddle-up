import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { DateTimePicker } from '@material-ui/pickers';
import EventIcon from '@material-ui/icons/Event';
import { IconButton, Button, InputAdornment, CardActions } from '@material-ui/core';
import { useMutation } from '@apollo/client';
import CreateIcon from '@material-ui/icons/Create';
import { Redirect } from 'react-router';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import { LinkButton } from '../../components/link';
import { CreateMeeting } from '../../models/meetings/__generated-interfaces__/CreateMeeting';
import { CREATE_MEETING } from '../../models/meetings';
import { AppPageMain } from '../../components/app-page-layout';
import { SectionHeader } from '../../components/section-header';

const useStyles = makeStyles((theme) => ({
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
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
}));

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
    <AppPageMain>
      <section>
        <SectionHeader icon={<PlayCircleOutlineIcon />} title={t('meetings.title.new')} />
        {mutationLoading && <p>Loading...</p>}
        {mutationError && <p>Error... ${mutationError.message}</p>}
        {!mutationLoading && !mutationError && mutationCalled && (
          <Redirect to={`/meetings/${mutationData.createMeeting.id}`} />
        )}
        <form>
          <Paper className={classes.paper} variant="outlined">
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
          <Paper className={classes.paper} variant="outlined">
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
          <Paper className={classes.paper} variant="outlined">
            <CardActions className={classes.actions}>
              <LinkButton to="/meetings" variant="outlined" color="primary">
                {t('global.button.cancel')}
              </LinkButton>
              <Button
                onClick={handleCreateMeeting}
                color="primary"
                variant="contained"
                disabled={!meeting.title || !meeting.startDate || !meeting.endDate}
                startIcon={<CreateIcon />}>
                {t('meetings.button.create')}
              </Button>
            </CardActions>
          </Paper>
        </form>
      </section>
    </AppPageMain>
  );
}

export default MeetingCreate;

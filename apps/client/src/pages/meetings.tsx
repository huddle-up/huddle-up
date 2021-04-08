import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { DateTimePicker } from '@material-ui/pickers';
import EventIcon from '@material-ui/icons/Event';
import { IconButton, Button, InputAdornment } from '@material-ui/core';

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

function Meetings() {
  const { t } = useTranslation();
  const classes = useStyles();
  const [selectedDate, handleDateChange] = useState(undefined);

  return (
    <>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <div className={classes.mainContent}>
            <Typography variant="h6" gutterBottom>
              {t('meetings.title.about')}
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField required id="title" name="title" label={t('meetings.form.title')} fullWidth />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="description"
                  label={t('meetings.form.description')}
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
                value={selectedDate}
                onChange={handleDateChange}
                label={t('meetings.form.startDate')}
                okLabel={t('global.datepicker.okLabel')}
                cancelLabel={t('global.datepicker.cancelLabel')}
                clearLabel={t('global.datepicker.clearLabel')}
                todayLabel={t('global.datepicker.todayLabel')}
                format="dd.MM.yyyy hh:mm"
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
                value={selectedDate}
                onChange={handleDateChange}
                label={t('meetings.form.endDate')}
                okLabel={t('global.datepicker.okLabel')}
                cancelLabel={t('global.datepicker.cancelLabel')}
                clearLabel={t('global.datepicker.clearLabel')}
                todayLabel={t('global.datepicker.todayLabel')}
                format="dd.MM.yyyy hh:mm"
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
              <Button href="#" color="primary" variant="contained">
                {t('meetings.button.create')}
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </main>
    </>
  );
}

export default Meetings;

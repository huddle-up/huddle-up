import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { DateTimePicker, KeyboardDateTimePicker } from '@material-ui/pickers';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
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
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
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
              Meeting
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField required id="title" name="title" label="Title" fullWidth autoComplete="title" />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="description"
                  label="Description"
                  multiline
                  autoComplete="description"
                  fullWidth
                  variant="filled"
                  rows={10}
                  rowsMax={10}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <DateTimePicker
                  value={selectedDate}
                  onChange={handleDateChange}
                  label="from"
                  autoOk
                  ampm={false}
                  disablePast
                  showTodayButton
                  clearable
                  required
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton>
                          <CalendarTodayIcon />
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
                  label="to"
                  autoOk
                  ampm={false}
                  disablePast
                  showTodayButton
                  clearable
                  required
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton>
                          <CalendarTodayIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
          </div>
        </Paper>
      </main>
    </>
  );
}

export default Meetings;

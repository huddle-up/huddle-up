import React from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import { useQuery, gql } from '@apollo/client';
import { Paper, Typography } from '@material-ui/core';
import MeetingUpdate from './meeting-update';
import MeetingCreate from './meeting-create';

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

const MEETINGS = gql`
  query getMeetings {
    meetings {
      id
      title
      description
      startDate
      endDate
      __typename
    }
  }
`;

function MeetingList() {
  const { t } = useTranslation();
  const { loading, error, data } = useQuery(MEETINGS);
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  return data.meetings.map(({ id, title, description, startDate, endDate }) => (
    <div key={id}>
      <p>
        [ID {id}] {t('meetings.form.title')}: {title} <br />
        {t('meetings.form.description')}: {description} <br />
        {t('meetings.form.startDate')}: {startDate} <br />
        {t('meetings.form.endDate')}: {endDate}
      </p>
    </div>
  ));
}

function Meetings() {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <>
      <main className={classes.layout}>
        <Typography variant="h6" gutterBottom>
          {t('global.title.meetings')}
        </Typography>
        <Paper className={classes.paper}>
          <MeetingList />
        </Paper>
        <MeetingUpdate />
        <MeetingCreate />
      </main>
    </>
  );
}

export default Meetings;

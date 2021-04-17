import React from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { Meeting, MeetingVariables } from './__generated-interfaces__/Meeting';
import { MeetingDetailCard } from '../../components/meeting';
import { MEETING } from './meeting-update';

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

function MeetingDetail() {
  const { t } = useTranslation();
  const classes = useStyles();
  const { id } = useParams<MeetingVariables>();

  const { loading: queryLoading, error: queryError, data } = useQuery<Meeting>(MEETING, {
    variables: { id },
  });

  if (queryLoading) return <Paper className={classes.paper}>Loading...</Paper>;
  if (queryError) return <Paper className={classes.paper}>`Error loading meeting! ${queryError.message}`</Paper>;

  return (
    <>
      <Helmet>
        <title>{t('meetings.head.title.view')}</title>
      </Helmet>
      <main className={classes.layout}>
        <Typography variant="h6" gutterBottom>
          {t('global.title.meeting')}
        </Typography>
        <MeetingDetailCard meeting={data.meeting} />
      </main>
    </>
  );
}

export default MeetingDetail;

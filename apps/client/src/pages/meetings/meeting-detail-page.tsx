import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import Paper from '@material-ui/core/Paper';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import { Meeting, MeetingVariables } from '../../models/meetings/__generated-interfaces__/Meeting';
import { MeetingDetailCard } from '../../components/meeting';
import { MEETING } from '../../models/meetings';
import { AppPageMain } from '../../components/app-page-layout';
import { SectionHeader } from '../../components/section-header';

const useStyles = makeStyles((theme) => ({
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

function MeetingDetailPage() {
  const { t } = useTranslation();
  const classes = useStyles();
  const { id } = useParams<MeetingVariables>();

  const { loading: queryLoading, error: queryError, data } = useQuery<Meeting>(MEETING, {
    variables: { id },
  });

  if (queryLoading) return <Paper className={classes.paper}>Loading...</Paper>;
  if (queryError) return <Paper className={classes.paper}>`Error loading meeting! ${queryError.message}`</Paper>;

  return (
    <AppPageMain>
      <section>
        <SectionHeader icon={<PlayCircleOutlineIcon />} title={t('global.title.meeting')} />
        <MeetingDetailCard meeting={data.meeting} />
      </section>
    </AppPageMain>
  );
}

export default MeetingDetailPage;

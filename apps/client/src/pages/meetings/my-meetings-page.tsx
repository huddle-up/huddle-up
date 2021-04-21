import React from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import { useQuery, gql } from '@apollo/client';
import { Typography } from '@material-ui/core';
import { AppPageMain } from '../../components/app-page-layout';
import { MeetingList } from '../../components/meeting';
import { MyMeetings } from './__generated-interfaces__/MyMeetings';

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
}));

const MY_MEETINGS = gql`
  query MyMeetings {
    myMeetings {
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

function MyMeetingsPage() {
  const { t } = useTranslation();
  const classes = useStyles();

  const { loading, error, data } = useQuery<MyMeetings>(MY_MEETINGS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error! ${error.message}</p>;

  return (
    <>
      <Helmet>
        <title>{t('global.title.myMeetings')}</title>
      </Helmet>
      <AppPageMain className={classes.layout}>
        <Typography variant="h6" gutterBottom>
          {t('global.title.myMeetings')}
        </Typography>
        <MeetingList meetings={data.myMeetings} />
      </AppPageMain>
    </>
  );
}

export default MyMeetingsPage;

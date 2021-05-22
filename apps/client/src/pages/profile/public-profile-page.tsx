import React from 'react';
import { useQuery } from '@apollo/client';
import { PersonOutlined } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, Divider, Grid, Typography, makeStyles, Paper } from '@material-ui/core';
import { useParams } from 'react-router';
import { format, parseISO } from 'date-fns';
import { SectionHeader } from '../../components/section-header';
import { CardTitle } from '../../components/card-title';
import { User, UserVariables } from '../../models/user/__generated-interfaces__/User';
import { USER } from '../../models/user';

const useStyles = makeStyles((theme) => ({
  card: {
    marginBottom: theme.spacing(3),
  },
  cardContent: {
    border: 'none',
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  description: {
    marginTop: theme.spacing(1),
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

function PublicProfilePage() {
  const classes = useStyles();
  const { t } = useTranslation();
  const { id } = useParams<UserVariables>();

  const { loading: queryLoading, error: queryError, data } = useQuery<User, UserVariables>(USER, {
    variables: { id },
  });

  if (queryLoading) return <Paper className={classes.paper}>Loading...</Paper>;
  if (queryError) return <Paper className={classes.paper}>`Error loading user! ${queryError.message}`</Paper>;

  return (
    <section>
      <SectionHeader icon={<PersonOutlined />} title={t('profile.profile.pulicProfileSection')} />
      <Card className={classes.card} variant="outlined">
        <CardContent className={classes.cardContent} component="fieldset">
          <CardTitle title={data.user.name || t('profile.profile.noName')} titleComponent="legend" />
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="body2" className={classes.description}>
                {`${t('profile.profile.joinedAt')} ${format(parseISO(data.user.joinedAt), 'dd. MMMM yyyy')}`}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardContent className={classes.cardContent} component="fieldset">
          <CardTitle title={t('profile.profile.fields.biography')} titleComponent="legend" />
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="body2" className={classes.description}>
                {data.user.biography || t('profile.profile.noBiography')}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </section>
  );
}

export default PublicProfilePage;

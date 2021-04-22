import { Button, Card, CardActions, CardContent, Divider, Grid, makeStyles, Typography } from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-material-ui';
import React from 'react';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

const useStyles = makeStyles((theme) => ({
  cardTitle: {
    marginBottom: theme.spacing(2),
  },
  titleCaption: {
    marginTop: theme.spacing(0.5),
  },
  card: {
    marginBottom: theme.spacing(3),
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
}));
interface UserProfileFormValues {
  name: string;
  email: string;
  biography: string;
}

interface UserProfileFormProps {
  initialValues: UserProfileFormValues;
  onSubmit: (values: UserProfileFormValues) => Promise<void>;
}

function CardTitle({ title, caption }: { title: string; caption?: string }) {
  const classes = useStyles();
  return (
    <div className={classes.cardTitle}>
      <Typography component="legend" variant="h6">
        {title}
      </Typography>
      {caption && (
        <Typography className={classes.titleCaption} component="p" variant="body2">
          {caption}
        </Typography>
      )}
    </div>
  );
}
CardTitle.defaultProps = {
  caption: undefined,
};

function UserProfileForm({ initialValues: { name, email, biography }, onSubmit }: UserProfileFormProps) {
  const classes = useStyles();
  const { t } = useTranslation();
  const FormSchema = Yup.object().shape({
    name: Yup.string()
      .max(50, t('global.form.validation.maxCountCharacters', { count: 50 }))
      .required(t('global.form.validation.required')),
    email: Yup.string().email('Must be a valid email').required(t('global.form.validation.required')),
    biography: Yup.string(),
  });
  return (
    <Formik
      initialValues={{ name, email, biography: biography || '' }}
      validationSchema={FormSchema}
      onSubmit={onSubmit}>
      {({ submitForm, isSubmitting, handleReset }) => (
        <Form>
          <Card className={classes.card} component="fieldset" variant="outlined">
            <CardContent>
              <CardTitle title={t('profile.profile.yourInformation')} />
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Field
                    component={TextField}
                    fullWidth
                    variant="outlined"
                    name="name"
                    label={t('global.form.fields.name')}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Field
                    component={TextField}
                    fullWidth
                    variant="outlined"
                    name="email"
                    label={t('global.form.fields.email')}
                    disabled
                  />
                </Grid>
              </Grid>
            </CardContent>
            <Divider />
            <CardContent>
              <CardTitle title={t('profile.profile.aboutYou')} caption={t('profile.profile.aboutYouText')} />
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Field
                    component={TextField}
                    fullWidth
                    variant="outlined"
                    name="biography"
                    label={t('profile.fields.biography')}
                    multiline
                  />
                </Grid>
              </Grid>
            </CardContent>
            <Divider />
            <CardActions className={classes.actions}>
              <Button onClick={handleReset} disabled={isSubmitting} variant="outlined" color="primary">
                Cancel
              </Button>
              <Button onClick={submitForm} disabled={isSubmitting} variant="contained" disableElevation color="primary">
                SAVE
              </Button>
            </CardActions>
          </Card>
        </Form>
      )}
    </Formik>
  );
}

export default UserProfileForm;

import React, { useState } from 'react';
import { Button, Card, CardActions, CardContent, CircularProgress, Divider, Grid, makeStyles } from '@material-ui/core';
import { Edit, Save } from '@material-ui/icons';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-material-ui';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { CardTitle } from '../card-title';

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

function UserProfileForm({ initialValues: { name, email, biography }, onSubmit }: UserProfileFormProps) {
  const classes = useStyles();
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);
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
          <Card className={classes.card} variant="outlined">
            <CardContent className={classes.cardContent} component="fieldset" disabled={!isEditing}>
              <CardTitle title={t('profile.profile.yourInformation')} titleComponent="legend" />
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Field
                    component={TextField}
                    fullWidth
                    variant="outlined"
                    name="name"
                    label={t('global.form.fields.name')}
                    required
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
            <CardContent className={classes.cardContent} component="fieldset" disabled={!isEditing}>
              <CardTitle
                title={t('profile.profile.aboutYou')}
                caption={t('profile.profile.aboutYouText')}
                titleComponent="legend"
              />
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Field
                    component={TextField}
                    fullWidth
                    variant="outlined"
                    name="biography"
                    label={t('profile.profile.fields.biography')}
                    multiline
                  />
                </Grid>
              </Grid>
            </CardContent>
            <Divider />
            <CardActions className={classes.actions}>
              {isEditing ? (
                <>
                  <Button
                    onClick={() => {
                      handleReset();
                      setIsEditing(false);
                    }}
                    disabled={isSubmitting}
                    variant="outlined"
                    color="primary">
                    {t('global.form.cancel')}
                  </Button>
                  <Button
                    onClick={async () => {
                      await submitForm();
                      setIsEditing(false);
                    }}
                    disabled={isSubmitting}
                    variant="contained"
                    disableElevation
                    color="primary"
                    startIcon={isSubmitting ? <CircularProgress size="1em" /> : <Save />}>
                    {t('global.form.save')}
                  </Button>
                </>
              ) : (
                <Button onClick={() => setIsEditing(true)} variant="contained" color="primary" startIcon={<Edit />}>
                  {t('global.button.edit')}
                </Button>
              )}
            </CardActions>
          </Card>
        </Form>
      )}
    </Formik>
  );
}

export default UserProfileForm;

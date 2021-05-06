import React from 'react';
import { Button, Card, CardActions, CardContent, Divider, Grid, makeStyles } from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-material-ui';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import CreateIcon from '@material-ui/icons/Create';
import { CardTitle } from '../card-title';
import { LinkButton } from '../link';
import { CreateMeetingVariables } from '../../models/meetings/__generated-interfaces__/CreateMeeting';
import { DateTimeField } from '../datetime-field';
import { TagsField } from '../tags';
import { TagOption } from '../tags/tags-field';

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

interface MeetingFormProps {
  initialValues: CreateMeetingVariables;
  tagOptions: TagOption[];
  onSubmit: (values: CreateMeetingVariables) => Promise<void>;
}

function CreateMeetingForm({
  initialValues: { title, description, startDate, endDate, tags },
  tagOptions,
  onSubmit,
}: MeetingFormProps) {
  const classes = useStyles();
  const { t } = useTranslation();
  const FormSchema = Yup.object().shape({
    title: Yup.string()
      .min(3, t('global.form.validation.minCountCharacters', { count: 3 }))
      .max(100, t('global.form.validation.maxCountCharacters', { count: 100 }))
      .required(t('global.form.validation.required')),
    tags: Yup.array().of(
      Yup.object().shape({ name: Yup.string().max(20, t('global.form.validation.maxCountCharacters', { count: 20 })) })
    ),
    description: Yup.string(),
    startDate: Yup.string().nullable().required(t('global.form.validation.required')),
    endDate: Yup.string().nullable().required(t('global.form.validation.required')),
  });
  return (
    <Formik
      initialValues={{ title, description: description || '', startDate, endDate, tags: tags || [] }}
      validationSchema={FormSchema}
      onSubmit={onSubmit}>
      {({ submitForm, isSubmitting, handleReset, setFieldValue }) => (
        <Form>
          <Card className={classes.card} variant="outlined">
            <CardContent className={classes.cardContent} component="fieldset">
              <CardTitle title={t('meetings.title.about')} titleComponent="legend" />
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Field
                    component={TextField}
                    variant="outlined"
                    fullWidth
                    name="title"
                    label={t('meetings.form.title')}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TagsField name="tags" label="Tags" tagOptions={tagOptions} setFieldValue={setFieldValue} />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    component={TextField}
                    variant="outlined"
                    fullWidth
                    name="description"
                    label={t('meetings.form.description')}
                    multiline
                    rows={10}
                    rowsMax={10}
                  />
                </Grid>
              </Grid>
            </CardContent>
            <Divider />
            <CardContent className={classes.cardContent} component="fieldset">
              <CardTitle title={t('meetings.title.dateTime')} titleComponent="legend" />
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <DateTimeField name="startDate" label={t('meetings.form.startDate')} disablePast required />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <DateTimeField name="endDate" label={t('meetings.form.endDate')} disablePast required />
                </Grid>
              </Grid>
            </CardContent>
            <Divider />
            <CardActions className={classes.actions}>
              <Button onClick={handleReset} disabled={isSubmitting} variant="outlined" color="primary">
                {t('global.form.clear')}
              </Button>
              <LinkButton to="/meetings" disabled={isSubmitting} variant="outlined" color="primary">
                {t('global.form.cancel')}
              </LinkButton>
              <Button
                onClick={submitForm}
                disabled={isSubmitting}
                variant="contained"
                disableElevation
                color="primary"
                startIcon={<CreateIcon />}>
                {t('meetings.button.create')}
              </Button>
            </CardActions>
          </Card>
        </Form>
      )}
    </Formik>
  );
}

export default CreateMeetingForm;

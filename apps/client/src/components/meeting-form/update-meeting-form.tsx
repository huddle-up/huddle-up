import React from 'react';
import { Button, Card, CardActions, CardContent, Divider, Grid, makeStyles } from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-material-ui';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import SaveIcon from '@material-ui/icons/Save';
import { CardTitle } from '../card-title';
import { LinkButton } from '../link';
import { UpdateMeetingVariables } from '../../models/meetings/__generated-interfaces__/UpdateMeeting';
import { DateTimeField } from '../datetime-field';
import { TagsField } from '../tags';
import { generateLink, ROUTES } from '../../routes';

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
  initialValues: UpdateMeetingVariables;
  onSubmit: (values: UpdateMeetingVariables) => Promise<void>;
  disabled?: boolean;
}

function UpdateMeetingForm({
  initialValues: { id, title, description, startDate, endDate, tags, maximumParticipants },
  onSubmit,
  disabled,
}: MeetingFormProps) {
  const classes = useStyles();
  const { t } = useTranslation();
  const maxTagLength = 25;
  const FormSchema = Yup.object().shape({
    title: Yup.string()
      .min(3, t('global.form.validation.minCountCharacters', { count: 3 }))
      .max(100, t('global.form.validation.maxCountCharacters', { count: 100 }))
      .required(t('global.form.validation.required')),
    tags: Yup.array().of(
      Yup.object().shape({
        name: Yup.string().max(maxTagLength, t('global.form.validation.maxCountCharacters', { count: maxTagLength })),
      })
    ),
    description: Yup.string().nullable(),
    startDate: Yup.date().nullable().required(t('global.form.validation.required')),
    endDate: Yup.date()
      .nullable()
      .required(t('global.form.validation.required'))
      .min(Yup.ref('startDate'), t('global.datepicker.invalidMinEndDateMessage')),
    maximumParticipants: Yup.number().nullable(),
  });
  return (
    <Formik
      initialValues={{
        id,
        title,
        description: description || '',
        startDate,
        endDate,
        tags: tags || [],
        maximumParticipants,
      }}
      validationSchema={FormSchema}
      onSubmit={onSubmit}>
      {({ submitForm, isSubmitting, handleReset, setFieldValue, values }) => (
        <Form>
          <Card className={classes.card} variant="outlined">
            <CardContent className={classes.cardContent} component="fieldset" disabled={disabled}>
              <CardTitle title={t('meetings.form.about')} titleComponent="legend" />
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
                  <TagsField
                    name="tags"
                    label={t('global.form.fields.tags')}
                    setFieldValue={setFieldValue}
                    maxTagLength={maxTagLength}
                  />
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
            <CardContent className={classes.cardContent} component="fieldset" disabled={disabled}>
              <CardTitle title={t('meetings.form.dateTime')} titleComponent="legend" />
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <DateTimeField
                    name="startDate"
                    label={t('meetings.form.startDate')}
                    required
                    minDate={new Date()}
                    minDateMessage={t('global.datepicker.invalidMinStartDateMessage')}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <DateTimeField
                    name="endDate"
                    label={t('meetings.form.endDate')}
                    required
                    minDate={values.startDate}
                    minDateMessage={t('global.datepicker.invalidMinEndDateMessage')}
                  />
                </Grid>
              </Grid>
            </CardContent>
            <Divider />
            <CardContent className={classes.cardContent} component="fieldset" disabled={disabled}>
              <CardTitle title={t('meetings.form.rules')} titleComponent="legend" />
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Field
                    component={TextField}
                    variant="outlined"
                    fullWidth
                    name="maximumParticipants"
                    label={t('meetings.form.maxParticipants')}
                    type="number"
                    onChange={(event) => {
                      const { value } = event.target;
                      if (!isNaN(value)) {
                        setFieldValue('maximumParticipants', value < 0 || value === '' ? 0 : parseInt(value, 10));
                      }
                    }}
                  />
                </Grid>
              </Grid>
            </CardContent>
            {!disabled && (
              <>
                <Divider />
                <CardActions className={classes.actions}>
                  <Button onClick={handleReset} disabled={isSubmitting} variant="outlined" color="primary">
                    {t('global.form.clear')}
                  </Button>
                  <LinkButton
                    to={generateLink(ROUTES.meetings.meeting, { id })}
                    disabled={isSubmitting}
                    variant="outlined"
                    color="primary">
                    {t('global.form.cancel')}
                  </LinkButton>
                  <Button
                    onClick={submitForm}
                    disabled={isSubmitting}
                    variant="contained"
                    disableElevation
                    color="primary"
                    startIcon={<SaveIcon />}>
                    {t('global.form.save')}
                  </Button>
                </CardActions>
              </>
            )}
          </Card>
        </Form>
      )}
    </Formik>
  );
}
UpdateMeetingForm.defaultProps = {
  disabled: false,
};

export default UpdateMeetingForm;

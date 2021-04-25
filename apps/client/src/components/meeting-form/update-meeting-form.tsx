import React from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  makeStyles,
} from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-material-ui';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { DateTimePicker } from 'formik-material-ui-pickers';
import EventIcon from '@material-ui/icons/Event';
import SaveIcon from '@material-ui/icons/Save';
import { CardTitle } from '../card-title';
import { LinkButton } from '../link';
import { UpdateMeetingVariables } from '../../models/meetings/__generated-interfaces__/UpdateMeeting';

const useStyles = makeStyles((theme) => ({
  card: {
    marginBottom: theme.spacing(3),
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
}));

interface MeetingFormProps {
  initialValues: UpdateMeetingVariables;
  onSubmit: (values: UpdateMeetingVariables) => Promise<void>;
}

function UpdateMeetingForm({
  initialValues: { id, title, description, startDate, endDate },
  onSubmit,
}: MeetingFormProps) {
  const classes = useStyles();
  const { t } = useTranslation();
  const FormSchema = Yup.object().shape({
    title: Yup.string()
      .min(3, t('global.form.validation.minCountCharacters', { count: 3 }))
      .max(100, t('global.form.validation.maxCountCharacters', { count: 100 }))
      .required(t('global.form.validation.required')),
    description: Yup.string(),
    startDate: Yup.string().nullable().required(t('global.form.validation.required')),
    endDate: Yup.string().nullable().required(t('global.form.validation.required')),
  });
  return (
    <Formik
      initialValues={{ id, title, description: description || '', startDate, endDate }}
      validationSchema={FormSchema}
      onSubmit={onSubmit}>
      {({ submitForm, isSubmitting, handleReset }) => (
        <Form>
          <Card className={classes.card} component="fieldset" variant="outlined">
            <CardContent>
              <CardTitle title={t('meetings.title.about')} />
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Field component={TextField} fullWidth name="title" label={t('meetings.form.title')} />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    component={TextField}
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
            <CardContent>
              <CardTitle title={t('meetings.title.dateTime')} />
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Field
                    component={DateTimePicker}
                    fullWidth
                    name="startDate"
                    label={t('meetings.form.startDate')}
                    okLabel={t('global.datepicker.okLabel')}
                    cancelLabel={t('global.form.cancel')}
                    clearLabel={t('global.form.clear')}
                    todayLabel={t('global.datepicker.todayLabel')}
                    format="dd.MM.yyyy HH:mm"
                    disablePast
                    showTodayButton
                    clearable
                    required
                    autoOk
                    ampm={false}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton>
                            <EventIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    component={DateTimePicker}
                    fullWidth
                    name="endDate"
                    label={t('meetings.form.endDate')}
                    okLabel={t('global.datepicker.okLabel')}
                    cancelLabel={t('global.form.cancel')}
                    clearLabel={t('global.form.clear')}
                    todayLabel={t('global.datepicker.todayLabel')}
                    format="dd.MM.yyyy HH:mm"
                    disablePast
                    showTodayButton
                    clearable
                    required
                    autoOk
                    ampm={false}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton>
                            <EventIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
            </CardContent>
            <Divider />
            <CardActions className={classes.actions}>
              <Button onClick={handleReset} disabled={isSubmitting} variant="outlined" color="primary">
                {t('global.form.clear')}
              </Button>
              <LinkButton to={`/meetings/${id}`} disabled={isSubmitting} variant="outlined" color="primary">
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
          </Card>
        </Form>
      )}
    </Formik>
  );
}

export default UpdateMeetingForm;
import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Field } from 'formik';
import { DateTimePicker } from 'formik-material-ui-pickers';
import { useTranslation } from 'react-i18next';
import { IconButton, InputAdornment } from '@material-ui/core';
import EventIcon from '@material-ui/icons/Event';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(2),
    },
  })
);

interface DateTimeFieldProps {
  label: string;
  name: string;
  required?: boolean;
  clearable?: boolean;
  disablePast?: boolean;
  showTodayButton?: boolean;
}

DateTimeField.defaultProps = {
  required: false,
  clearable: true,
  disablePast: false,
  showTodayButton: true,
};

function DateTimeField({ name, label, required, clearable, disablePast, showTodayButton }: DateTimeFieldProps) {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <Field
      className={classes.root}
      component={DateTimePicker}
      inputVariant="outlined"
      fullWidth
      name={name}
      label={label}
      okLabel={t('global.datepicker.okLabel')}
      cancelLabel={t('global.form.cancel')}
      clearLabel={t('global.form.clear')}
      todayLabel={t('global.datepicker.todayLabel')}
      format="dd.MM.yyyy HH:mm"
      disablePast={disablePast}
      showTodayButton={showTodayButton}
      clearable={clearable}
      required={required}
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
  );
}

export default DateTimeField;

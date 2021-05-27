import React from 'react';
import { Field } from 'formik';
import { KeyboardDateTimePicker } from 'formik-material-ui-pickers';
import { useTranslation } from 'react-i18next';
import { IconButton, InputAdornment } from '@material-ui/core';
import EventIcon from '@material-ui/icons/Event';

interface DateTimeFieldProps {
  label: string;
  name: string;
  required?: boolean;
  clearable?: boolean;
  showTodayButton?: boolean;
  minDateMessage?: string;
  minDate?: Date;
}

DateTimeField.defaultProps = {
  required: false,
  clearable: true,
  showTodayButton: true,
  minDateMessage: undefined,
  minDate: new Date(0),
};

function DateTimeField({
  name,
  label,
  required,
  clearable,
  showTodayButton,
  minDateMessage,
  minDate,
}: DateTimeFieldProps) {
  const { t } = useTranslation();

  return (
    <Field
      component={KeyboardDateTimePicker}
      inputVariant="outlined"
      fullWidth
      name={name}
      label={label}
      okLabel={t('global.datepicker.okLabel')}
      cancelLabel={t('global.form.cancel')}
      clearLabel={t('global.form.clear')}
      todayLabel={t('global.datepicker.todayLabel')}
      format="dd.MM.yyyy HH:mm"
      showTodayButton={showTodayButton}
      clearable={clearable}
      required={required}
      minutesStep={5}
      minDate={minDate}
      minDateMessage={minDateMessage}
      invalidDateMessage={t('global.datepicker.invalidDateFormat')}
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

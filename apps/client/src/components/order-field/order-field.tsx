import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { FormControl, InputLabel, MenuItem } from '@material-ui/core';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { Select } from 'formik-material-ui';
import { Field } from 'formik';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      display: 'flex',
      backgroundColor: '#fff',
    },
  })
);

interface OrderFieldProps {
  label: string;
  name: string;
  options: any;
}

function OrderField({ name, label, options }: OrderFieldProps) {
  const classes = useStyles();

  return (
    <FormControl className={classes.formControl} variant="outlined">
      <InputLabel id="order-label">{label}</InputLabel>
      <Field
        component={Select}
        labelId="order-label"
        id="order-select"
        name={name}
        label={label}
        MenuProps={{
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left',
          },
          transformOrigin: {
            vertical: 'top',
            horizontal: 'left',
          },
          getContentAnchorEl: null,
        }}>
        {options.map((option) => (
          <MenuItem key={option.name} value={option.value} selected={option.selected}>
            {option.icon && <ListItemIcon>{option.icon}</ListItemIcon>}
            {option.name}
          </MenuItem>
        ))}
      </Field>
    </FormControl>
  );
}

export default OrderField;

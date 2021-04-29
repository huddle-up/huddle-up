/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import { Paper } from '@material-ui/core';
import { InputBase } from 'formik-material-ui';
import { Field } from 'formik';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
  })
);

interface SearchFieldProps {
  name: string;
  placeholder: string;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
}

function SearchField({ name, placeholder, setFieldValue }: SearchFieldProps) {
  const classes = useStyles();

  return (
    <Paper className={classes.root} variant="outlined">
      <SearchIcon />
      <Field
        name={name}
        component={InputBase}
        className={classes.input}
        placeholder={placeholder}
        inputProps={{ 'aria-label': placeholder }}
      />
      <IconButton
        color="primary"
        onClick={() => setFieldValue(name, '')}
        className={classes.iconButton}
        aria-label="clear">
        <ClearIcon />
      </IconButton>
    </Paper>
  );
}

export default SearchField;

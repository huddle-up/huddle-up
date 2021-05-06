/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { Field } from 'formik';

const filter = createFilterOptions<TagOption>({
  matchFrom: 'any',
  ignoreAccents: true,
  ignoreCase: true,
  trim: true,
  limit: 100,
});

export interface TagOption {
  id?: number;
  name: string;
  inputValue?: string;
}

interface TagsFieldProps {
  label: string;
  name: string;
  tagOptions: TagOption[];
  filterSelectedOptions?: boolean;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
}

TagsField.defaultProps = {
  filterSelectedOptions: false,
};

function TagsField({ name, label, tagOptions, setFieldValue, filterSelectedOptions }: TagsFieldProps) {
  return (
    <Field name={name}>
      {({ field: { value }, form: { errors } }) => (
        <Autocomplete
          id="tags"
          value={value}
          multiple
          freeSolo
          filterSelectedOptions={filterSelectedOptions}
          options={tagOptions}
          getOptionLabel={(option) => option.name}
          onChange={(event, newValues) => {
            setFieldValue(
              name,
              newValues
                .filter((newValue) => typeof newValue === 'object' || !value.some((tag) => tag.name === newValue))
                .map((val) => {
                  if (typeof val === 'string') {
                    return { name: val };
                  }
                  return val;
                })
            );
          }}
          renderOption={(option) => (option.inputValue ? option.inputValue : option.name)}
          filterOptions={(options, params) => {
            const filtered = filter(options, params);
            const inputValue = params.inputValue.trim();
            if (inputValue !== '') {
              filtered.push({
                inputValue: `Hinzufügen: "${params.inputValue}"`,
                name: params.inputValue,
              });
            }
            return filtered;
          }}
          renderInput={(params) => (
            <div>
              <TextField
                {...params}
                variant="outlined"
                label={label}
                error={!!errors[name]}
                helperText={
                  errors[name] &&
                  errors[name].map((error, index) => error && value[index] && `(${value[index].name}: ${error.name}) `)
                }
              />
            </div>
          )}
        />
      )}
    </Field>
  );
}

export default TagsField;

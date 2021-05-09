/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useTranslation } from 'react-i18next';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { Field } from 'formik';
import { CircularProgress } from '@material-ui/core';
import useTagsQuery from './use-tags-query';

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
  filterSelectedOptions?: boolean;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  allowUserOptions?: boolean;
}

TagsField.defaultProps = {
  filterSelectedOptions: false,
  allowUserOptions: true,
};

function TagsField({ name, label, setFieldValue, filterSelectedOptions, allowUserOptions }: TagsFieldProps) {
  const { t } = useTranslation();
  const { queryLoading, queryError, tagOptions } = useTagsQuery();

  if (queryLoading) return <CircularProgress size="2em" />;
  if (queryError) return <p>Error! ${queryError.message}</p>;

  return (
    <Field name={name}>
      {({ field: { value }, form: { errors } }) => (
        <Autocomplete
          id="tags"
          value={value}
          multiple
          freeSolo={allowUserOptions}
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
            if (allowUserOptions && inputValue !== '') {
              filtered.push({
                inputValue: `${t('global.option.add')}: "${params.inputValue}"`,
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

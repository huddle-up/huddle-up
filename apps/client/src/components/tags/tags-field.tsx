/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useTranslation } from 'react-i18next';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { Field } from 'formik';
import useTagsQuery from './use-tags-query';
import { ErrorCard } from '../error';
import { LoadingContent } from '../loading';

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
  maxTagLength?: number;
}

TagsField.defaultProps = {
  filterSelectedOptions: false,
  allowUserOptions: true,
  maxTagLength: 25,
};

function TagsField({
  name,
  label,
  setFieldValue,
  filterSelectedOptions,
  allowUserOptions,
  maxTagLength,
}: TagsFieldProps) {
  const { t } = useTranslation();
  const { queryLoading, queryError, tagOptions } = useTagsQuery();

  if (queryLoading) return <LoadingContent />;

  if (queryError) {
    return <ErrorCard detail={queryError.message} />;
  }

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
          getOptionSelected={(tagOption, tag) => tagOption.name === tag.name}
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
          renderInput={({ inputProps, ...params }) => (
            <div>
              <TextField
                {...params}
                variant="outlined"
                label={label}
                error={!!errors[name]}
                inputProps={{
                  ...inputProps,
                  maxLength: maxTagLength,
                }}
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

import React from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import SearchIcon from '@material-ui/icons/Search';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import { Button, Card, CardActions, CardContent, Grid } from '@material-ui/core';
import { SearchField } from '../search-field';
import { MeetingsVariables } from '../../models/meetings/__generated-interfaces__/Meetings';
import { CardTitle } from '../card-title';
import { DateTimeField } from '../datetime-field';
import { TagsField } from '../tags';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
  })
);

export type SearchFormVariables = Pick<MeetingsVariables, 'searchValue' | 'fromDate' | 'toDate' | 'tags'>;

interface SearchFormProps {
  initialValues: SearchFormVariables;
  searchPast?: boolean;
  searchFuture?: boolean;
  onSubmit: (values: SearchFormVariables) => Promise<void>;
}

function SearchForm({ initialValues, onSubmit, searchPast, searchFuture }: SearchFormProps) {
  const classes = useStyles();
  const { t } = useTranslation();

  const FormSchema = Yup.object().shape({
    value: Yup.string(),
    tags: Yup.array().of(Yup.object().shape({ id: Yup.number(), name: Yup.string() })),
    fromDate: Yup.string().nullable(),
    toDate: Yup.string().nullable(),
  });

  return (
    <Formik initialValues={initialValues} validationSchema={FormSchema} onSubmit={onSubmit}>
      {({ submitForm, isSubmitting, handleReset, setFieldValue }) => (
        <Form>
          <Card className={classes.card} variant="outlined">
            <CardContent className={classes.cardContent} component="fieldset">
              <CardTitle title={t('meetings.search.searchMeeting')} titleComponent="legend" />
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <SearchField
                    name="searchValue"
                    placeholder={t('global.form.fields.search')}
                    setFieldValue={setFieldValue}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TagsField
                    name="tags"
                    label={t('global.form.fields.tags')}
                    setFieldValue={setFieldValue}
                    allowUserOptions={false}
                  />
                </Grid>
                <Grid item xs={12}>
                  <DateTimeField
                    name="fromDate"
                    disableFuture={searchPast}
                    disablePast={searchFuture}
                    label={t('global.form.fields.from')}
                  />
                </Grid>
                <Grid item xs={12}>
                  <DateTimeField
                    name="toDate"
                    disableFuture={searchPast}
                    disablePast={searchFuture}
                    label={t('global.form.fields.to')}
                  />
                </Grid>
              </Grid>
            </CardContent>
            <Divider />
            <CardActions className={classes.actions}>
              <Button onClick={handleReset} disabled={isSubmitting} variant="outlined" color="primary">
                {t('global.form.clear')}
              </Button>
              <Button
                onClick={submitForm}
                disabled={isSubmitting}
                variant="contained"
                disableElevation
                color="primary"
                startIcon={<SearchIcon />}>
                {t('global.form.search')}
              </Button>
            </CardActions>
          </Card>
        </Form>
      )}
    </Formik>
  );
}
SearchForm.defaultProps = {
  searchPast: false,
  searchFuture: false,
};

export default SearchForm;

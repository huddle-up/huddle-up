import React from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import SearchIcon from '@material-ui/icons/Search';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import { Button, Card, CardActions, CardContent, Grid } from '@material-ui/core';
import { SearchField } from '../search-field';
import { OrderField } from '../order-field';
import { MeetingsVariables } from '../../models/meetings/__generated-interfaces__/Meetings';
import { CardTitle } from '../card-title';
import { OrderBy } from '../../models/__generated-interfaces__/globalTypes';

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

interface SearchFormProps {
  initialValues: MeetingsVariables;
  onSubmit: (values: MeetingsVariables) => Promise<void>;
}

function SearchForm({ initialValues: { searchValue, startDateOrderBy }, onSubmit }: SearchFormProps) {
  const classes = useStyles();
  const { t } = useTranslation();

  const orderOptions = [
    { name: t('meetings.orderDesc'), value: OrderBy.DESC },
    { name: t('meetings.orderAsc'), value: OrderBy.ASC },
  ];

  const FormSchema = Yup.object().shape({
    value: Yup.string(),
    order: Yup.string(),
  });

  return (
    <Formik initialValues={{ searchValue, startDateOrderBy }} validationSchema={FormSchema} onSubmit={onSubmit}>
      {({ submitForm, isSubmitting, handleReset, setFieldValue }) => (
        <Form>
          <Card className={classes.card} variant="outlined">
            <CardContent className={classes.cardContent} component="fieldset">
              <CardTitle title={t('filter.searchMeeting')} titleComponent="legend" />
              <Grid item xs={12}>
                <SearchField
                  name="searchValue"
                  placeholder={t('meetings.searchPlaceholder')}
                  setFieldValue={setFieldValue}
                />
              </Grid>
              <Grid item xs={12}>
                <OrderField name="startDateOrderBy" label={t('meetings.orderPlaceholder')} options={orderOptions} />
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

export default SearchForm;

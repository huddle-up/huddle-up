import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Button, Card, CardContent, CircularProgress, Grid, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { useTranslation } from 'react-i18next';
import { REMOVE_USER } from '../../models/user';
import { RemoveTag, RemoveTagVariables } from '../../models/user/__generated-interfaces__/RemoveTag';
import { useAuth } from '../../contexts/auth';

function DeleteAccountForm({ id }: RemoveTagVariables) {
  const { t } = useTranslation();
  const [mutate, { loading }] = useMutation<RemoveTag, RemoveTagVariables>(REMOVE_USER);
  const [showRemove, setShowRemove] = useState(false);
  const { logout } = useAuth();

  const remove = () => {
    mutate({
      variables: {
        id,
      },
    });
    logout();
  };
  return (
    <Card variant="outlined">
      <CardContent>
        <Grid container justify="space-between" alignItems="center">
          <Typography component="p">{t('profile.delete.description')}</Typography>
          {showRemove ? (
            <Button
              onClick={remove}
              disabled={loading}
              color="secondary"
              variant="contained"
              startIcon={loading ? <CircularProgress size="1em" /> : <DeleteIcon />}>
              {t('profile.delete.confirm')}
            </Button>
          ) : (
            <Button onClick={() => setShowRemove(true)} color="secondary" variant="outlined" startIcon={<DeleteIcon />}>
              {t('profile.delete.deleteAccount')}
            </Button>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
}

export default DeleteAccountForm;

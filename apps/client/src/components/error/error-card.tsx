import React from 'react';
import { Button, Card, CardActions, CardContent, makeStyles, Typography, fade } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { CardTitle } from '../card-title';

const useStyles = makeStyles((theme) => ({
  card: {
    margin: theme.spacing(2),
  },
  cardInline: {
    margin: theme.spacing(2, 0),
  },
  detail: {
    marginTop: theme.spacing(2),
  },
  contentHighlight: {
    backgroundColor: fade(theme.palette.secondary.light, 0.3),
  },
}));

interface ErrorCardProps {
  detail?: string;
  isInline?: boolean;
}

ErrorCard.defaultProps = {
  detail: undefined,
  isInline: true,
};

function ErrorCard({ isInline, detail }: ErrorCardProps) {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <Card variant="outlined" className={isInline ? classes.cardInline : classes.card}>
      <CardContent className={classes.contentHighlight}>
        <CardTitle title={t('global.error.title')} titleComponent="h1" />
        <Typography>{t('global.error.info')}</Typography>
        {detail && (
          <details className={classes.detail}>
            <summary>{t('global.error.details')}</summary>
            {detail}
          </details>
        )}
      </CardContent>
      {!isInline && (
        <CardActions>
          <Button variant="contained" color="secondary" disableElevation onClick={() => window.location.reload()}>
            {t('global.error.refreshPage')}
          </Button>
          <Button href="/">{t('global.error.home')}</Button>
        </CardActions>
      )}
    </Card>
  );
}

export default ErrorCard;

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Card, CardActions, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { CardTitle } from '../card-title';

const useStyles = makeStyles((theme) => ({
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
}));

interface ShowMoreCardProps {
  title: string;
  handlePageLimit: (max?: boolean) => void;
  limit: number;
}

function ShowMoreCard({ title, limit, handlePageLimit }: ShowMoreCardProps) {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Card className={classes.card} variant="outlined">
      <CardContent className={classes.cardContent} component="fieldset">
        <CardTitle title={title} titleComponent="legend" />
      </CardContent>
      <CardActions className={classes.actions}>
        <Button onClick={() => handlePageLimit(true)} variant="outlined" color="primary">
          {t('meetings.button.showall')}
        </Button>
        <Button onClick={() => handlePageLimit(false)} variant="outlined" color="primary" endIcon={<ExpandMoreIcon />}>
          {t('meetings.button.showmore', { limit })}
        </Button>
      </CardActions>
    </Card>
  );
}
export default ShowMoreCard;

import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  card: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  cardContent: {
    flexGrow: 1,
  },
}));

interface NoEntryCardProps {
  message: string;
}

function NoEntryCard({ message }: NoEntryCardProps) {
  const classes = useStyles();

  return (
    <Card className={classes.card} variant="outlined">
      <CardContent className={classes.cardContent}>
        <Typography>{message}</Typography>
      </CardContent>
    </Card>
  );
}
export default NoEntryCard;

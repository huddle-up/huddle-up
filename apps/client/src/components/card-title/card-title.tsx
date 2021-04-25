import React from 'react';
import { Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  cardTitle: {
    marginBottom: theme.spacing(2),
  },
  titleCaption: {
    marginTop: theme.spacing(0.5),
  },
}));

interface CardTitleProps {
  title: string;
  caption?: string;
}

function CardTitle({ title, caption }: CardTitleProps) {
  const classes = useStyles();
  return (
    <div className={classes.cardTitle}>
      <Typography component="legend" variant="h6">
        {title}
      </Typography>
      {caption && (
        <Typography className={classes.titleCaption} component="p" variant="body2">
          {caption}
        </Typography>
      )}
    </div>
  );
}

CardTitle.defaultProps = {
  caption: undefined,
};

export default CardTitle;

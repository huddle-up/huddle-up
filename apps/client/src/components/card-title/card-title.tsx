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
  titleComponent?: React.ElementType;
}

CardTitle.defaultProps = {
  caption: undefined,
  titleComponent: 'h6',
};

function CardTitle({ title, caption, titleComponent }: CardTitleProps) {
  const classes = useStyles();
  return (
    <div className={classes.cardTitle}>
      <Typography component={titleComponent} variant="h6">
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

export default CardTitle;

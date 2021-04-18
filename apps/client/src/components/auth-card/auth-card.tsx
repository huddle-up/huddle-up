import React from 'react';
import { Card, CardContent, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 400,
  },
  contentSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2, 0),
    borderTop: `1px solid ${theme.palette.text.hint}`,
    borderBottom: `1px solid ${theme.palette.text.hint}`,
  },
  contentTop: {
    borderBottom: 'none',
  },
}));

interface AuthCardProps {
  title: string;
  top?: React.ReactNode;
  children: React.ReactNode;
  bottom: React.ReactNode;
}

function AuthCard({ title, top, children, bottom }: AuthCardProps) {
  const classes = useStyles();
  return (
    <Card className={classes.root} variant="outlined" elevation={0}>
      <CardContent>
        <Typography component="h1" variant="h4" align="center">
          {title}
        </Typography>
      </CardContent>
      {top && <CardContent className={`${classes.contentSection} ${classes.contentTop}`}>{top}</CardContent>}
      <CardContent className={classes.contentSection}>{children}</CardContent>
      <CardContent>{bottom}</CardContent>
    </Card>
  );
}
AuthCard.defaultProps = {
  top: null,
};

export default AuthCard;

import React from 'react';
import { Card, CardContent, Divider, makeStyles, Typography } from '@material-ui/core';

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
      <Divider />
      {top && (
        <>
          <CardContent className={`${classes.contentSection} ${classes.contentTop}`}>{top}</CardContent>
          <Divider />
        </>
      )}
      <CardContent className={classes.contentSection}>{children}</CardContent>
      <Divider />
      <CardContent>{bottom}</CardContent>
    </Card>
  );
}
AuthCard.defaultProps = {
  top: null,
};

export default AuthCard;

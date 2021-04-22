import { makeStyles, Typography } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    borderBottom: `1px solid ${theme.palette.text.secondary}`,
    padding: theme.spacing(0, 1),
    marginBottom: theme.spacing(2),
    alignItems: 'center',
  },
  icon: {
    display: 'flex',
    marginRight: theme.spacing(1),
  },
}));

interface SectionHeaderProps {
  title: string;
  icon?: React.ReactNode;
  component?: React.ElementType;
}

function SectionHeader({ icon, title, component }: SectionHeaderProps) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.icon}>{icon}</div>
      <Typography variant="h6" component={component}>
        {title}
      </Typography>
    </div>
  );
}
SectionHeader.defaultProps = {
  icon: undefined,
  component: 'h1',
};

export default SectionHeader;

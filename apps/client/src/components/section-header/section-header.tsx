import { makeStyles, Typography } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    borderBottom: (dangerZone) =>
      `1px solid ${dangerZone ? theme.palette.secondary.main : theme.palette.text.secondary}`,
    padding: theme.spacing(0, 1),
    marginBottom: theme.spacing(2),
    alignItems: 'center',
  },
  icon: {
    display: 'flex',
    marginRight: theme.spacing(1),
    color: (dangerZone) => (dangerZone ? theme.palette.secondary.main : theme.palette.primary.dark),
  },
}));

interface SectionHeaderProps {
  title: string;
  icon?: React.ReactNode;
  component?: React.ElementType;
  dangerZone?: boolean;
}

function SectionHeader({ icon, title, component, dangerZone }: SectionHeaderProps) {
  const classes = useStyles(dangerZone);
  return (
    <div className={classes.root}>
      <div className={classes.icon}>{icon}</div>
      <Typography variant="h6" component={component} color={dangerZone ? 'secondary' : 'primary'}>
        {title}
      </Typography>
    </div>
  );
}
SectionHeader.defaultProps = {
  icon: undefined,
  component: 'h1',
  dangerZone: false,
};

export default SectionHeader;

import React from 'react';
import { Link as MuiLink, LinkProps as MuiLinkProps } from '@material-ui/core';
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';

type LinkProps = MuiLinkProps<RouterLink, Pick<RouterLinkProps, 'to'>>;

function Link(props: LinkProps) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <MuiLink component={RouterLink} {...props} />;
}

export default Link;

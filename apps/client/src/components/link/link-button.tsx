import React from 'react';
import { Button, ButtonProps } from '@material-ui/core';
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';

type LinkButtonProps = ButtonProps<RouterLink, Pick<RouterLinkProps, 'to'>>;

function LinkButton(props: LinkButtonProps) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Button component={RouterLink} {...props} />;
}

export default LinkButton;

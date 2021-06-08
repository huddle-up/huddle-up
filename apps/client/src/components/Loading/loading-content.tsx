import React from 'react';
import { Box, CircularProgress, Grid } from '@material-ui/core';

function LoadingContent() {
  return (
    <Grid container justify="center">
      <Box m={2} mt={10}>
        <CircularProgress size="2em" />
      </Box>
    </Grid>
  );
}
export default LoadingContent;

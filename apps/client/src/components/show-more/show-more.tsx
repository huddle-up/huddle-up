import { Box, Button, CircularProgress, Grid, Typography } from '@material-ui/core';
import { KeyboardArrowDown } from '@material-ui/icons';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface ShowMoreProps {
  currentCount: number;
  totalCount: number;
  onClick: () => void;
  isLoading?: boolean;
}

function ShowMore({ currentCount, totalCount, onClick, isLoading }: ShowMoreProps) {
  const { t } = useTranslation();
  return (
    <Box py={1}>
      <Grid container direction="column" alignItems="center">
        <Typography component="span" gutterBottom variant="body2">
          {t('pagination.showingCountOfTotal', { count: currentCount, total: totalCount })}
        </Typography>
        <Button
          variant="outlined"
          onClick={onClick}
          disabled={isLoading}
          startIcon={isLoading ? <CircularProgress size="1em" /> : <KeyboardArrowDown />}>
          {t('pagination.showMore')}
        </Button>
      </Grid>
    </Box>
  );
}
ShowMore.defaultProps = {
  isLoading: false,
};

export default ShowMore;

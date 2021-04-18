import React from 'react';
import { Container, makeStyles, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { Link } from '../link';

const useStyles = makeStyles((theme) => ({
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
  },
}));

function PublicPageFooter() {
  const classes = useStyles();
  const { t } = useTranslation();
  return (
    <footer className={classes.footer}>
      <Container maxWidth="sm">
        <Typography variant="h6" align="center" color="textSecondary" gutterBottom>
          {t('global.footer.tagline')}
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary">
          {t('global.footer.description')}{' '}
          <Link to="#" variant="body2">
            {t('global.link.help')}
          </Link>
        </Typography>
      </Container>
    </footer>
  );
}

export default PublicPageFooter;

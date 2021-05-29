import React from 'react';
import { Card, Divider, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { ExitToApp, PersonOutlined, ArrowBack } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import { matchPath, NavLink, useHistory, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/auth';
import { ROUTES } from '../../routes';

function ProfileNav() {
  const { logout } = useAuth();
  const { t } = useTranslation();
  const history = useHistory();
  const location = useLocation();

  const matches = (path: string, exact = false) => {
    const match = matchPath(location.pathname, {
      path,
      exact,
    });
    return match !== null;
  };

  return (
    <Card variant="outlined">
      <List>
        <ListItem button onClick={() => history.goBack()}>
          <ListItemIcon>
            <ArrowBack />
          </ListItemIcon>
          <ListItemText>{t('profile.nav.back')}</ListItemText>
        </ListItem>
      </List>
      <Divider />
      <List component="nav">
        <ListItem
          button
          component={NavLink}
          selected={matches(ROUTES.profile.profile, true)}
          to={ROUTES.profile.profile}>
          <ListItemIcon>
            <PersonOutlined />
          </ListItemIcon>
          <ListItemText>{t('profile.nav.profile')}</ListItemText>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button onClick={() => logout()}>
          <ListItemIcon>
            <ExitToApp />
          </ListItemIcon>
          <ListItemText>{t('profile.nav.logout')}</ListItemText>
        </ListItem>
      </List>
    </Card>
  );
}

export default ProfileNav;

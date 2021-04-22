import { Card, Divider, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { ExitToApp, PersonOutlined } from '@material-ui/icons';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/auth';

function ProfileNav() {
  const { logout } = useAuth();
  const { t } = useTranslation();
  return (
    <Card variant="outlined">
      <List component="nav">
        <ListItem button component={NavLink} to="/profile">
          <ListItemIcon>
            <PersonOutlined />
          </ListItemIcon>
          <ListItemText>{t('profile.nav.profile')}</ListItemText>
        </ListItem>
        <Divider />
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

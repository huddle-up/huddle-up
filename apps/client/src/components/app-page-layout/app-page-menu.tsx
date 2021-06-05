/* eslint-disable react/no-array-index-key */
import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LinkProps, useLocation } from 'react-router-dom';
import { ROUTES } from '../../routes';
import { LinkButton, NavLink } from '../link';

const useStyles = makeStyles((theme) => ({
  drawerSpacer: theme.mixins.toolbar,
  linkItem: {
    textAlign: 'center',
  },
  componentItem: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

interface MenuLink extends Pick<LinkProps, 'to'> {
  label: string;
}

interface MenuEntry {
  type: 'link' | 'component' | 'divider';
  component?: React.ReactNode;
  link?: MenuLink;
  mobile?: boolean;
  desktop?: boolean;
}

interface MenuProps {
  entries?: MenuEntry[];
}
function MenuDesktop({ entries }: MenuProps) {
  return (
    <nav>
      {entries.map(({ type, link, component }, i) =>
        type === 'link' ? (
          <NavLink to={link.to} key={`${link.label}-${link.to}`}>
            {link.label}
          </NavLink>
        ) : (
          <div key={`component-${i}`}>{component}</div>
        )
      )}
    </nav>
  );
}
MenuDesktop.defaultProps = {
  entries: [],
};

function MenuMobile({ entries }: MenuProps) {
  const theme = useTheme();
  const classes = useStyles();
  const location = useLocation();
  const [pathname, setPathname] = useState(location.pathname);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (location.pathname !== pathname) {
      setPathname(location.pathname);
      setIsOpen(false);
    }
  }, [location, pathname]);
  return (
    <>
      <IconButton onClick={() => setIsOpen(!isOpen)}>
        <Menu />
      </IconButton>
      <Drawer style={{ zIndex: theme.zIndex.appBar - 1 }} anchor="top" open={isOpen} onClose={() => setIsOpen(false)}>
        <div className={classes.drawerSpacer} />
        <List component="nav">
          {entries.map(({ type, link, component }, i) => {
            if (type === 'link') {
              return (
                <ListItem
                  className={classes.linkItem}
                  key={`${link.label}-${link.to}`}
                  button
                  component={NavLink}
                  to={link.to}>
                  <ListItemText>{link.label}</ListItemText>
                </ListItem>
              );
            }
            if (type === 'divider') {
              return <Divider key={`divider-${i}`} />;
            }
            return (
              <ListItem className={classes.componentItem} key={`${component}-${i}`}>
                <div>{component}</div>
              </ListItem>
            );
          })}
        </List>
      </Drawer>
    </>
  );
}
MenuMobile.defaultProps = {
  entries: [],
};

function AppPageMenu() {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const { t } = useTranslation();
  const entries: MenuEntry[] = [
    {
      type: 'link',
      desktop: true,
      mobile: true,
      link: {
        label: t('global.title.allMeetings'),
        to: ROUTES.meetings.allMeetings,
      },
    },
    {
      type: 'link',
      desktop: true,
      mobile: true,
      link: {
        label: t('global.title.myMeetings'),
        to: ROUTES.meetings.myMeetings,
      },
    },
    {
      type: 'divider',
      mobile: true,
    },
    {
      type: 'component',
      mobile: true,
      component: (
        <LinkButton variant="contained" disableElevation color="secondary" to={ROUTES.meetings.create}>
          {t('meetings.title.new')}
        </LinkButton>
      ),
    },
  ];
  return isDesktop ? (
    <MenuDesktop entries={entries.filter(({ desktop }) => !!desktop)} />
  ) : (
    <MenuMobile entries={entries.filter(({ mobile }) => !!mobile)} />
  );
}

export default AppPageMenu;

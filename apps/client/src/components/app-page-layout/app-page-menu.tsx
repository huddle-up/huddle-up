import { useMediaQuery, useTheme } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { LinkProps } from 'react-router-dom';
import { NavLink } from '../link';

interface MenuLink extends Pick<LinkProps, 'to'> {
  label: string;
}

interface MenuProps {
  links?: MenuLink[];
}

function MenuDesktop({ links }: MenuProps) {
  return (
    <nav>
      {links.map(({ label, to }, i) => (
        <NavLink exact to={to} key={`${label}-${to}`}>
          {label}
        </NavLink>
      ))}
    </nav>
  );
}
MenuDesktop.defaultProps = {
  links: [],
};

function AppPageMenu() {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
  const { t } = useTranslation();
  const links: MenuLink[] = [
    {
      label: t('global.title.discover'),
      to: '/discover',
    },
    {
      label: t('global.title.myMeetings'),
      to: '/meetings',
    },
  ];
  return isDesktop ? <MenuDesktop links={links} /> : <div>TODO: MOBILE</div>;
}

export default AppPageMenu;

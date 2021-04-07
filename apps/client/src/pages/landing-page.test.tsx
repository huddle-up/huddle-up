import React from 'react';
import { render, screen } from '@testing-library/react';
import LandingPage from './landing-page';

jest.mock('react-i18next', () => ({
  // this mock makes sure any components using the translate hook can use it without a warning being shown
  useTranslation: () => {
    return {
      t: (str) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
}));

test('render app and find HuddleUp text', () => {
  render(<LandingPage />);
  const linkElement = screen.getByText(/HuddleUp/i);
  expect(linkElement).toBeInTheDocument();
});

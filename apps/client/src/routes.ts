import { generatePath } from 'react-router';

export const ROUTES = {
  auth: {
    slugs: 'login|register',
    login: '/login',
    loginCallback: '/login/callback',
    register: '/register',
  },
  meetings: {
    slugs: 'discover|meetings',
    discover: '/discover',
    meeting: '/meetings/:id',
    myMeetings: '/meetings',
    create: '/meetings/create',
    edit: '/meetings/:id/edit',
  },
  profile: {
    profile: '/profile',
    publicProfile: '/profile/:id',
  },
};

export function generateLink(pattern: string, params: any) {
  return generatePath(pattern, params);
}

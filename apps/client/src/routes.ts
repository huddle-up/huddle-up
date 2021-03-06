import { generatePath } from 'react-router';

export const ROUTES = {
  auth: {
    slugs: 'login|register',
    login: '/login',
    loginCallback: '/login/callback',
    register: '/register',
  },
  meetings: {
    slugs: 'meetings|my-meetings',
    allMeetings: '/meetings',
    allMeetingsMeeting: '/meetings/:id',
    meeting: '/my-meetings/:id',
    myMeetings: '/my-meetings',
    myPastMeetings: '/my-meetings/past',
    create: '/my-meetings/create',
    edit: '/my-meetings/:id/edit',
  },
  profile: {
    profile: '/profile',
    publicProfile: '/profile/:id',
  },
};

export function generateLink(pattern: string, params: any) {
  return generatePath(pattern, params);
}

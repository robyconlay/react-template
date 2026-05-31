/**
 * Central registry of every route in the app. Components and the router must
 * reference paths through this object — never hardcode URL strings. Each entry
 * exposes `getHref()` so links stay correct if a path changes.
 */
export const paths = {
  home: {
    path: '/',
    getHref: () => '/',
  },
  discussions: {
    path: '/discussions',
    getHref: () => '/discussions',
  },
  discussion: {
    path: '/discussions/:discussionId',
    getHref: (id: string) => `/discussions/${id}`,
  },

  auth: {
    register: {
      path: '/auth/register',
      getHref: (redirectTo?: string | null | undefined) =>
        `/auth/register${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ''}`,
    },
    login: {
      path: '/auth/login',
      getHref: (redirectTo?: string | null | undefined) =>
        `/auth/login${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ''}`,
    },
  },

  app: {
    root: {
      path: '/app',
      getHref: () => '/app',
    },
    dashboard: {
      path: '',
      getHref: () => '/app',
    },
    discussions: {
      path: 'discussions',
      getHref: () => '/app/discussions',
    },
    discussion: {
      path: 'discussions/:discussionId',
      getHref: (id: string) => `/app/discussions/${id}`,
    },
    users: {
      path: 'users',
      getHref: () => '/app/users',
    },
    profile: {
      path: 'profile',
      getHref: () => '/app/profile',
    },
  },
} as const;

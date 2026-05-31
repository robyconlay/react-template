import { Link } from 'react-router';

import { paths } from '@/config/paths';

const NotFoundRoute = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 text-center">
      <h1 className="text-2xl font-semibold text-gray-900">404 — Not found</h1>
      <Link to={paths.home.getHref()} className="text-brand-600 underline">
        Go home
      </Link>
    </main>
  );
};

export default NotFoundRoute;

import { Link } from 'react-router';

import { paths } from '@/config/paths';

const NotFoundRoute = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 text-center">
      <h1 className="text-foreground text-2xl font-semibold">
        404 — Not found
      </h1>
      <Link to={paths.home.getHref()} className="text-primary underline">
        Go home
      </Link>
    </main>
  );
};

export default NotFoundRoute;

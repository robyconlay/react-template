import { Link } from 'react-router';

import { Button } from '@/components/ui/button/button';
import { paths } from '@/config/paths';

const LandingRoute = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
      <h1 className="text-3xl font-bold text-gray-900">React Template</h1>
      <p className="max-w-md text-gray-600">
        A strict, docs-first starting point. Read <code>/docs</code> and{' '}
        <code>AGENTS.md</code> before building anything.
      </p>
      <Button asChild>
        <Link to={paths.discussions.getHref()}>View the example feature</Link>
      </Button>
    </main>
  );
};

export default LandingRoute;

import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

export default function NotFoundPage() {
  return (
    <div className="flex min-h-[calc(100vh-160px)] flex-col items-center justify-center px-4 text-center">
      <p className="text-8xl font-bold text-brand-200 dark:text-brand-900">404</p>
      <h1 className="mt-4 font-display text-3xl font-semibold text-stone-900 dark:text-stone-100">
        Page not found
      </h1>
      <p className="mt-3 max-w-md text-stone-600 dark:text-stone-400">
        Looks like this trail doesn&apos;t exist. The page you&apos;re looking for may have been moved or removed.
      </p>
      <div className="mt-8 flex gap-4">
        <Link to="/">
          <Button size="lg">Back to home</Button>
        </Link>
        <Link to="/listings">
          <Button variant="outline" size="lg">Browse stays</Button>
        </Link>
      </div>
    </div>
  );
}

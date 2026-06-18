import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

export default function NotFoundPage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="text-6xl font-bold text-[#222222]">404</h1>
      <p className="mt-4 text-xl text-[#717171]">We can&apos;t seem to find the page you&apos;re looking for.</p>
      <div className="mt-8 flex gap-4">
        <Link to="/"><Button>Go home</Button></Link>
        <Link to="/listings"><Button variant="outline">Search stays</Button></Link>
      </div>
    </div>
  );
}

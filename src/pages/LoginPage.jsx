import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { useToast } from '../context/ToastContext';

export default function LoginPage() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      showToast({ message: 'Welcome back! (Demo mode — no auth backend)', type: 'success' });
      navigate('/dashboard');
    }, 800);
  };

  return (
    <div className="flex min-h-[calc(100vh-80px)]">
      <div className="hidden w-1/2 lg:block">
        <img
          src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200&q=80"
          alt="Mountain lake"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex w-full items-center justify-center px-4 py-12 lg:w-1/2">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center lg:text-left">
            <h1 className="font-display text-3xl font-semibold text-stone-900 dark:text-stone-100">
              Welcome back
            </h1>
            <p className="mt-2 text-stone-600 dark:text-stone-400">
              Log in to manage your eco-adventures
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Email"
              type="email"
              name="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
            <Input
              label="Password"
              type="password"
              name="password"
              placeholder="••••••••"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-stone-600 dark:text-stone-400">
                <input type="checkbox" className="rounded border-stone-300 text-brand-600" />
                Remember me
              </label>
              <a href="#" className="font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400">
                Forgot password?
              </a>
            </div>
            <Button type="submit" className="w-full" size="lg" loading={loading}>
              Log in
            </Button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-stone-200 dark:border-stone-800" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-earth-50 px-4 text-stone-500 dark:bg-stone-950">or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" type="button" onClick={() => showToast({ message: 'Google login coming soon', type: 'info' })}>
              Google
            </Button>
            <Button variant="outline" type="button" onClick={() => showToast({ message: 'Apple login coming soon', type: 'info' })}>
              Apple
            </Button>
          </div>

          <p className="mt-8 text-center text-sm text-stone-600 dark:text-stone-400">
            Don&apos;t have an account?{' '}
            <Link to="/register" className="font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-400">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

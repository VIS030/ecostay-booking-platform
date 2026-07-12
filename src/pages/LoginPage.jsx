import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const redirectToken = searchParams.get('token');

  useEffect(() => {
    if (redirectToken) {
      // Save token parameter from Google OAuth callback
      localStorage.setItem('ecostay-token', redirectToken);
      sessionStorage.removeItem('ecostay-token');
      // Redirect to dashboard cleanly
      window.location.href = '/dashboard';
    }
  }, [redirectToken]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(form.email, form.password, rememberMe);
      navigate('/dashboard');
    } catch (err) {
      // Handled in AuthContext
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-73px)] bg-white dark:bg-slate-950 transition-colors duration-200">
      <div className="mx-auto flex max-w-[1040px] flex-col md:flex-row">
        <div className="relative hidden min-h-[600px] flex-1 md:block">
          <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1000&q=85" alt="" className="absolute inset-0 h-full w-full object-cover" />
        </div>
        <div className="flex flex-1 items-center justify-center px-6 py-12">
          <div className="w-full max-w-[400px]">
            <h1 className="text-2xl font-semibold text-[#222222] dark:text-white">Welcome to EcoStay</h1>
            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              <Input label="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
              <Input label="Password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
              <div className="flex items-center justify-between text-sm py-1">
                <label className="flex items-center gap-2 cursor-pointer dark:text-slate-350 select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 dark:border-slate-700 text-[#2068a2] focus:ring-[#2068a2] cursor-pointer"
                  />
                  Remember me
                </label>
                <Link to="/forgot-password" className="font-semibold text-[#2068a2] dark:text-blue-400 hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Button type="submit" className="w-full font-bold" size="lg" loading={loading}>Continue</Button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-slate-800"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white dark:bg-slate-950 px-2 text-[#717171] dark:text-slate-400">Or continue with</span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full flex items-center justify-center gap-2 border border-gray-300 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-900 font-semibold py-2 text-sm text-[#222222] dark:text-slate-300"
              onClick={() => {
                window.location.href = 'http://localhost:8000/api/auth/github/login';
              }}
            >
              <svg className="h-5 w-5 fill-[#24292f] dark:fill-white" viewBox="0 0 16 16">
                <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.35 3.12.88.01.64.01 1.11.01 1.38 0 .21-.15.46-.55.38A8.013 8.013 0 0 1 0 8c0-4.42 3.58-8 8-8z"></path>
              </svg>
              GitHub
            </Button>

            <p className="mt-6 text-center text-sm text-[#717171] dark:text-slate-400">
              New to EcoStay? <Link to="/register" className="font-semibold text-[#222222] dark:text-white underline">Create an account</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

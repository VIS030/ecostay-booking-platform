import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

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
            <p className="mt-6 text-center text-sm text-[#717171] dark:text-slate-400">
              New to EcoStay? <Link to="/register" className="font-semibold text-[#222222] dark:text-white underline">Create an account</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

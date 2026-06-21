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
      showToast({ message: 'Welcome back! (Demo mode)', type: 'success' });
      navigate('/dashboard');
    }, 800);
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

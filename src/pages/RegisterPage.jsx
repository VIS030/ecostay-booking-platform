import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (form.password.length < 8) newErrors.password = 'At least 8 characters';
    if (form.password !== form.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (Object.keys(newErrors).length) { setErrors(newErrors); return; }
    
    setLoading(true);
    try {
      await register(form.name, form.email, form.password);
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
          <img src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1000&q=85" alt="" className="absolute inset-0 h-full w-full object-cover" />
        </div>
        <div className="flex flex-1 items-center justify-center px-6 py-12">
          <div className="w-full max-w-[400px]">
            <h1 className="text-2xl font-semibold text-[#222222] dark:text-white">Finish signing up</h1>
            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              <Input label="Legal name" type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
              <Input label="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
              <Input label="Password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} error={errors.password} required />
              <Input label="Confirm password" type="password" value={form.confirmPassword} onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })} error={errors.confirmPassword} required />
              <Button type="submit" className="w-full font-bold" size="lg" loading={loading}>Agree and continue</Button>
            </form>
            <p className="mt-6 text-center text-sm text-[#717171] dark:text-slate-400">
              Already have an account? <Link to="/login" className="font-semibold text-[#222222] dark:text-white underline">Log in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const { forgotPassword, resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [step, setStep] = useState(1); // 1 = Request code, 2 = Verify & Reset
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRequestCode = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await forgotPassword(email);
      // In sandbox/test mode we can grab the code directly from the response
      if (response && response.code) {
        console.log("Password reset code from API:", response.code);
      }
      setStep(2);
    } catch (err) {
      setError(err.message || 'Failed to request reset code.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await resetPassword(email, code, newPassword);
      navigate('/login');
    } catch (err) {
      setError(err.message || 'Password reset failed. Verify email and code.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-73px)] bg-white dark:bg-slate-950 flex items-center justify-center px-6 py-12 transition-colors duration-200">
      <div className="w-full max-w-[400px] border border-[#dddddd] dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-sm">
        <h1 className="text-2xl font-semibold text-[#222222] dark:text-white text-center">
          {step === 1 ? 'Forgot Password' : 'Reset Password'}
        </h1>
        <p className="mt-2 text-sm text-[#717171] dark:text-slate-400 text-center">
          {step === 1 
            ? 'Enter your email address and we will generate a recovery code.' 
            : 'Enter the recovery code logged in the console/terminal logs and set your new password.'
          }
        </p>

        {error && (
          <div className="mt-4 rounded-lg bg-red-50 dark:bg-red-950/20 p-3 text-sm text-red-600 dark:text-red-400">
            {error}
          </div>
        )}

        {step === 1 ? (
          <form onSubmit={handleRequestCode} className="mt-6 space-y-4">
            <Input 
              label="Email Address" 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
            <Button type="submit" className="w-full font-bold" size="lg" loading={loading}>
              Send Recovery Code
            </Button>
            <div className="text-center text-sm mt-4">
              <Link to="/login" className="font-semibold text-[#2068a2] dark:text-blue-400 hover:underline">
                Back to Login
              </Link>
            </div>
          </form>
        ) : (
          <form onSubmit={handleResetPassword} className="mt-6 space-y-4">
            <Input 
              label="Recovery Code" 
              type="text" 
              maxLength={6}
              value={code} 
              onChange={(e) => setCode(e.target.value)} 
              required 
            />
            <Input 
              label="New Password" 
              type="password" 
              value={newPassword} 
              onChange={(e) => setNewPassword(e.target.value)} 
              required 
            />
            <Input 
              label="Confirm New Password" 
              type="password" 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)} 
              required 
            />
            <Button type="submit" className="w-full font-bold" size="lg" loading={loading}>
              Reset Password
            </Button>
            <div className="flex justify-between text-sm mt-4">
              <button 
                type="button" 
                onClick={() => setStep(1)} 
                className="font-semibold text-[#717171] hover:underline"
              >
                Request code again
              </button>
              <Link to="/login" className="font-semibold text-[#2068a2] dark:text-blue-400 hover:underline">
                Back to Login
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

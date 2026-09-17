import React, { useState } from 'react';
import { 
  X, 
  User, 
  Mail, 
  Phone, 
  Lock, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useProperty } from '../context/PropertyContext';
import { UserRole } from '../types/property';

export const AuthModal: React.FC = () => {
  const { authModalOpen, setAuthModalOpen, loginUser, addToast } = useProperty();

  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [method, setMethod] = useState<'phone' | 'email'>('phone');
  const [role, setRole] = useState<UserRole>('user');

  // Form states
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  if (!authModalOpen) return null;

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.length < 10) {
      addToast('error', 'Invalid Phone', 'Please enter a valid 10-digit Indian mobile number.');
      return;
    }
    setOtpSent(true);
    addToast('info', 'OTP Sent', `Verification code 4829 sent to +91 ${phoneNumber}`);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp !== '4829' && otp.length < 4) {
      addToast('error', 'Invalid OTP', 'Please enter code 4829 (Demo OTP).');
      return;
    }
    loginUser(role, name || (role === 'agent' ? 'Rajeev Malhotra (Agent)' : 'Rahul Sharma (Buyer)'));
    setAuthModalOpen(false);
  };

  const handleEmailAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      addToast('error', 'Required Field', 'Please enter your email address.');
      return;
    }
    loginUser(role, name || (role === 'admin' ? 'PropertyDekhey Admin' : 'Ananya Roy'));
    setAuthModalOpen(false);
  };

  const handleQuickDemoLogin = (selectedRole: UserRole, demoName: string) => {
    loginUser(selectedRole, demoName);
    setAuthModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-200 relative">
        
        {/* Close button */}
        <button
          onClick={() => setAuthModalOpen(false)}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Header */}
        <div className="bg-[#0a192f] p-6 text-white text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl" />
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-amber-400 bg-amber-950/60 px-3 py-1 rounded-full border border-amber-500/30 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Apni Property, Apni Choice</span>
          </div>
          <h3 className="text-2xl font-black text-white">
            {authMode === 'login' ? 'Welcome to PropertyDekhey' : 'Create an Account'}
          </h3>
          <p className="text-xs text-slate-300 mt-1">
            Access verified listings, save favourites, and schedule site visits.
          </p>
        </div>

        <div className="p-6 space-y-5">
          
          {/* Role selector tabs */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
              I am a
            </label>
            <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 rounded-xl text-xs font-bold text-slate-600">
              <button
                type="button"
                onClick={() => setRole('user')}
                className={`py-1.5 rounded-lg transition-all ${
                  role === 'user' ? 'bg-white text-slate-900 shadow-sm' : 'hover:text-slate-900'
                }`}
              >
                Buyer / Tenant
              </button>
              <button
                type="button"
                onClick={() => setRole('agent')}
                className={`py-1.5 rounded-lg transition-all ${
                  role === 'agent' ? 'bg-white text-slate-900 shadow-sm' : 'hover:text-slate-900'
                }`}
              >
                Agent / Broker
              </button>
              <button
                type="button"
                onClick={() => setRole('admin')}
                className={`py-1.5 rounded-lg transition-all ${
                  role === 'admin' ? 'bg-amber-500 text-[#0a192f] shadow-sm' : 'hover:text-slate-900'
                }`}
              >
                Admin Desk
              </button>
            </div>
          </div>

          {/* Quick Demo 1-Click Fill Buttons */}
          <div className="p-3 bg-amber-50/70 border border-amber-200/80 rounded-xl text-xs text-amber-900">
            <div className="font-bold flex items-center justify-between">
              <span>Quick Demo Instant Sign-In:</span>
              <span className="text-[10px] font-normal text-amber-700">1-click test</span>
            </div>
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => handleQuickDemoLogin('user', 'Rahul Sharma (Buyer)')}
                className="flex-1 py-1.5 bg-white hover:bg-amber-100 rounded-lg font-semibold text-slate-800 border border-amber-200 text-center shadow-xs"
              >
                Buyer Demo
              </button>
              <button
                onClick={() => handleQuickDemoLogin('agent', 'Vikramjit (Agent)')}
                className="flex-1 py-1.5 bg-white hover:bg-amber-100 rounded-lg font-semibold text-slate-800 border border-amber-200 text-center shadow-xs"
              >
                Agent Demo
              </button>
              <button
                onClick={() => handleQuickDemoLogin('admin', 'Admin Desk')}
                className="flex-1 py-1.5 bg-[#0a192f] hover:bg-[#132744] rounded-lg font-bold text-amber-400 text-center shadow-xs"
              >
                Admin Demo
              </button>
            </div>
          </div>

          {/* Method selector: Mobile OTP vs Email */}
          <div className="flex items-center justify-center space-x-4 text-xs font-semibold text-slate-500 border-b border-slate-100 pb-3">
            <button
              onClick={() => setMethod('phone')}
              className={`pb-1 transition-colors ${method === 'phone' ? 'text-amber-600 border-b-2 border-amber-500 font-bold' : 'hover:text-slate-800'}`}
            >
              Indian Mobile OTP
            </button>
            <button
              onClick={() => setMethod('email')}
              className={`pb-1 transition-colors ${method === 'email' ? 'text-amber-600 border-b-2 border-amber-500 font-bold' : 'hover:text-slate-800'}`}
            >
              Email & Password
            </button>
          </div>

          {/* Phone OTP Form */}
          {method === 'phone' ? (
            !otpSent ? (
              <form onSubmit={handleSendOtp} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Mobile Number
                  </label>
                  <div className="flex items-center">
                    <span className="px-3 py-2.5 bg-slate-100 border border-r-0 border-slate-200 rounded-l-xl text-xs font-bold text-slate-700">
                      +91
                    </span>
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      placeholder="98765 43210"
                      className="w-full px-3 py-2.5 border border-slate-200 rounded-r-xl text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#0a192f] hover:bg-[#132744] text-amber-400 font-bold rounded-xl text-sm transition-colors shadow-md flex items-center justify-center space-x-1.5"
                >
                  <span>Send OTP Verification Code</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="space-y-3.5">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-semibold text-slate-700">
                      Enter 4-Digit OTP
                    </label>
                    <span className="text-[11px] text-amber-600 font-medium">Demo Code: 4829</span>
                  </div>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter 4829"
                    maxLength={4}
                    className="w-full text-center tracking-widest text-xl font-black py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                    required
                  />
                  <div className="text-[11px] text-slate-500 mt-1 flex justify-between">
                    <span>Sent to +91 {phoneNumber}</span>
                    <button type="button" onClick={() => setOtpSent(false)} className="text-amber-600 hover:underline">
                      Change Number
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-[#0a192f] font-black rounded-xl text-sm transition-colors shadow-md"
                >
                  Verify & Continue
                </button>
              </form>
            )
          ) : (
            /* Email Form */
            <form onSubmit={handleEmailAuth} className="space-y-3.5">
              {authMode === 'signup' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Rahul Sharma"
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#0a192f] hover:bg-[#132744] text-amber-400 font-bold rounded-xl text-sm transition-colors shadow-md"
              >
                {authMode === 'login' ? 'Sign In' : 'Create Account'}
              </button>
            </form>
          )}

          {/* Bottom Switch between Login / Signup */}
          <div className="pt-2 text-center text-xs text-slate-500">
            {authMode === 'login' ? (
              <p>
                Don't have an account yet?{' '}
                <button
                  type="button"
                  onClick={() => setAuthMode('signup')}
                  className="font-bold text-amber-600 hover:underline"
                >
                  Register Free
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setAuthMode('login')}
                  className="font-bold text-amber-600 hover:underline"
                >
                  Sign In
                </button>
              </p>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};

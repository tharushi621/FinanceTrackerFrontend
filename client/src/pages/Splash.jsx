import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Splash() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => setShow(true), 100);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #064e3b 0%, #065f46 40%, #047857 70%, #059669 100%)' }}>

      {/* Animated background circles */}
      <div className="absolute top-[-100px] left-[-100px] w-96 h-96 rounded-full opacity-10"
        style={{ background: 'radial-gradient(circle, #34d399, transparent)' }} />
      <div className="absolute bottom-[-150px] right-[-100px] w-[500px] h-[500px] rounded-full opacity-10"
        style={{ background: 'radial-gradient(circle, #6ee7b7, transparent)' }} />
      <div className="absolute top-1/2 right-[-50px] w-64 h-64 rounded-full opacity-5"
        style={{ background: 'radial-gradient(circle, #a7f3d0, transparent)' }} />

      {/* Floating coins */}
      {['💰', '💵', '📈', '💎', '🏦'].map((emoji, i) => (
        <div key={i}
          className="absolute text-3xl opacity-20 animate-bounce"
          style={{
            top: `${10 + i * 18}%`,
            left: i % 2 === 0 ? `${5 + i * 3}%` : 'auto',
            right: i % 2 !== 0 ? `${5 + i * 3}%` : 'auto',
            animationDelay: `${i * 0.3}s`,
            animationDuration: `${2 + i * 0.5}s`
          }}>
          {emoji}
        </div>
      ))}

      {/* Main content */}
      <div className={`text-center px-8 transition-all duration-1000 ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>

        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <div className="w-24 h-24 rounded-3xl flex items-center justify-center shadow-2xl"
            style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)' }}>
            <span className="text-5xl">💰</span>
          </div>
        </div>

        {/* App name */}
        <div className="mb-2">
          <span className="text-white text-lg font-medium tracking-widest uppercase opacity-80">
            Welcome to
          </span>
        </div>
        <h1 className="text-5xl font-bold text-white mb-3 tracking-tight">
          Finance<span style={{ color: '#34d399' }}>Tracker</span>
        </h1>

        {/* Tagline */}
        <p className="text-xl font-medium mb-3" style={{ color: '#a7f3d0' }}>
          Your Money, Your Future
        </p>
        <p className="text-base opacity-70 text-white max-w-sm mx-auto mb-12 leading-relaxed">
          Take control of your finances. Track expenses, set budgets, and build the life you deserve.
        </p>

        {/* Stats row */}
        <div className="flex justify-center gap-8 mb-12">
          {[
            { value: '10K+', label: 'Users' },
            { value: '$2M+', label: 'Tracked' },
            { value: '98%', label: 'Satisfaction' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <p className="text-xs opacity-60 text-white uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate('/register')}
            className="px-10 py-4 rounded-2xl font-bold text-base shadow-xl transition-all duration-200 hover:scale-105 hover:shadow-2xl"
            style={{ background: 'linear-gradient(135deg, #34d399, #059669)', color: 'white' }}>
            Get Started Free 🚀
          </button>
          <button
            onClick={() => navigate('/login')}
            className="px-10 py-4 rounded-2xl font-bold text-base transition-all duration-200 hover:scale-105"
            style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.3)', color: 'white' }}>
            Sign In →
          </button>
        </div>

        {/* Features row */}
        <div className="flex justify-center gap-6 mt-12">
          {[
            { icon: '📊', text: 'Smart Analytics' },
            { icon: '🎯', text: 'Budget Goals' },
            { icon: '🔒', text: 'Secure & Private' },
          ].map((f) => (
            <div key={f.text} className="flex items-center gap-2 opacity-70">
              <span className="text-lg">{f.icon}</span>
              <span className="text-white text-sm font-medium">{f.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
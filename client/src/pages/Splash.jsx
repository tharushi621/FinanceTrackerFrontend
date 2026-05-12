import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const motivations = [
  { text: "A penny saved is a penny earned.", author: "Benjamin Franklin" },
  { text: "Do not save what is left after spending, but spend what is left after saving.", author: "Warren Buffett" },
  { text: "Financial freedom is available to those who learn about it and work for it.", author: "Robert Kiyosaki" },
  { text: "It's not about how much money you make, but how much you keep.", author: "Robert Kiyosaki" },
  { text: "The secret to wealth is simple: spend less than you earn.", author: "Thomas Stanley" },
];

const features = [
  { icon: '📊', title: 'Smart Analytics', desc: 'Visualize your spending patterns' },
  { icon: '🎯', title: 'Budget Goals', desc: 'Set and track monthly budgets' },
  { icon: '💸', title: 'Expense Tracking', desc: 'Log every transaction easily' },
  { icon: '🔒', title: 'Secure & Private', desc: 'Your data stays protected' },
];

export default function Splash() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [quoteVisible, setQuoteVisible] = useState(true);
  const [currentFeature, setCurrentFeature] = useState(0);

  useEffect(() => {
    setTimeout(() => setShow(true), 100);

    const quoteTimer = setInterval(() => {
      setQuoteVisible(false);
      setTimeout(() => {
        setQuoteIndex((i) => (i + 1) % motivations.length);
        setQuoteVisible(true);
      }, 500);
    }, 4000);

    const featureTimer = setInterval(() => {
      setCurrentFeature((i) => (i + 1) % features.length);
    }, 2000);

    return () => {
      clearInterval(quoteTimer);
      clearInterval(featureTimer);
    };
  }, []);

  return (
    <div className="min-h-screen flex overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #022c22 0%, #064e3b 40%, #065f46 70%, #047857 100%)' }}>

      {/* Animated background */}
      {[...Array(6)].map((_, i) => (
        <div key={i}
          className="absolute rounded-full opacity-5 animate-pulse"
          style={{
            width: `${200 + i * 100}px`,
            height: `${200 + i * 100}px`,
            top: `${-50 + i * 15}%`,
            left: `${-10 + i * 20}%`,
            background: 'radial-gradient(circle, #34d399, transparent)',
            animationDelay: `${i * 0.5}s`,
            animationDuration: `${3 + i}s`,
          }} />
      ))}

      {/* Left side */}
      <div className={`flex-1 flex flex-col justify-center px-16 transition-all duration-1000 ${show ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>

        {/* Logo */}
        <div className="flex items-center gap-4 mb-10">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-2xl"
            style={{ background: 'linear-gradient(135deg, #34d399, #059669)' }}>
            <span className="text-3xl">💰</span>
          </div>
          <div>
            <h1 className="text-3xl font-black text-white tracking-tight">
              Finance<span style={{ color: '#34d399' }}>Tracker</span>
            </h1>
            <p className="text-xs tracking-widest uppercase" style={{ color: '#6ee7b7' }}>Smart Money Management</p>
          </div>
        </div>

        {/* Headline */}
        <h2 className="text-6xl font-black text-white leading-tight mb-4">
          Take Control<br />
          of Your<br />
          <span style={{
            background: 'linear-gradient(135deg, #34d399, #6ee7b7)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Financial Future
          </span>
        </h2>

        <p className="text-lg text-white/60 mb-10 max-w-md leading-relaxed">
          Track expenses, set smart budgets, and watch your savings grow. 
          Join thousands building their dream financial life.
        </p>

        {/* Buttons */}
        <div className="flex gap-4 mb-12">
          <button
            onClick={() => navigate('/register')}
            className="px-8 py-4 rounded-2xl font-bold text-white shadow-2xl transition-all duration-200 hover:scale-105 hover:shadow-green-500/25"
            style={{ background: 'linear-gradient(135deg, #059669, #34d399)' }}>
            Start For Free 🚀
          </button>
          <button
            onClick={() => navigate('/login')}
            className="px-8 py-4 rounded-2xl font-bold transition-all duration-200 hover:scale-105"
            style={{
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.2)',
              color: 'white',
              backdropFilter: 'blur(10px)'
            }}>
            Sign In →
          </button>
        </div>

        {/* Stats */}
        <div className="flex gap-8">
          {[
            { value: '10K+', label: 'Active Users' },
            { value: '$2M+', label: 'Money Tracked' },
            { value: '4.9★', label: 'User Rating' },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-2xl font-black text-white">{s.value}</p>
              <p className="text-xs text-white/40 uppercase tracking-wider">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right side */}
      <div className={`flex-1 flex flex-col justify-center px-12 transition-all duration-1000 delay-300 ${show ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>

        {/* Motivational quote card */}
        <div className="rounded-3xl p-8 mb-6 shadow-2xl"
          style={{
            background: 'rgba(255,255,255,0.07)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
          <div className="text-4xl mb-4">💡</div>
          <div className={`transition-all duration-500 ${quoteVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
            <p className="text-white text-xl font-medium leading-relaxed mb-3 italic">
              "{motivations[quoteIndex].text}"
            </p>
            <p style={{ color: '#34d399' }} className="text-sm font-semibold">
              — {motivations[quoteIndex].author}
            </p>
          </div>
          {/* Quote dots */}
          <div className="flex gap-2 mt-4">
            {motivations.map((_, i) => (
              <div key={i} className="h-1.5 rounded-full transition-all duration-300"
                style={{
                  width: i === quoteIndex ? '24px' : '6px',
                  background: i === quoteIndex ? '#34d399' : 'rgba(255,255,255,0.2)'
                }} />
            ))}
          </div>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {features.map((f, i) => (
            <div key={i}
              className="rounded-2xl p-5 transition-all duration-500"
              style={{
                background: i === currentFeature
                  ? 'linear-gradient(135deg, rgba(52,211,153,0.2), rgba(5,150,105,0.2))'
                  : 'rgba(255,255,255,0.05)',
                border: i === currentFeature
                  ? '1px solid rgba(52,211,153,0.4)'
                  : '1px solid rgba(255,255,255,0.08)',
                transform: i === currentFeature ? 'scale(1.03)' : 'scale(1)',
              }}>
              <div className="text-2xl mb-2">{f.icon}</div>
              <p className="text-white font-semibold text-sm">{f.title}</p>
              <p className="text-white/50 text-xs mt-1">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Mock dashboard preview */}
        <div className="rounded-2xl p-5"
          style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.08)'
          }}>
          <p className="text-white/40 text-xs uppercase tracking-wider mb-3">Your Money At a Glance</p>
          <div className="flex gap-3">
            {[
              { label: 'Balance', value: '$12,450', color: '#34d399' },
              { label: 'Saved', value: '$3,200', color: '#60a5fa' },
              { label: 'Spent', value: '$1,800', color: '#f87171' },
            ].map((item) => (
              <div key={item.label} className="flex-1 rounded-xl p-3"
                style={{ background: 'rgba(255,255,255,0.05)' }}>
                <p className="text-xs text-white/40 mb-1">{item.label}</p>
                <p className="font-bold text-sm" style={{ color: item.color }}>{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
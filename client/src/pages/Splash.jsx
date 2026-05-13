import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, Shield, Target, BarChart2, ArrowRight, Sparkles } from 'lucide-react';
import heroGirl from '@/assets/herogirl.jpg';

const stats = [
  { value: '10K+', label: 'Active Users' },
  { value: '$2M+', label: 'Money Tracked' },
  { value: '4.9★', label: 'User Rating' },
];

export default function Splash() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => setShow(true), 80);
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #021a12 0%, #042f1e 40%, #064e3b 100%)' }}
    >
      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute rounded-full opacity-[0.07]"
          style={{ width: 700, height: 700, background: 'radial-gradient(circle, #34d399, transparent)', top: -200, right: -100 }} />
        <div className="absolute rounded-full opacity-[0.05]"
          style={{ width: 500, height: 500, background: 'radial-gradient(circle, #6ee7b7, transparent)', bottom: -100, left: '20%' }} />
      </div>

      {/* ── NAVBAR (brand + auth only) ── */}
      <nav className={`relative z-20 flex items-center justify-between px-12 py-5 transition-all duration-700 ${show ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #059669, #34d399)' }}>
            <TrendingUp size={17} color="#fff" strokeWidth={2.5} />
          </div>
          <span className="text-white font-black text-lg tracking-tight">
            Finance<span style={{ color: '#34d399' }}>Tracker</span>
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/login')}
            className="px-5 py-2 rounded-lg text-sm font-semibold text-white/60 hover:text-white transition-colors duration-200">
            Sign In
          </button>
          <button onClick={() => navigate('/register')}
            className="flex items-center gap-1.5 px-5 py-2 rounded-lg text-sm font-bold text-white transition-all duration-200 hover:scale-105 hover:brightness-110"
            style={{ background: 'linear-gradient(135deg, #059669, #34d399)' }}>
            Get Started <ArrowRight size={14} />
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <div className="relative z-10 flex flex-1 items-center px-12 pb-8 gap-6">

        {/* LEFT */}
        <div className={`flex flex-col w-[46%] transition-all duration-1000 delay-150 ${show ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>

          {/* Badge */}
          <div className="flex items-center gap-2 mb-7 w-fit px-3 py-1.5 rounded-full"
            style={{ background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.25)' }}>
            <Sparkles size={12} style={{ color: '#34d399' }} />
            <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: '#6ee7b7' }}>
              Your Financial Journey Starts Here
            </span>
          </div>

          {/* Headline */}
          <h2 className="text-[3.6rem] font-black text-white leading-[1.05] mb-5 tracking-tight">
            Take Control<br />of Your<br />
            <span style={{
              background: 'linear-gradient(90deg, #34d399, #6ee7b7)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              Financial Future
            </span>
          </h2>

          {/* Subtext */}
          <p className="text-base text-white/45 leading-relaxed mb-9 max-w-[340px]">
            Track expenses, set smart budgets, and build the life you deserve — simple, powerful, and secure.
          </p>

          {/* CTAs */}
          <div className="flex items-center gap-4 mb-11">
            <button onClick={() => navigate('/register')}
              className="flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm text-white transition-all duration-200 hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #059669, #34d399)', boxShadow: '0 8px 32px rgba(5,150,105,0.35)' }}>
              Get Started Free <ArrowRight size={15} />
            </button>
            <button onClick={() => navigate('/login')}
              className="px-7 py-3.5 rounded-xl font-bold text-sm text-white/70 hover:text-white transition-all duration-200 hover:scale-105"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)' }}>
              Sign In
            </button>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-8">
            {stats.map((s, i) => (
              <div key={s.label} className="flex items-center gap-8">
                {i > 0 && <div className="w-px h-8 bg-white/10" />}
                <div>
                  <p className="text-2xl font-black text-white">{s.value}</p>
                  <p className="text-[10px] font-semibold text-white/30 uppercase tracking-widest mt-0.5">{s.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className={`flex-1 relative flex items-center justify-center transition-all duration-1000 delay-300 ${show ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>

          {/* Glow behind image */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[380px] h-[380px] rounded-full opacity-15"
              style={{ background: 'radial-gradient(circle, #34d399, transparent)' }} />
          </div>

          <div className="relative w-full max-w-[500px]">
            {/* Corner accents */}
            <div className="absolute -top-4 -left-4 w-10 h-10 opacity-50"
              style={{ borderTop: '2px solid #34d399', borderLeft: '2px solid #34d399', borderRadius: '4px 0 0 0' }} />
            <div className="absolute -bottom-4 -right-4 w-10 h-10 opacity-50"
              style={{ borderBottom: '2px solid #34d399', borderRight: '2px solid #34d399', borderRadius: '0 0 4px 0' }} />

            {/* Photo */}
            <div className="relative rounded-[2rem] overflow-hidden"
              style={{ border: '1px solid rgba(52,211,153,0.18)', boxShadow: '0 30px 80px rgba(0,0,0,0.55), 0 0 60px rgba(52,211,153,0.08)' }}>
              <img
                src={heroGirl}
                alt="Smart finance management"
                className="w-full object-cover"
                style={{ height: '490px', objectPosition: 'center top' }}
              />
              <div className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
                style={{ background: 'linear-gradient(to top, rgba(4,47,30,0.7), transparent)' }} />
            </div>

            {/* Dot grid */}
            <div className="absolute -bottom-5 -right-5 grid grid-cols-4 gap-1.5 opacity-25">
              {[...Array(16)].map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              ))}
            </div>

            {/* Floating feature cards */}
            {[
              { pos: '-left-16 top-8',    icon: BarChart2,   title: 'Smart Analytics',  desc: 'Real-time insights'   },
              { pos: '-right-16 top-8',   icon: Target,      title: 'Budget Goals',      desc: 'Hit every target'     },
              { pos: '-left-16 bottom-12',icon: TrendingUp,  title: 'Expense Tracking',  desc: 'Know where it goes'   },
              { pos: '-right-16 bottom-12',icon: Shield,     title: 'Secure & Private',  desc: 'Bank-grade security'  },
            ].map(({ pos, icon: Icon, title, desc }) => (
              <div key={title}
                className={`absolute ${pos} px-3.5 py-2.5 rounded-xl flex items-center gap-2.5 backdrop-blur-md`}
                style={{ background: 'rgba(6,79,60,0.88)', border: '1px solid rgba(52,211,153,0.2)', boxShadow: '0 8px 24px rgba(0,0,0,0.3)' }}>
                <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(52,211,153,0.2)' }}>
                  <Icon size={14} style={{ color: '#34d399' }} />
                </div>
                <div>
                  <p className="text-white text-xs font-bold leading-none">{title}</p>
                  <p className="text-white/40 text-[10px] mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
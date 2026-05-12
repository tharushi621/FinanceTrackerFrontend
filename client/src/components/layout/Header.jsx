import { useAuth } from '@/context/AuthContext';
import { LogOut, User, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Header() {
  const { user, logout } = useAuth();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });
  };

  const getGreeting = () => {
    const h = time.getHours();
    if (h < 12) return '🌅 Good Morning';
    if (h < 17) return '☀️ Good Afternoon';
    return '🌙 Good Evening';
  };

  return (
    <header className="bg-white border-b border-slate-100 px-6 py-3 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-6">
        <div>
          <p className="text-sm text-slate-400">{getGreeting()},</p>
          <p className="font-bold text-slate-800 text-lg leading-tight">{user?.name} 👋</p>
        </div>
        <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl"
          style={{ background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)', border: '1px solid #bbf7d0' }}>
          <Clock size={14} style={{ color: '#16a34a' }} />
          <div>
            <p className="text-sm font-bold" style={{ color: '#15803d' }}>{formatTime(time)}</p>
            <p className="text-xs" style={{ color: '#16a34a' }}>{formatDate(time)}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-50 text-sm text-slate-500">
          <User size={14} />
          <span className="hidden md:block">{user?.email}</span>
        </div>
        <button
          onClick={logout}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white transition-all hover:scale-105 hover:opacity-90"
          style={{ background: 'linear-gradient(135deg, #064e3b, #059669)' }}>
          <LogOut size={14} />
          Logout
        </button>
      </div>
    </header>
  );
}
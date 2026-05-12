import { useAuth } from '@/context/AuthContext';
import { LogOut, User, Bell } from 'lucide-react';

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between shadow-sm">
      <div>
        <p className="text-sm text-slate-400">Welcome back,</p>
        <p className="font-bold text-slate-800 text-lg">{user?.name} 👋</p>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-50 text-sm text-slate-500">
          <User size={14} />
          {user?.email}
        </div>
        <button
          onClick={logout}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white transition-all hover:scale-105"
          style={{ background: 'linear-gradient(135deg, #064e3b, #059669)' }}>
          <LogOut size={14} />
          Logout
        </button>
      </div>
    </header>
  );
}
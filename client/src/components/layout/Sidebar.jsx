import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ArrowLeftRight, PiggyBank, Tag } from 'lucide-react';

const links = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/transactions', icon: ArrowLeftRight, label: 'Transactions' },
  { to: '/budgets', icon: PiggyBank, label: 'Budgets' },
  { to: '/categories', icon: Tag, label: 'Categories' },
];

export default function Sidebar() {
  return (
    <div className="w-64 flex flex-col shadow-xl"
      style={{ background: 'linear-gradient(180deg, #064e3b 0%, #065f46 100%)' }}>
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: 'rgba(255,255,255,0.15)' }}>
            <span className="text-xl">💰</span>
          </div>
          <div>
            <h1 className="text-white font-bold text-lg leading-none">FinanceTracker</h1>
            <p className="text-xs mt-0.5" style={{ color: '#6ee7b7' }}>Smart Money Management</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {links.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'text-white shadow-lg'
                  : 'text-white/60 hover:text-white hover:bg-white/10'
              }`
            }
            style={({ isActive }) => isActive ? {
              background: 'linear-gradient(135deg, rgba(52,211,153,0.3), rgba(5,150,105,0.3))',
              borderLeft: '3px solid #34d399'
            } : {}}
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 m-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
        <p className="text-xs text-white/50 text-center">💡 Tip: Set budgets to</p>
        <p className="text-xs text-white/50 text-center">track your spending!</p>
      </div>
    </div>
  );
}
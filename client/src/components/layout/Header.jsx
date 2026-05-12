import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { LogOut, User } from 'lucide-react';

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white border-b px-6 py-4 flex items-center justify-between">
      <div>
        <p className="text-sm text-slate-500">Welcome back,</p>
        <p className="font-semibold text-slate-800">{user?.name}</p>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <User size={16} />
          {user?.email}
        </div>
        <Button variant="outline" size="sm" onClick={logout}>
          <LogOut size={16} className="mr-2" />
          Logout
        </Button>
      </div>
    </header>
  );
}
import { useState, useEffect } from 'react';
import { getBudgets, createBudget, updateBudget, deleteBudget } from '@/lib/api/budgets';
import { getCategories } from '@/lib/api/categories';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plus, Pencil, Trash2 } from 'lucide-react';

const empty = { amount: '', categoryId: '', period: 'MONTHLY' };

export default function Budgets() {
  const [budgets, setBudgets] = useState([]);
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    const [bRes, cRes] = await Promise.all([getBudgets(), getCategories()]);
    setBudgets(bRes.data);
    setCategories(cRes.data.filter((c) => c.type === 'EXPENSE'));
  };

  useEffect(() => { fetchData(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = { ...form, amount: parseFloat(form.amount) };
      if (editing) {
        await updateBudget(editing, data);
      } else {
        await createBudget(data);
      }
      setOpen(false);
      setForm(empty);
      setEditing(null);
      fetchData();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (b) => {
    setForm({
      amount: b.amount,
      categoryId: b.categoryId,
      period: b.period,
    });
    setEditing(b.id);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this budget?')) return;
    await deleteBudget(id);
    fetchData();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Budgets</h2>
        <Button onClick={() => { setForm(empty); setEditing(null); setOpen(true); }}>
          <Plus size={16} className="mr-2" /> Add Budget
        </Button>
      </div>

      {budgets.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-slate-400">
            No budgets yet. Add one to start tracking your spending.
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {budgets.map((budget) => {
            const percent = Math.min((budget.spent / budget.amount) * 100, 100);
            return (
              <Card key={budget.id} className={budget.isExceeded ? 'border-red-300' : ''}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{budget.category?.name}</CardTitle>
                    <div className="flex gap-1">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(budget)}>
                        <Pencil size={12} />
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(budget.id)}>
                        <Trash2 size={12} />
                      </Button>
                    </div>
                  </div>
                  <Badge variant="outline" className="w-fit text-xs">{budget.period}</Badge>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Spent</span>
                    <span className={budget.isExceeded ? 'text-red-600 font-medium' : 'font-medium'}>
                      ${budget.spent.toFixed(2)} / ${budget.amount.toFixed(2)}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className={`h-2.5 rounded-full transition-all ${budget.isExceeded ? 'bg-red-500' : percent > 75 ? 'bg-yellow-500' : 'bg-green-500'}`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>{percent.toFixed(0)}% used</span>
                    {budget.isExceeded && (
                      <span className="text-red-500 font-medium">⚠️ Over budget!</span>
                    )}
                    {!budget.isExceeded && (
                      <span>${(budget.amount - budget.spent).toFixed(2)} remaining</span>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{editing ? 'Edit Budget' : 'Add Budget'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Category</Label>
              <Select value={form.categoryId} onValueChange={(v) => setForm({ ...form, categoryId: v })}>
                <SelectTrigger><SelectValue placeholder="Select expense category" /></SelectTrigger>
                <SelectContent>
                  {categories.map((c) => (
                    <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Budget Amount</Label>
              <Input type="number" step="0.01" value={form.amount}
                onChange={(e) => setForm({ ...form, amount: e.target.value })} required />
            </div>
            <div className="space-y-2">
              <Label>Period</Label>
              <Select value={form.period} onValueChange={(v) => setForm({ ...form, period: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="MONTHLY">Monthly</SelectItem>
                  <SelectItem value="WEEKLY">Weekly</SelectItem>
                  <SelectItem value="YEARLY">Yearly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2 justify-end">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button type="submit" disabled={loading}>
                {loading ? 'Saving...' : editing ? 'Update' : 'Add'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
import { useState, useEffect } from 'react';
import { getCategories, createCategory, updateCategory, deleteCategory } from '@/lib/api/categories';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plus, Pencil, Trash2 } from 'lucide-react';

const empty = { name: '', type: 'EXPENSE' };

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    const res = await getCategories();
    setCategories(res.data);
  };

  useEffect(() => { fetchData(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editing) {
        await updateCategory(editing, form);
      } else {
        await createCategory(form);
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

  const handleEdit = (c) => {
    setForm({ name: c.name, type: c.type });
    setEditing(c.id);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this category?')) return;
    await deleteCategory(id);
    fetchData();
  };

  const incomeCategories = categories.filter((c) => c.type === 'INCOME');
  const expenseCategories = categories.filter((c) => c.type === 'EXPENSE');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Categories</h2>
        <Button onClick={() => { setForm(empty); setEditing(null); setOpen(true); }}>
          <Plus size={16} className="mr-2" /> Add Category
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Income Categories */}
        <div>
          <h3 className="text-lg font-semibold text-slate-700 mb-3 flex items-center gap-2">
            <span className="text-green-500">↑</span> Income Categories
          </h3>
          <Card>
            <CardContent className="p-0">
              {incomeCategories.length === 0 ? (
                <p className="text-slate-400 text-sm text-center py-8">No income categories yet</p>
              ) : (
                incomeCategories.map((c) => (
                  <div key={c.id} className="flex items-center justify-between px-4 py-3 border-b last:border-0">
                    <div className="flex items-center gap-2">
                      <Badge variant="default" className="bg-green-100 text-green-700 hover:bg-green-100">
                        INCOME
                      </Badge>
                      <span className="font-medium text-slate-800">{c.name}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(c)}>
                        <Pencil size={12} />
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(c.id)}>
                        <Trash2 size={12} />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>

        {/* Expense Categories */}
        <div>
          <h3 className="text-lg font-semibold text-slate-700 mb-3 flex items-center gap-2">
            <span className="text-red-500">↓</span> Expense Categories
          </h3>
          <Card>
            <CardContent className="p-0">
              {expenseCategories.length === 0 ? (
                <p className="text-slate-400 text-sm text-center py-8">No expense categories yet</p>
              ) : (
                expenseCategories.map((c) => (
                  <div key={c.id} className="flex items-center justify-between px-4 py-3 border-b last:border-0">
                    <div className="flex items-center gap-2">
                      <Badge variant="destructive" className="bg-red-100 text-red-700 hover:bg-red-100">
                        EXPENSE
                      </Badge>
                      <span className="font-medium text-slate-800">{c.name}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(c)}>
                        <Pencil size={12} />
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(c.id)}>
                        <Trash2 size={12} />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>{editing ? 'Edit Category' : 'Add Category'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. Food, Salary"
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Type</Label>
              <Select value={form.type} onValueChange={(v) => setForm({ ...form, type: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="INCOME">Income</SelectItem>
                  <SelectItem value="EXPENSE">Expense</SelectItem>
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
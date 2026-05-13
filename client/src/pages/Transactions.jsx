import { useState, useEffect } from "react";
import {
  getTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} from "@/lib/api/transactions";
import { getCategories } from "@/lib/api/categories";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { format } from "date-fns";

const empty = {
  title: "",
  amount: "",
  type: "EXPENSE",
  categoryId: "",
  date: "",
  note: "",
};

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    type: "",
    categoryId: "",
    startDate: "",
    endDate: "",
  });

  const fetchData = async () => {
    const params = {};
    if (filters.type) params.type = filters.type;
    if (filters.categoryId) params.categoryId = filters.categoryId;
    if (filters.startDate) params.startDate = filters.startDate;
    if (filters.endDate) params.endDate = filters.endDate;
    const [tRes, cRes] = await Promise.all([
      getTransactions(params),
      getCategories(),
    ]);
    setTransactions(tRes.data);
    setCategories(cRes.data);
  };

  useEffect(() => {
    fetchData();
  }, [filters]);

  const filteredCategories = categories.filter(
    (c) => !form.type || c.type === form.type,
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = { ...form, amount: parseFloat(form.amount) };
      if (editing) {
        await updateTransaction(editing, data);
      } else {
        await createTransaction(data);
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

  const handleEdit = (t) => {
    setForm({
      title: t.title,
      amount: t.amount,
      type: t.type,
      categoryId: t.categoryId,
      date: format(new Date(t.date), "yyyy-MM-dd"),
      note: t.note || "",
    });
    setEditing(t.id);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this transaction?")) return;
    await deleteTransaction(id);
    fetchData();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Transactions</h2>
        <Button
          onClick={() => {
            setForm(empty);
            setEditing(null);
            setOpen(true);
          }}
        >
          <Plus size={16} className="mr-2" /> Add Transaction
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <Label className="mb-1 block text-xs">Type</Label>
              <Select
                value={filters.type}
                onValueChange={(v) =>
                  setFilters({ ...filters, type: v === "ALL" ? "" : v })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All Types</SelectItem>
                  <SelectItem value="INCOME">Income</SelectItem>
                  <SelectItem value="EXPENSE">Expense</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="mb-1 block text-xs">Category</Label>
              <Select
                value={filters.categoryId}
                onValueChange={(v) =>
                  setFilters({ ...filters, categoryId: v === "ALL" ? "" : v })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All Categories</SelectItem>
                  {categories.map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="mb-1 block text-xs">Start Date</Label>
              <Input
                type="date"
                value={filters.startDate}
                onChange={(e) =>
                  setFilters({ ...filters, startDate: e.target.value })
                }
              />
            </div>
            <div>
              <Label className="mb-1 block text-xs">End Date</Label>
              <Input
                type="date"
                value={filters.endDate}
                onChange={(e) =>
                  setFilters({ ...filters, endDate: e.target.value })
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b">
                <tr>
                  <th className="text-left px-4 py-3 font-medium text-slate-600">
                    Title
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-slate-600">
                    Category
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-slate-600">
                    Type
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-slate-600">
                    Amount
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-slate-600">
                    Date
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-slate-600">
                    Note
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-slate-600">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {transactions.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-8 text-slate-400">
                      No transactions found
                    </td>
                  </tr>
                ) : (
                  transactions.map((t) => (
                    <tr key={t.id} className="border-b hover:bg-slate-50">
                      <td className="px-4 py-3 font-medium">{t.title}</td>
                      <td className="px-4 py-3 text-slate-500">
                        {t.category?.name}
                      </td>
                      <td className="px-4 py-3">
                        <Badge
                          variant={
                            t.type === "INCOME" ? "default" : "destructive"
                          }
                        >
                          {t.type}
                        </Badge>
                      </td>
                      <td
                        className={`px-4 py-3 font-medium ${t.type === "INCOME" ? "text-green-600" : "text-red-600"}`}
                      >
                        {t.type === "INCOME" ? "+" : "-"}${t.amount.toFixed(2)}
                      </td>
                      <td className="px-4 py-3 text-slate-500">
                        {format(new Date(t.date), "MMM dd, yyyy")}
                      </td>
                      <td className="px-4 py-3 text-slate-500">
                        {t.note || "-"}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEdit(t)}
                          >
                            <Pencil size={14} />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDelete(t.id)}
                          >
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editing ? "Edit Transaction" : "Add Transaction"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Amount</Label>
              <Input
                type="number"
                step="0.01"
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Type</Label>
              <Select
                value={form.type}
                onValueChange={(v) =>
                  setForm({ ...form, type: v, categoryId: "" })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="INCOME">Income</SelectItem>
                  <SelectItem value="EXPENSE">Expense</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <select
                value={form.categoryId}
                onChange={(e) =>
                  setForm({ ...form, categoryId: e.target.value })
                }
                className="flex h-9 w-full rounded-md border border-slate-200 bg-white px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-slate-900"
              >
                <option value="">Select expense category</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label>Date</Label>
              <Input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Note (optional)</Label>
              <Input
                value={form.note}
                onChange={(e) => setForm({ ...form, note: e.target.value })}
              />
            </div>
            <div className="flex gap-2 justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : editing ? "Update" : "Add"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

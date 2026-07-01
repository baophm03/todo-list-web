import { useState } from "react";
import { ClipboardList, Plus } from "lucide-react";
import FilterBar from '@/components/base/filter-bar';
import './globals.css';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Item from "@/components/base/item";

const FILTERS = {
  ALL: 'Tất cả',
  ACTIVE: 'Chưa xong',
  DONE: 'Hoàn thành',
} as const;

type FilterValue = (typeof FILTERS)[keyof typeof FILTERS];

type TodoItem = {
  id: number;
  text: string;
  done: boolean;
};

function Home() {
  const [list, setList] = useState<TodoItem[]>([]);
  const [filter, setFilter] = useState<FilterValue>(FILTERS.ALL);
  const [input, setInput] = useState('');

  const visibleList = list.filter((item) => {
    if (filter === FILTERS.ACTIVE) return !item.done;
    if (filter === FILTERS.DONE) return item.done;
    return true;
  });

  const handleAdd = () => {
    const text = input.trim();
    if (!text) return;

    const newItem = {
      id: Date.now(),
      text,
      done: false,
    };

    setList(prev => [...prev, newItem]);
    setInput('');
  };

  const handleUpdate = (id: number, newText: string) => {
    setList(prev => prev.map(item =>
      item.id === id ? { ...item, text: newText } : item
    ));
  };

  const handleDelete = (id: number) => {
    setList(prev => prev.filter(item => item.id !== id));
  };

  const handleToggle = (id: number) => {
    setList(prev => prev.map(item =>
      item.id === id ? { ...item, done: !item.done } : item
    ));
  };

  const handleFilterChange = (type: FilterValue) => setFilter(type);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.15),transparent_50%),linear-gradient(180deg,#f8fafc_0%,#e2e8f0_100%)] px-4 py-10 text-slate-900">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.12)] backdrop-blur-sm sm:p-8">
        {/* Header */}
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">Todo App</h1>
          <p className="text-sm text-slate-500">Quản lý công việc của bạn một cách dễ dàng</p>
        </div>

        {/* Add task */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Nhập công việc mới..."
            onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
            className="h-10 rounded-xl border-slate-300 bg-white/90 px-3 text-slate-900 shadow-xs transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
          />
          <Button onClick={handleAdd} className="min-w-24 h-10 rounded-xl bg-indigo-500 text-white hover:bg-indigo-600">
            <Plus className="mr-1.5 h-4 w-4" />
            Thêm
          </Button>
        </div>

        {/* Filter bar */}
        <FilterBar
          value={filter}
          onChange={handleFilterChange}
          tabs={[FILTERS.ALL, FILTERS.ACTIVE, FILTERS.DONE]}
        />

        <section className="space-y-4">
          <div className="flex items-end justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Danh sách công việc</h2>
              <p className="mt-1 text-sm text-slate-500">{visibleList.length} công việc đang hiển thị</p>
            </div>
          </div>
          {visibleList.length === 0 ? (
            <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-slate-300 bg-white/70 px-5 py-12 text-center">
              <ClipboardList className="h-12 w-12 text-slate-300" strokeWidth={1.5} />
              <p className="text-slate-500">
                {list.length === 0 ? 'Chưa có công việc nào. Hãy thêm việc đầu tiên!' : 'Không có công việc nào trong mục này.'}
              </p>
            </div>
          ) : (
            <ul className="space-y-3">
              {visibleList.map((item) => (
                <li key={item.id}>
                  <Item
                    item={item}
                    onDelete={handleDelete}
                    onToggle={handleToggle}
                    onUpdate={handleUpdate}
                  />
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}

export default Home;

import { Check, Pencil, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type TodoItem = {
  id: number;
  text: string;
  done: boolean;
};

type ItemProps = {
  item: TodoItem;
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
  onUpdate: (id: number, newText: string) => void;
};

function Item({ item, onDelete, onToggle, onUpdate }: ItemProps) {
  const [status, setStatus] = useState(false);
  const [newText, setNewText] = useState(item.text);

  useEffect(() => {
    setNewText(item.text);
  }, [item.text]);

  const cancel = () => {
    setStatus(false);
    setNewText(item.text);
  }
  const edit = () => {
    setStatus(true);
  }

  const save = () => {
    const text = newText.trim();
    if (text == '') {
      alert("Không được để trống")
      return

    } else {
      onUpdate(item.id, text);
      setStatus(false);
    }
  }

  const check = () => {
    onToggle(item.id)
  }
  return (
    <div className="group flex items-center gap-3 rounded-xl border border-slate-200 bg-white/95 p-4 transition hover:border-slate-300">
      <Button
        type="button"
        variant="ghost"
        size="icon-xs"
        onClick={() => check()}
        className={`shrink-0 transition ${item.done
          ? 'bg-emerald-500 text-white hover:text-white hover:bg-emerald-600'
          : 'border-slate-300 bg-white hover:border-indigo-400 hover:bg-white'
          }`}
      >
        {item.done && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
      </Button>
      <div className="flex flex-1 flex-row items-center justify-between gap-3">
        <div className="min-w-0 flex-1">
          {status ? (
            <Input
              className="w-full rounded-xl h-10 border-slate-300 bg-slate-50 px-3 py-2 text-slate-900 transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              value={newText}
              onChange={e => setNewText(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && save()}
              autoFocus
            />
          ) : (
            <Button
              type="button"
              variant="ghost"
              className={`h-auto justify-start px-0 text-left text-base font-medium leading-6 transition ${item.done ? 'text-slate-400 line-through hover:bg-transparent' : 'text-slate-800 hover:bg-transparent hover:text-indigo-600'}`}
              onClick={() => edit()}
            >
              {item.text}
            </Button>
          )}
        </div>
        <div>
          {status ? (
            <div className="flex flex-wrap gap-2">
              <Button variant="default" className="gap-1.5 rounded-xl h-10 px-4 bg-indigo-500 text-white hover:bg-indigo-600" onClick={() => save()}>
                <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
              </Button>
              <Button variant="secondary" className="rounded-xl h-10 px-4 bg-slate-100 text-slate-700 hover:bg-slate-200" onClick={() => cancel()}>
                Hủy
              </Button>
            </div>
          ) : (
            <div className="flex flex-wrap gap-2 opacity-100 sm:opacity-0 sm:transition-opacity sm:group-hover:opacity-100">
              <Button variant="ghost" className="gap-1.5 rounded-xl h-10 px-4 bg-indigo-50 text-indigo-700 hover:text-indigo-800 hover:bg-indigo-100" onClick={() => edit()}>
                <Pencil className="h-3.5 w-3.5" />
              </Button>
              <Button variant="ghost" className="gap-1.5 rounded-xl h-10 bg-rose-50 text-rose-700 hover:text-rose-800 hover:bg-rose-100" onClick={() => onDelete(item.id)}>
                <Trash className="h-3.5 w-3.5" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Item
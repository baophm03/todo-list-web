type FilterBarProps<T extends string> = {
  value: T;
  onChange: (value: T) => void;
  tabs?: T[];
};

const FilterBar = <T extends string,>({ value, onChange, tabs = [] }: FilterBarProps<T>) => {
  return (
    <div className="flex flex-wrap gap-3">
      {tabs.map((tab) => (
        <button
          className={`rounded-full px-4 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 ${value === tab ? 'bg-indigo-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'}`}
          key={tab}
          onClick={() => onChange(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default FilterBar;

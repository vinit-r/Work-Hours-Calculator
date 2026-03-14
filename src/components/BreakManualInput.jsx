import { formatMinutesHM } from '../utils/timeUtils.js';

export default function BreakManualInput({
  active,
  breaks,
  onAdd,
  onUpdate,
  onRemove,
  totalMinutes,
  onActivate,
}) {
  let newMinutesInput;

  const handleQuickAdd = (minutes) => {
    if (!active) return;
    onAdd(minutes);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newMinutesInput?.value) return;
    onAdd(newMinutesInput.value);
    newMinutesInput.value = '';
  };

  return (
    <div className={`card p-4 sm:p-5 ${!active ? 'opacity-70' : ''}`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <label className="label-text">Manual break minutes</label>
          <p className="field-description">
            Add break durations directly when you know the minutes spent.
          </p>
        </div>
        <button
          type="button"
          onClick={onActivate}
          className={`chip border border-transparent text-[11px] ${
            active
              ? 'border-brand-500 bg-brand-50 text-brand-700 dark:bg-brand-500/20 dark:text-brand-100'
              : 'hover:border-brand-300'
          }`}
        >
          {active ? 'Active mode' : 'Use this mode'}
        </button>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {[5, 10, 15, 20].map((m) => (
          <button
            key={m}
            type="button"
            disabled={!active}
            onClick={() => handleQuickAdd(m)}
            className={`chip border text-[11px] font-semibold transition-colors ${
              active
                ? 'border-brand-200 bg-brand-50 text-brand-700 hover:border-brand-400 dark:border-brand-500/50 dark:bg-brand-500/10 dark:text-brand-100'
                : 'border-slate-200 text-slate-400 dark:border-slate-700 dark:text-slate-600'
            }`}
          >
            +{m} min
          </button>
        ))}
      </div>

      <form
        onSubmit={handleAdd}
        className="mt-4 flex flex-wrap items-end gap-3"
      >
        <div>
          <span className="label-text mb-1 block">New break (minutes)</span>
          <input
            type="text"
            min={1}
            step={1}
            inputMode="numeric"
            pattern="[0-9]*"
            ref={(el) => {
              newMinutesInput = el;
            }}
            disabled={!active}
            className="input-field w-32"
            placeholder="e.g. 10"
          />
        </div>
        <button type="submit" disabled={!active} className="btn-primary mt-1">
          Add break
        </button>
      </form>

      <div className="mt-4 space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>Breaks added</span>
          <span className="font-medium text-slate-700 dark:text-slate-200">
            Total: {formatMinutesHM(totalMinutes)}
          </span>
        </div>
        {breaks.length === 0 ? (
          <p className="text-xs text-slate-400">
            No manual breaks yet. Add your first short pause above.
          </p>
        ) : (
          <ul className="divide-y divide-slate-100 text-sm dark:divide-slate-800">
            {breaks.map((b, index) => (
              <li
                key={b.id}
                className="flex items-center justify-between gap-3 py-2 first:pt-0 last:pb-0"
              >
                <div className="flex items-center gap-2">
                  <span className="chip">Break {index + 1}</span>
                  <span className="text-slate-800 dark:text-slate-100">
                    {b.minutes} min
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    min={1}
                    step={1}
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={b.minutes}
                    disabled={!active}
                    onChange={(e) => onUpdate(b.id, e.target.value)}
                    className="input-field w-24 text-right"
                  />
                  <button
                    type="button"
                    disabled={!active}
                    onClick={() => onRemove(b.id)}
                    className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600 shadow-sm hover:bg-red-100 disabled:opacity-60 dark:bg-red-500/10 dark:text-red-300 dark:hover:bg-red-500/20"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

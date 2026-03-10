import { diffMinutes, formatMinutesHM, formatTime12 } from '../utils/timeUtils.js'

export default function BreakInOutInput({
  active,
  sessions,
  onAdd,
  onUpdate,
  onRemove,
  totalMinutes,
  onActivate,
}) {
  let outRef
  let inRef

  const handleAdd = (e) => {
    e.preventDefault()
    if (!outRef?.value || !inRef?.value) return
    onAdd(outRef.value, inRef.value)
    outRef.value = ''
    inRef.value = ''
  }

  return (
    <div className={`card p-4 sm:p-5 ${!active ? 'opacity-70' : ''}`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <label className="label-text">Break in / out sessions</label>
          <p className="field-description">
            Track break start and end times. We&apos;ll calculate the duration.
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

      <form onSubmit={handleAdd} className="mt-4 flex flex-wrap items-end gap-3">
        <div>
          <span className="label-text mb-1 block">Break out</span>
          <input
            type="time"
            ref={(el) => {
              outRef = el
            }}
            disabled={!active}
            className="input-field w-36"
          />
        </div>
        <div>
          <span className="label-text mb-1 block">Break in</span>
          <input
            type="time"
            ref={(el) => {
              inRef = el
            }}
            disabled={!active}
            className="input-field w-36"
          />
        </div>
        <button type="submit" disabled={!active} className="btn-primary mt-1">
          Add session
        </button>
      </form>

      <div className="mt-4 space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>Sessions logged</span>
          <span className="font-medium text-slate-700 dark:text-slate-200">
            Total: {formatMinutesHM(totalMinutes)}
          </span>
        </div>
        {sessions.length === 0 ? (
          <p className="text-xs text-slate-400">
            No break sessions yet. Add a coffee or lunch break above.
          </p>
        ) : (
          <div className="max-h-48 overflow-y-auto pr-1 scroll-area">
            <ul className="space-y-1 text-xs">
              {sessions.map((s, index) => {
                const duration = diffMinutes(s.outTime, s.inTime)
                return (
                  <li
                    key={s.id}
                    className="flex flex-col gap-1 rounded-lg bg-slate-50 px-3 py-1.5 text-slate-700 dark:bg-slate-900/70 dark:text-slate-100 sm:flex-row sm:items-center sm:justify-between sm:gap-3"
                  >
                    <div className="flex items-center gap-2">
                      <span className="chip">Break {index + 1}</span>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400">
                        {formatTime12(s.outTime)} → {formatTime12(s.inTime)}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-medium text-slate-800 dark:text-slate-100">
                        {duration} min
                      </span>
                      <input
                        type="time"
                        value={s.outTime}
                        disabled={!active}
                        onChange={(e) => onUpdate(s.id, { outTime: e.target.value })}
                        className="input-field w-24 text-xs"
                      />
                      <input
                        type="time"
                        value={s.inTime}
                        disabled={!active}
                        onChange={(e) => onUpdate(s.id, { inTime: e.target.value })}
                        className="input-field w-24 text-xs"
                      />
                    <button
                      type="button"
                      disabled={!active}
                      onClick={() => onRemove(s.id)}
                      className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600 shadow-sm hover:bg-red-100 disabled:opacity-60 dark:bg-red-500/10 dark:text-red-300 dark:hover:bg-red-500/20"
                    >
                      Delete
                    </button>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}


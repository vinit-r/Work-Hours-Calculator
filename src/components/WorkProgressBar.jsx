export default function WorkProgressBar({ progressPercent, workedLabel }) {
  const value = Number.isFinite(progressPercent) ? Math.min(Math.max(progressPercent, 0), 120) : 0

  return (
    <div className="card p-4 sm:p-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="label-text">Work progress</p>
          <p className="field-description">
            Visual indicator of how much of today&apos;s effective work is complete.
          </p>
        </div>
        <span className="chip text-[11px] font-semibold flex-shrink-0">
          {Math.round(Math.min(value, 100))}% complete
        </span>
      </div>

      <div className="mt-4 space-y-2">
        <div className="h-3 w-full overflow-hidden rounded-full bg-slate-200/80 dark:bg-slate-800/80">
          <div
            className="h-full rounded-full bg-gradient-to-r from-brand-500 via-emerald-400 to-brand-400 shadow-sm transition-all"
            style={{ width: `${Math.min(value, 100)}%` }}
          />
        </div>
        <p className="text-xs font-medium text-slate-600 dark:text-slate-300">
          Worked {workedLabel}
        </p>
      </div>
    </div>
  )
}


export default function LeaveTimeCard({ leaveTimeLabel }) {
  return (
    <div className="card-soft p-4 sm:p-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="label-text">Expected leave time</p>
          <p className="field-description">
            Based on your entry, required hours, and total breaks.
          </p>
        </div>
        <div className="rounded-2xl bg-emerald-50 px-4 py-2 text-right text-emerald-700 shadow-sm dark:bg-emerald-500/10 dark:text-emerald-200">
          <p className="text-[11px] font-medium uppercase tracking-wide">
            You can leave at
          </p>
          <p className="text-xl font-semibold tracking-tight sm:text-2xl">
            {leaveTimeLabel}
          </p>
        </div>
      </div>
    </div>
  )
}


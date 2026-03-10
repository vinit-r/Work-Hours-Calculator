export default function CountdownTimer({ remainingLabel }) {
  return (
    <div className="card-soft p-4 sm:p-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="label-text">Remaining time</p>
          <p className="field-description">
            Live countdown until you&apos;re expected to leave.
          </p>
        </div>
        <div className="rounded-2xl bg-slate-900 px-4 py-2 text-right text-slate-50 shadow-md dark:bg-slate-100 dark:text-slate-900">
          <p className="text-[11px] font-medium uppercase tracking-wide">
            Time left
          </p>
          <p className="font-mono text-xl font-semibold tracking-tight sm:text-2xl">
            {remainingLabel}
          </p>
        </div>
      </div>
    </div>
  )
}


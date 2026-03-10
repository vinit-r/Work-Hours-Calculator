import { formatMinutesHM, formatTime12, diffMinutes } from '../utils/timeUtils.js'

export default function BreakHistory({
  manualBreaks,
  sessionBreaks,
  activeMode,
  totalManual,
  totalSessions,
}) {
  const isManual = activeMode === 'manual'
  const totalActive = isManual ? totalManual : totalSessions

  return (
    <div className="card p-4 sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <label className="label-text">Break summary</label>
          <p className="field-description">
            Quick overview of all breaks counted towards your working day.
          </p>
        </div>
        <span className="chip flex-shrink-0">
          Total break · {formatMinutesHM(totalActive)}
        </span>
      </div>

      <div className="mt-4 space-y-4 text-sm">
        <section>
          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Manual breaks
          </p>
          {manualBreaks.length === 0 ? (
            <p className="text-xs text-slate-400">No manual break entries.</p>
          ) : (
            <ul className="space-y-1 text-xs">
              {manualBreaks.map((b, index) => (
                <li
                  key={b.id}
                  className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-1.5 text-slate-700 dark:bg-slate-900/70 dark:text-slate-100"
                >
                  <span>
                    Break {index + 1} →{' '}
                    <span className="font-medium">{b.minutes} min</span>
                  </span>
                </li>
              ))}
              <li className="mt-1 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                <span>Subtotal</span>
                <span className="font-medium">{formatMinutesHM(totalManual)}</span>
              </li>
            </ul>
          )}
        </section>

        <section>
          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            In / out sessions
          </p>
          {sessionBreaks.length === 0 ? (
            <p className="text-xs text-slate-400">No session-based breaks.</p>
          ) : (
            <ul className="space-y-1 text-xs">
              {sessionBreaks.map((s, index) => {
                const minutes = s.minutes ?? diffMinutes(s.outTime, s.inTime)
                return (
                  <li
                    key={s.id}
                    className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-1.5 text-slate-700 dark:bg-slate-900/70 dark:text-slate-100"
                  >
                    <span>
                      Break {index + 1} →{' '}
                      <span className="font-medium">{minutes} min</span>
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">
                      {formatTime12(s.outTime)} → {formatTime12(s.inTime)}
                    </span>
                  </li>
                )
              })}
              <li className="mt-1 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                <span>Subtotal</span>
                <span className="font-medium">
                  {formatMinutesHM(totalSessions)}
                </span>
              </li>
            </ul>
          )}
        </section>
      </div>
    </div>
  )
}


import EntryTimePicker from '../components/EntryTimePicker.jsx'
import EffectiveHoursSelector from '../components/EffectiveHoursSelector.jsx'
import BreakManualInput from '../components/BreakManualInput.jsx'
import BreakInOutInput from '../components/BreakInOutInput.jsx'
import BreakHistory from '../components/BreakHistory.jsx'
import LeaveTimeCard from '../components/LeaveTimeCard.jsx'
import CountdownTimer from '../components/CountdownTimer.jsx'
import WorkProgressBar from '../components/WorkProgressBar.jsx'
import { useWorkCalculator } from '../hooks/useWorkCalculator.js'

export default function Home() {
  const { state, calculations, ...actions } = useWorkCalculator()

  const handleReset = () => {
    actions.resetAll()
  }

  return (
    <section className="space-y-5">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-50 sm:text-2xl">
            Work Hours Calculator
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Plan your day, track breaks, and instantly see when you can leave the office.
          </p>
        </div>
        <button
          type="button"
          onClick={handleReset}
          className="self-start rounded-full bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 shadow-sm hover:bg-red-100 dark:bg-red-500/10 dark:text-red-300 dark:hover:bg-red-500/20"
        >
          Reset today&apos;s plan
        </button>
      </header>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.4fr)]">
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <EntryTimePicker entryTime={state.entryTime} onChange={actions.setEntryTime} />
            <EffectiveHoursSelector
              hours={state.effectiveHours}
              minutes={state.effectiveMinutes}
              onChange={actions.setEffectiveHours}
            />
          </div>

          <div className="space-y-3">
            <div className="inline-flex rounded-xl bg-slate-100 p-0.5 text-xs font-semibold text-slate-500 dark:bg-slate-800 dark:text-slate-400">
              <button
                type="button"
                onClick={() => actions.setActiveBreakMode('manual')}
                className={`rounded-lg px-3 py-1.5 transition-colors ${
                  state.activeBreakMode === 'manual'
                    ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-900 dark:text-slate-50'
                    : 'hover:text-slate-900 dark:hover:text-slate-50'
                }`}
              >
                Manual break minutes
              </button>
              <button
                type="button"
                onClick={() => actions.setActiveBreakMode('sessions')}
                className={`rounded-lg px-3 py-1.5 transition-colors ${
                  state.activeBreakMode === 'sessions'
                    ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-900 dark:text-slate-50'
                    : 'hover:text-slate-900 dark:hover:text-slate-50'
                }`}
              >
                In / out sessions
              </button>
            </div>

            {state.activeBreakMode === 'manual' ? (
              <BreakManualInput
                active
                breaks={state.manualBreaks}
                onAdd={actions.addManualBreak}
                onUpdate={actions.updateManualBreak}
                onRemove={actions.removeManualBreak}
                totalMinutes={calculations.totalManualBreakMinutes}
                onActivate={() => actions.setActiveBreakMode('manual')}
              />
            ) : (
              <BreakInOutInput
                active
                sessions={state.breakSessions}
                onAdd={actions.addBreakSession}
                onUpdate={actions.updateBreakSession}
                onRemove={actions.removeBreakSession}
                totalMinutes={calculations.totalSessionBreakMinutes}
                onActivate={() => actions.setActiveBreakMode('sessions')}
              />
            )}
          </div>
        </div>

        <div className="space-y-4">
          <LeaveTimeCard leaveTimeLabel={calculations.leaveTimeLabel} />
          <CountdownTimer remainingLabel={calculations.remainingLabel} />
          <WorkProgressBar
            progressPercent={calculations.progressPercent}
            workedLabel={calculations.workedLabel}
          />
          <BreakHistory
            manualBreaks={state.manualBreaks}
            sessionBreaks={calculations.sessionBreaks}
            activeMode={state.activeBreakMode}
            totalManual={calculations.totalManualBreakMinutes}
            totalSessions={calculations.totalSessionBreakMinutes}
          />
        </div>
      </div>
    </section>
  )
}


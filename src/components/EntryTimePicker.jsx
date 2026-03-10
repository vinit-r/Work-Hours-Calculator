import { useEffect, useState } from 'react'
import { to12Hour, from12Hour } from '../utils/timeUtils.js'

export default function EntryTimePicker({ entryTime, onChange }) {
  const derived = to12Hour(entryTime)
  const [hourText, setHourText] = useState('')
  const [minuteText, setMinuteText] = useState('')
  const [period, setPeriod] = useState(derived.period || 'AM')

  useEffect(() => {
    if (!entryTime) {
      setHourText('')
      setMinuteText('')
      setPeriod('AM')
      return
    }
    const { hour12, minute, period: p } = to12Hour(entryTime)
    setHourText(hour12.toString().padStart(2, '0'))
    setMinuteText(minute.toString().padStart(2, '0'))
    setPeriod(p)
  }, [entryTime])

  const commitTime = (hText, mText, p) => {
    const h = (hText || '').replace(/\D/g, '')
    const m = (mText || '').replace(/\D/g, '')
    if (!h && !m) {
      onChange('')
      return
    }
    const next = from12Hour({
      hour12: h || '0',
      minute: m || '0',
      period: p,
    })
    onChange(next)
  }

  const handleHourChange = (e) => {
    const v = e.target.value.replace(/\D/g, '')
    if (v === '' || (Number(v) >= 1 && Number(v) <= 12)) {
      setHourText(v)
    }
  }

  const handleMinuteChange = (e) => {
    const v = e.target.value.replace(/\D/g, '')
    if (v === '' || (Number(v) >= 0 && Number(v) <= 59)) {
      setMinuteText(v)
    }
  }

  const handleHourBlur = () => {
    commitTime(hourText, minuteText, period)
  }

  const handleMinuteBlur = () => {
    commitTime(hourText, minuteText, period)
  }

  const handlePeriodChange = (nextPeriod) => {
    setPeriod(nextPeriod)
    commitTime(hourText, minuteText, nextPeriod)
  }

  return (
    <div className="card p-4 sm:p-5">
      <div className="flex items-center justify-between gap-2">
        <div>
          <label className="label-text">Entry time</label>
          <p className="field-description">When you started working today</p>
        </div>
      </div>

      <div className="mt-4 flex flex-row items-center gap-3">
        <div>
          <span className="label-text mb-1 block">Hour</span>
          <input
            type="text"
            min={1}
            max={12}
            inputMode="numeric"
            pattern="[0-9]*"
            value={hourText}
            placeholder="00"
            onChange={handleHourChange}
            onBlur={handleHourBlur}
            className="input-field w-20 text-center"
          />
        </div>
        <div>
          <span className="label-text mb-1 block">Minute</span>
          <input
            type="text"
            min={0}
            max={59}
            inputMode="numeric"
            pattern="[0-9]*"
            value={minuteText}
            placeholder="00"
            onChange={handleMinuteChange}
            onBlur={handleMinuteBlur}
            className="input-field w-24 text-center"
          />
        </div>
        <div className="flex flex-col gap-1 ">
          <span className="label-text mb-1 block">Period</span>
          <div className="inline-flex rounded-xl bg-slate-100 px-0.5 py-1 dark:bg-slate-800">
            <button
              type="button"
              onClick={() => handlePeriodChange('AM')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                period === 'AM'
                  ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-900 dark:text-slate-50'
                  : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-50'
              }`}
            >
              AM
            </button>
            <button
              type="button"
              onClick={() => handlePeriodChange('PM')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                period === 'PM'
                  ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-900 dark:text-slate-50'
                  : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-50'
              }`}
            >
              PM
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}


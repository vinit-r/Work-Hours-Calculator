export default function EffectiveHoursSelector({
  hours,
  minutes,
  onChange,
}) {
  const handleHoursChange = (e) => {
    const v = e.target.value.replace(/\D/g, '')
    if (v === '' || (Number(v) >= 0 && Number(v) <= 12)) {
      onChange(v, minutes)
    }
  }
  
  const handleMinutesChange = (e) => {
    const v = e.target.value.replace(/\D/g, '')
    if (v === '' || (Number(v) >= 0 && Number(v) <= 59)) {
      onChange(hours, v)
    }
  }

  return (
    <div className="card p-4 sm:p-5">
      <div className="flex items-center justify-between gap-2">
        <div>
          <label className="label-text">Required effective hours</label>
          <p className="field-description">
            You&apos;re expected to work excluding breaks
          </p>
        </div>
      </div>
      <div className="mt-4 flex flex-row items-center gap-3">
        <div>
          <span className="label-text mb-1 block">Hours</span>
          <input
            type="text"
            min={0}
            max={16}
            inputMode="numeric"
            pattern="[0-9]*"
            value={hours.toString().padStart(2, '0')}
            placeholder="00"
            onChange={handleHoursChange}
            className="input-field w-24 text-center"
          />
        </div>
        <div>
          <span className="label-text mb-1 block">Minutes</span>
          <input
            type="text"
            min={0}
            max={59}
            inputMode="numeric"
            pattern="[0-9]*"
            value={minutes.toString().padStart(2, '0')}
            placeholder="00"
            onChange={handleMinutesChange}
            className="input-field w-24 text-center"
          />
        </div>
      </div>
    </div>
  )
}


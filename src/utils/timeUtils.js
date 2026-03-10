import dayjs from 'dayjs'

export function parse24Hour(time) {
  if (!time) return null
  const [h, m] = time.split(':').map((v) => Number.parseInt(v || '0', 10))
  const hour = Number.isNaN(h) ? 9 : Math.min(Math.max(h, 0), 23)
  const minute = Number.isNaN(m) ? 0 : Math.min(Math.max(m, 0), 59)
  return { hour, minute }
}

export function to12Hour(time) {
  if (!time) {
    return { hour12: '', minute: '', period: 'AM' }
  }
  const { hour, minute } = parse24Hour(time)
  const period = hour >= 12 ? 'PM' : 'AM'
  const hour12 = ((hour + 11) % 12) + 1
  return { hour12, minute, period }
}

export function from12Hour({ hour12, minute, period }) {
  const h = Math.min(Math.max(Number(hour12) || 0, 1), 12)
  const m = Math.min(Math.max(Number(minute) || 0, 0), 59)
  let hour = h % 12
  if (period === 'PM') hour += 12
  const hh = hour.toString().padStart(2, '0')
  const mm = m.toString().padStart(2, '0')
  return `${hh}:${mm}`
}

export function formatTime12(time) {
  if (!time) return '--:--'
  const { hour12, minute, period } = to12Hour(time)
  const mm = minute.toString().padStart(2, '0')
  return `${hour12.toString().padStart(2, '0')}:${mm} ${period}`
}

export function diffMinutes(startTime, endTime) {
  const start = parse24Hour(startTime)
  const end = parse24Hour(endTime)
  let startMinutes = start.hour * 60 + start.minute
  let endMinutes = end.hour * 60 + end.minute

  if (endMinutes < startMinutes) {
    endMinutes += 24 * 60
  }

  return Math.max(endMinutes - startMinutes, 0)
}

export function addMinutesToToday(time, minutes) {
  const parsed = parse24Hour(time)
  if (!parsed) return null
  const { hour, minute } = parsed
  const base = dayjs().hour(hour).minute(minute).second(0).millisecond(0)
  return base.add(minutes, 'minute')
}

export function minutesToHoursMinutes(totalMinutes) {
  const safe = Math.max(Math.round(totalMinutes || 0), 0)
  const hours = Math.floor(safe / 60)
  const minutes = safe % 60
  return { hours, minutes }
}

export function formatMinutesHM(totalMinutes) {
  const { hours, minutes } = minutesToHoursMinutes(totalMinutes)
  if (!hours && !minutes) return '0m'
  const parts = []
  if (hours) parts.push(`${hours}h`)
  if (minutes) parts.push(`${minutes}m`)
  return parts.join(' ')
}

export function formatCountdown(ms) {
  const totalSeconds = Math.max(Math.floor((ms || 0) / 1000), 0)
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  const pad = (v) => v.toString().padStart(2, '0')
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
}

export function isTimeOnOrAfter(a, b) {
  const ta = parse24Hour(a)
  const tb = parse24Hour(b)
  const ma = ta.hour * 60 + ta.minute
  const mb = tb.hour * 60 + tb.minute
  return ma >= mb
}


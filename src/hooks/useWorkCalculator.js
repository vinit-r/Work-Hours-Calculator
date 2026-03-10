import { useEffect, useMemo, useState } from 'react'
import dayjs from 'dayjs'
import {
  addMinutesToToday,
  diffMinutes,
  formatTime12,
  formatMinutesHM,
  formatCountdown,
  isTimeOnOrAfter,
} from '../utils/timeUtils.js'
import { loadItem, saveItem, removeItem } from '../store/localStorage.js'
import { useToast } from '../components/ToastProvider.jsx'

const STATE_KEY = 'whc_state_v1'

const defaultState = {
  entryTime: '',
  effectiveHours: 0,
  effectiveMinutes: 0,
  activeBreakMode: 'manual', // 'manual' | 'sessions'
  manualBreaks: [],
  breakSessions: [],
  date: dayjs().format('YYYY-MM-DD'),
}

let idCounter = 1
const createId = () => `${Date.now()}-${idCounter++}`

export function useWorkCalculator() {
  const { showToast } = useToast()
  const [state, setState] = useState(() => {
    const stored = loadItem(STATE_KEY, null)
    if (!stored) return defaultState
    const today = dayjs().format('YYYY-MM-DD')
    if (!stored.date || stored.date !== today) {
      return defaultState
    }
    return {
      ...defaultState,
      ...stored,
      manualBreaks: stored.manualBreaks || [],
      breakSessions: stored.breakSessions || [],
      date: today,
    }
  })

  const [now, setNow] = useState(() => dayjs())

  useEffect(() => {
    const id = setInterval(() => setNow(dayjs()), 1000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    saveItem(STATE_KEY, state)
  }, [state])

  const setEntryTime = (time24) => {
    setState((prev) => ({ ...prev, entryTime: time24 }))
  }

  const setEffectiveHours = (hours, minutes) => {
    const safeH = Math.max(Number.parseInt(hours || '0', 10), 0)
    const safeM = Math.max(Number.parseInt(minutes || '0', 10), 0)
    setState((prev) => ({
      ...prev,
      effectiveHours: safeH,
      effectiveMinutes: safeM,
    }))
  }

  const setActiveBreakMode = (mode) => {
    setState((prev) => ({ ...prev, activeBreakMode: mode }))
  }

  const addManualBreak = (minutes) => {
    const m = Math.max(Number.parseInt(minutes || '0', 10), 0)
    if (!m) return
    setState((prev) => ({
      ...prev,
      manualBreaks: [...prev.manualBreaks, { id: createId(), minutes: m }],
    }))
  }

  const updateManualBreak = (id, minutes) => {
    const m = Math.max(Number.parseInt(minutes || '0', 10), 0)
    setState((prev) => ({
      ...prev,
      manualBreaks: prev.manualBreaks.map((b) => (b.id === id ? { ...b, minutes: m } : b)),
    }))
  }

  const removeManualBreak = (id) => {
    setState((prev) => ({
      ...prev,
      manualBreaks: prev.manualBreaks.filter((b) => b.id !== id),
    }))
  }

  const addBreakSession = (outTime, inTime) => {
    if (!outTime || !inTime) return
    if (!isTimeOnOrAfter(outTime, state.entryTime)) {
      showToast('Break start time must be on or after your entry time.')
      return
    }
    setState((prev) => ({
      ...prev,
      breakSessions: [...prev.breakSessions, { id: createId(), outTime, inTime }],
    }))
  }

  const updateBreakSession = (id, patch) => {
    setState((prev) => {
      const nextSessions = prev.breakSessions.map((s) => {
        if (s.id !== id) return s
        const candidate = { ...s, ...patch }
        if (!isTimeOnOrAfter(candidate.outTime, prev.entryTime)) {
          showToast('Break start time must be on or after your entry time.')
          return s
        }
        return candidate
      })
      return {
        ...prev,
        breakSessions: nextSessions,
      }
    })
  }

  const removeBreakSession = (id) => {
    setState((prev) => ({
      ...prev,
      breakSessions: prev.breakSessions.filter((s) => s.id !== id),
    }))
  }

  const resetAll = () => {
    removeItem(STATE_KEY)
    setState({
      ...defaultState,
      date: dayjs().format('YYYY-MM-DD'),
    })
  }

  const calculations = useMemo(() => {
    const effectiveTotalMinutes = state.effectiveHours * 60 + state.effectiveMinutes

    const totalManualBreakMinutes = state.manualBreaks.reduce((sum, b) => sum + (b.minutes || 0), 0)

    const sessionBreaks = state.breakSessions.map((s) => ({
      ...s,
      minutes: diffMinutes(s.outTime, s.inTime),
    }))

    const totalSessionBreakMinutes = sessionBreaks.reduce((sum, s) => sum + (s.minutes || 0), 0)

    const totalBreakMinutes =
      state.activeBreakMode === 'sessions' ? totalSessionBreakMinutes : totalManualBreakMinutes

    const totalPresenceMinutes = effectiveTotalMinutes + totalBreakMinutes

    const entryAt = state.entryTime ? addMinutesToToday(state.entryTime, 0) : null
    const leaveAt = entryAt ? entryAt.add(totalPresenceMinutes, 'minute') : null
    

    const remainingMs = leaveAt ? Math.max(leaveAt.diff(now), 0) : 0


    const elapsedPresenceMinutes = entryAt
  ? Math.min(Math.max(now.diff(entryAt, 'minute'), 0), totalPresenceMinutes)
  : 0


    const progressRatio =
      totalPresenceMinutes > 0 ? Math.min(elapsedPresenceMinutes / totalPresenceMinutes, 1) : 0

    const workedEffectiveMinutes = Math.round(progressRatio * effectiveTotalMinutes)

    const workedLabel = `${formatMinutesHM(workedEffectiveMinutes)} of ${formatMinutesHM(
      effectiveTotalMinutes,
    )}`

    const remainingLabel = formatCountdown(remainingMs)

    const leaveTimeLabel = formatTime12(state.entryTime && leaveAt.format('HH:mm'))

    return {
      effectiveTotalMinutes,
      totalManualBreakMinutes,
      totalSessionBreakMinutes,
      totalBreakMinutes,
      totalPresenceMinutes,
      leaveAt,
      leaveTimeLabel,
      remainingMs,
      remainingLabel,
      progressPercent: Math.round(progressRatio * 100),
      workedEffectiveMinutes,
      workedLabel,
      sessionBreaks,
    }
  }, [now, state])

  return {
    state,
    setEntryTime,
    setEffectiveHours,
    setActiveBreakMode,
    addManualBreak,
    updateManualBreak,
    removeManualBreak,
    addBreakSession,
    updateBreakSession,
    removeBreakSession,
    resetAll,
    calculations,
  }
}


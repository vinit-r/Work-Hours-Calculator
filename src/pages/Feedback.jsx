import { useEffect, useState } from 'react'
import { loadItem, saveItem } from '../store/localStorage.js'

const FEEDBACK_KEY = 'whc_feedback_v1'

export default function Feedback() {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [feedbacks, setFeedbacks] = useState([])
  const [status, setStatus] = useState(null)

  useEffect(() => {
    const stored = loadItem(FEEDBACK_KEY, [])
    setFeedbacks(stored)
  }, [])

  const persist = (items) => {
    setFeedbacks(items)
    saveItem(FEEDBACK_KEY, items)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!message.trim()) {
      setStatus('Please share a short message before submitting.')
      return
    }
    const entry = {
      id: `${Date.now()}`,
      name: name.trim() || 'Anonymous',
      message: message.trim(),
      createdAt: new Date().toISOString(),
    }
    const next = [entry, ...feedbacks].slice(0, 20)
    persist(next)
    setName('')
    setMessage('')
    setStatus('Thank you for the feedback — it has been saved on this device.')
  }

  return (
    <section className="grid gap-5 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
      <div className="card p-5 sm:p-6">
        <h1 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-slate-50 sm:text-xl">
          Feedback
        </h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          Help shape the future of WorkHours. Your comments are stored locally in your browser and
          never leave this device.
        </p>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="label-text" htmlFor="name">
              Name (optional)
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-field mt-1"
              placeholder="How should we refer to you?"
            />
          </div>

          <div>
            <label className="label-text" htmlFor="message">
              Feedback message
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className="input-field mt-1 resize-none"
              placeholder="What works well? What could be better?"
            />
          </div>

          <button type="submit" className="btn-primary">
            Submit feedback
          </button>

          {status && (
            <p className="text-xs text-slate-500 dark:text-slate-400" aria-live="polite">
              {status}
            </p>
          )}
        </form>
      </div>

      <div className="card p-5 sm:p-6">
        <h2 className="text-sm font-semibold tracking-tight text-slate-900 dark:text-slate-50">
          Saved feedback (this device only)
        </h2>
        {feedbacks.length === 0 ? (
          <p className="mt-2 text-xs text-slate-400">
            You haven&apos;t left any feedback yet. Once you submit, it will show up here.
          </p>
        ) : (
          <ul className="mt-3 space-y-3 text-sm">
            {feedbacks.map((item) => (
              <li
                key={item.id}
                className="rounded-xl bg-slate-50 px-3 py-2 text-slate-700 dark:bg-slate-900/70 dark:text-slate-100"
              >
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  {item.name}{' '}
                  <span className="ml-1 text-[10px]">
                    {new Date(item.createdAt).toLocaleString()}
                  </span>
                </p>
                <p className="mt-1 text-xs leading-relaxed">{item.message}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}


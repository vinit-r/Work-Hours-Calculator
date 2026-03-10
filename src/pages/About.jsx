export default function About() {
  return (
    <section className="card p-5 sm:p-6">
      <h1 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-slate-50 sm:text-xl">
        About WorkHours
      </h1>
      <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
        WorkHours is a lightweight companion for office workers who want clarity about their
        working day. It lets you set your required effective hours, log breaks in two different
        ways, and instantly see when you&apos;re expected to leave.
      </p>
      <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
        Under the hood, the app uses Day.js for precise time calculations, React hooks for
        responsive state management, and local storage so your plan survives page refreshes. The
        goal is to stay out of your way while giving you a trustworthy &quot;when can I go
        home?&quot; answer at a glance.
      </p>
      <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
        This is not a time tracker or surveillance tool. It&apos;s built for individuals and
        teams who value transparency, healthy breaks, and predictable workdays.
      </p>
    </section>
  )
}


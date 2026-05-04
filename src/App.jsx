import { useState, useEffect, useCallback } from "react"
import { Menu, Zap, Activity, Globe, ShoppingCart, AlertTriangle, RefreshCcw, RotateCcw } from "lucide-react"
import { API_SECTIONS, BASE_URL } from "@/data/api-docs"
import { Sidebar } from "@/components/Sidebar"
import { EndpointCard } from "@/components/EndpointCard"
import { useTheme } from "@/components/theme-provider.jsx"

function ThemeToggleMobile() {
  const { theme, setTheme } = useTheme()
  function cycle() {
    setTheme(theme === "light" ? "dark" : theme === "dark" ? "system" : "light")
  }
  return (
    <button
      onClick={cycle}
      className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
      aria-label="Toggle theme"
    >
      <span className="text-xs font-medium">
        {theme === "light" ? "☀️" : theme === "dark" ? "🌙" : "⚙️"}
      </span>
    </button>
  )
}

export function App() {
  const initialId = window.location.hash.slice(1) || "get-root"
  const [activeId, setActiveId] = useState(initialId)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Scroll-spy: pick the element whose top most recently crossed the reading line
  useEffect(() => {
    const READING_LINE = 200 // px from viewport top

    const getActiveId = () => {
      // If questions section is visible in the viewport, activate it
      const questionsEl = document.getElementById("questions")
      if (questionsEl) {
        const rect = questionsEl.getBoundingClientRect()
        if (rect.top < window.innerHeight * 0.7 && rect.bottom > 0) {
          return "questions"
        }
      }

      const elements = document.querySelectorAll("[data-endpoint-id]")
      let best = null
      let bestTop = -Infinity
      elements.forEach((el) => {
        const top = el.getBoundingClientRect().top
        if (top <= READING_LINE && top > bestTop) {
          bestTop = top
          best = el
        }
      })
      return best?.dataset?.endpointId ?? null
    }

    let rafId = null
    const handleScroll = () => {
      if (rafId) return
      rafId = requestAnimationFrame(() => {
        rafId = null
        const id = getActiveId()
        if (id) {
          setActiveId(id)
          history.replaceState(null, "", `#${id}`)
        }
      })
    }

    handleScroll() // set initial active on mount
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  const handleNavClick = useCallback((id) => {
    setMobileMenuOpen(false)
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }, [])

  return (
    <div className="docs-layout">
      {/* Mobile top bar */}
      <header className="docs-topbar">
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          aria-label="Open navigation"
        >
          <Menu size={18} />
        </button>
        <span className="font-semibold text-foreground">Talenta API</span>
        <div className="ml-auto">
          <ThemeToggleMobile />
        </div>
      </header>

      {/* Sidebar */}
      <Sidebar
        sections={API_SECTIONS}
        activeId={activeId}
        onNavClick={handleNavClick}
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      {/* Main content */}
      <main className="docs-main">
        <div className="docs-content">

          {/* ── Hero ──────────────────────────────────────────── */}
          <div className="mb-14 pb-10 border-b border-border">
            {/* Version pill */}
            <div className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1">
              <Zap size={11} className="text-primary" />
              <span className="text-[11px] font-semibold text-primary tracking-wide">v1 · Public API</span>
            </div>

            <h1 className="mb-3 text-[2rem] font-bold tracking-tight text-foreground leading-tight">
              Talenta API Reference
            </h1>
            <p className="mb-8 text-[15px] leading-relaxed text-muted-foreground">
              A read-mostly REST API for client websites. Most endpoints identify the caller
              automatically by their <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[13px] text-foreground">Origin</code> header — no API key needed for public reads.
            </p>

            {/* Info cards */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 mb-10">
              <div className="rounded-lg border border-border bg-card px-4 py-3.5">
                <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Base URL</p>
                <code className="block font-mono text-[12px] text-foreground break-all leading-relaxed">{BASE_URL}</code>
              </div>
              <div className="rounded-lg border border-border bg-card px-4 py-3.5">
                <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Format</p>
                <code className="block font-mono text-[12px] text-foreground">JSON · UTF-8</code>
              </div>
              <div className="rounded-lg border border-border bg-card px-4 py-3.5">
                <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Versioning</p>
                <code className="block font-mono text-[12px] text-foreground">v1 (stable)</code>
              </div>
            </div>

            {/* HTTP Status Codes table */}
            <div className="rounded-lg border border-border bg-card overflow-hidden">
              <div className="border-b border-border bg-muted/40 px-5 py-2.5 flex items-center gap-2">
                <AlertTriangle size={13} className="text-muted-foreground" />
                <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">HTTP Status Codes</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="px-5 py-2.5 text-left text-[10px] font-semibold uppercase tracking-widest text-muted-foreground w-20">Status</th>
                      <th className="px-5 py-2.5 text-left text-[10px] font-semibold uppercase tracking-widest text-muted-foreground w-40">Error</th>
                      <th className="px-5 py-2.5 text-left text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Message</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { status: "200", label: "OK",                    color: "2xx", msg: "Request succeeded. Response body contains the result." },
                      { status: "400", label: "Bad Request",            color: "4xx", msg: "The request was invalid, often due to a missing required parameter." },
                      { status: "401", label: "Unauthorized",           color: "4xx", msg: "Your request was not authenticated correctly." },
                      { status: "403", label: "Forbidden",              color: "4xx", msg: "You do not have permission to perform the request." },
                      { status: "404", label: "Not Found",              color: "4xx", msg: "The requested resource does not exist." },
                      { status: "422", label: "Validation Error",       color: "4xx", msg: "A validation error occurred — check the field-level errors in the response body." },
                      { status: "429", label: "Too Many Requests",      color: "4xx", msg: "Too many requests hit the API too quickly. Back off and retry with exponential backoff." },
                      { status: "50X", label: "Internal Server Error",  color: "5xx", msg: "An error occurred on the server. Retry after a short delay; contact support if it persists." },
                    ].map(({ status, label, color, msg }, i, arr) => (
                      <tr key={status} className={`hover:bg-muted/30 transition-colors ${i < arr.length - 1 ? "border-b border-border/50" : ""}`}>
                        <td className="px-5 py-3"><span className={`status-badge status-${color}`}>{status}</span></td>
                        <td className="px-5 py-3 text-[13px] font-medium text-foreground">{label}</td>
                        <td className="px-5 py-3 text-[13px] text-muted-foreground leading-relaxed">{msg}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* ── Sections ──────────────────────────────────────── */}
          {API_SECTIONS.map((section) => {
            const SectionIcon = { Activity, Globe, ShoppingCart, RefreshCcw, RotateCcw }[section.icon]
            return (
              <section key={section.id} className="mb-16">
                {/* Section heading */}
                <div
                  id={section.id}
                  className="mb-8 flex items-center gap-2 border-b border-border pb-3"
                >
                  {SectionIcon && <SectionIcon size={14} className="text-muted-foreground" />}
                  <h2 className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                    {section.title}
                  </h2>
                </div>

                {/* Endpoint cards */}
                {section.endpoints.map((endpoint, i) => (
                  <div key={endpoint.id}>
                    <div id={endpoint.id} data-endpoint-id={endpoint.id}>
                      <EndpointCard endpoint={endpoint} />
                    </div>
                    {i < section.endpoints.length - 1 && (
                      <hr className="my-12 border-border" />
                    )}
                  </div>
                ))}
              </section>
            )
          })}

          {/* ── Questions (anchor for sidebar link) ───────────── */}
          <section className="mb-16" id="questions" data-endpoint-id="questions">
            <div className="flex items-center gap-2 border-b border-border pb-3 mb-8">
              <span className="text-[10px] font-bold">?</span>
              <h2 className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Support</h2>
            </div>
            <div className="rounded-xl border border-border bg-card p-8">
              <h3 className="mb-2 text-lg font-semibold text-foreground">Have a question about the API?</h3>
              <p className="mb-6 max-w-xl text-[14px] leading-relaxed text-muted-foreground">
                If you run into issues integrating with the Talenta API — unexpected responses,
                authentication errors, or anything unclear in this documentation — reach out and
                we'll help you get unblocked.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg border border-border bg-muted/30 p-4">
                  <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Email Support</p>
                  <a href="mailto:support@athivaone.com" className="block font-mono text-sm text-primary hover:underline">
                    support@athivaone.com
                  </a>
                  <p className="mt-1 text-xs text-muted-foreground">Include your client domain and request ID</p>
                </div>
                <div className="rounded-lg border border-border bg-muted/30 p-4">
                  <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Base URL</p>
                  <code className="block break-all font-mono text-sm text-foreground">{BASE_URL}</code>
                  <p className="mt-1 text-xs text-muted-foreground">All endpoints are relative to this URL</p>
                </div>
              </div>
            </div>
          </section>

        </div>
      </main>
    </div>
  )
}

export default App

import { X, Sun, Moon, Monitor, Activity, Globe, ShoppingCart, HelpCircle, RefreshCcw, RotateCcw, Clock, ChevronDown } from "lucide-react"
import { useState } from "react"
import { useTheme } from "@/components/theme-provider.jsx"
import { MethodBadge } from "@/components/MethodBadge"
import { BASE_URL } from "@/data/api-docs"
import { cn } from "@/lib/utils"

const SECTION_ICONS = { Activity, Globe, ShoppingCart, RefreshCcw, RotateCcw, Clock }

function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const options = [
    { value: "light", icon: Sun, label: "Light" },
    { value: "dark", icon: Moon, label: "Dark" },
    { value: "system", icon: Monitor, label: "System" },
  ]
  return (
    <div className="inline-flex items-center rounded-lg border border-border bg-muted p-0.5">
      {options.map(({ value, icon: Icon, label }) => (
        <button
          key={value}
          onClick={() => setTheme(value)}
          title={`${label} — Ctrl+\\ to cycle`}
          aria-label={`Switch to ${label} mode`}
          className={cn(
            "flex h-7 w-7 items-center justify-center rounded-md transition-all duration-150",
            theme === value
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <Icon size={13} />
        </button>
      ))}
    </div>
  )
}

function SidebarContent({ sections, activeId, onNavClick }) {
  const [openSections, setOpenSections] = useState({})

  // Auto-open section containing the active endpoint
  const activeSectionId = sections.find((s) =>
    s.endpoints.some((e) => e.id === activeId)
  )?.id

  function handleSectionClick(section) {
    const isCurrentlyOpen = openSections[section.id] ?? (section.id === activeSectionId)
    if (isCurrentlyOpen) {
      // Collapse
      setOpenSections((prev) => ({ ...prev, [section.id]: false }))
    } else {
      // Expand and navigate to first endpoint
      setOpenSections((prev) => ({ ...prev, [section.id]: true }))
      const firstEndpoint = section.endpoints[0]
      if (firstEndpoint) {
        onNavClick(firstEndpoint.id)
      }
    }
  }

  return (
    <>
      {/* Brand header */}
      <div className="flex items-center justify-between border-b border-border px-4 py-4 shrink-0">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-semibold tracking-tight text-foreground leading-none">Talenta API</span>
            <span className="rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold text-primary leading-none">v1</span>
          </div>
          <p className="mt-1 text-[11px] text-muted-foreground">API Documentation</p>
        </div>
        <ThemeToggle />
      </div>

      {/* Nav links */}
      <nav className="sidebar-nav flex-1">
        {sections.map((section) => {
          const Icon = SECTION_ICONS[section.icon]
          const isOpen = openSections[section.id] ?? (section.id === activeSectionId)
          return (
            <div key={section.id} className="mb-0.5">
              <button
                onClick={() => handleSectionClick(section)}
                className="sidebar-nav-section w-full flex items-center justify-between cursor-pointer hover:text-foreground transition-colors"
              >
                <span className="flex items-center gap-1.5">
                  {Icon && <Icon size={12} />}
                  {section.title}
                </span>
                <ChevronDown
                  size={12}
                  className={cn("shrink-0 transition-transform duration-200", isOpen && "rotate-180")}
                />
              </button>
              {isOpen && section.endpoints.map((endpoint) => {
                const isActive = activeId === endpoint.id
                return (
                  <a
                    key={endpoint.id}
                    href={`#${endpoint.id}`}
                    onClick={(e) => { e.preventDefault(); onNavClick(endpoint.id) }}
                    className={cn("sidebar-nav-item group", isActive && "active")}
                  >
                    <MethodBadge method={endpoint.method} size="xs" />
                    <span className="min-w-0 truncate">{endpoint.title}</span>
                  </a>
                )
              })}
            </div>
          )
        })}

        {/* Support / Questions */}
        <div className="mb-0.5">
          <div className="sidebar-nav-section">
            <HelpCircle size={12} />
            Support
          </div>
          <a
            href="#questions"
            onClick={(e) => { e.preventDefault(); onNavClick("questions") }}
            className={cn("sidebar-nav-item", activeId === "questions" && "active")}
          >
            <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded bg-muted text-[10px] font-bold text-muted-foreground">?</span>
            <span className="min-w-0 truncate">Questions</span>
          </a>
        </div>
      </nav>

      {/* Base URL footer */}
      <div className="shrink-0 border-t border-border px-4 py-4">
        <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Base URL</p>
        <code className="block break-all rounded-md bg-muted px-2.5 py-1.5 font-mono text-[11px] text-foreground leading-relaxed">
          {BASE_URL}
        </code>
      </div>
    </>
  )
}

export function Sidebar({ sections, activeId, onNavClick, isOpen, onClose }) {
  return (
    <>
      {/* Desktop */}
      <aside className="docs-sidebar">
        <SidebarContent sections={sections} activeId={activeId} onNavClick={onNavClick} />
      </aside>

      {/* Mobile drawer */}
      {isOpen && (
        <div className="docs-sidebar-mobile" aria-modal="true">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
          <div className={cn("docs-sidebar-mobile-panel", isOpen ? "translate-x-0" : "-translate-x-full")}>
            <div className="flex items-center justify-between border-b border-border px-4 py-3 shrink-0">
              <span className="font-semibold text-foreground">Navigation</span>
              <button onClick={onClose} className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors" aria-label="Close navigation">
                <X size={16} />
              </button>
            </div>
            <div className="flex flex-1 flex-col overflow-hidden">
              <SidebarContent sections={sections} activeId={activeId} onNavClick={onNavClick} />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

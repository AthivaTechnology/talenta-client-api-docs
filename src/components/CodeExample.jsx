import { useState } from "react"
import { Copy, Check, Info } from "lucide-react"
import { cn } from "@/lib/utils"
import { BASE_URL } from "@/data/api-docs"

function InlineText({ text }) {
  // Split on both **bold** and `code` patterns
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/)
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**"))
          return <strong key={i} className="font-semibold text-foreground">{part.slice(2, -2)}</strong>
        if (part.startsWith("`") && part.endsWith("`"))
          return <code key={i} className="rounded bg-muted px-1 py-0.5 font-mono text-[11px] text-foreground">{part.slice(1, -1)}</code>
        return part
      })}
    </>
  )
}

function colorizeJs(code) {
  const escaped = code
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")

  return escaped.replace(
    /(\/\/[^\n]*)|(\/\*[\s\S]*?\*\/)|(`(?:\\[\s\S]|[^`])*`)|('(?:\\[\s\S]|[^'])*')|("(?:\\[\s\S]|[^"])*")|(\b(?:const|let|var|async|await|function|return|if|else|for|while|of|in|new|class|import|export|from|try|catch|throw|typeof|void|null|undefined|true|false)\b)|(\b\d+(?:\.\d+)?\b)/g,
    (match, lineComment, blockComment, templateLit, singleStr, doubleStr, keyword, number) => {
      if (lineComment || blockComment) return `<span class="js-comment">${match}</span>`
      if (templateLit || singleStr || doubleStr) return `<span class="js-string">${match}</span>`
      if (keyword) return `<span class="js-keyword">${match}</span>`
      if (number) return `<span class="js-number">${match}</span>`
      return match
    }
  )
}

export function CodeExample({ examples, showOriginNote = false, originNote = null }) {
  const [active, setActive] = useState(0)
  const [copied, setCopied] = useState(false)

  if (!examples || examples.length === 0) return null

  const safeActive = active < examples.length ? active : 0
  const current = examples[safeActive]
  if (!current) return null

  const handleCopy = () => {
    navigator.clipboard.writeText(current.code).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="code-example-block">
      {/* Header bar */}
      <div className="code-example-header">
        <div className="flex items-center gap-1 flex-wrap">
          {examples.map((ex, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={cn(
                "code-example-tab",
                active === i && "active"
              )}
            >
              {ex.title}
            </button>
          ))}
        </div>
        <button
          onClick={handleCopy}
          className="code-block-copy-btn"
          title="Copy code"
          aria-label="Copy code"
        >
          {copied ? <Check size={13} /> : <Copy size={13} />}
          <span>{copied ? "Copied" : "Copy"}</span>
        </button>
      </div>

      {/* Important bullets — shown above code when present */}
      {current.noteBullets && (
        <div className="border-b border-border bg-primary/5 px-4 py-3">
          <div className="mb-2 flex items-center gap-1.5">
            <Info size={13} className="shrink-0 text-primary" />
            <span className="text-[10px] font-semibold uppercase tracking-widest text-primary">Important</span>
          </div>
          <ul className="space-y-2">
            {current.noteBullets.map((b, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full bg-primary/50" />
                <span className="text-xs leading-relaxed text-muted-foreground"><InlineText text={b} /></span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Code */}
      <pre
        className="code-example-pre"
        dangerouslySetInnerHTML={{ __html: colorizeJs(current.code) }}
      />

      {/* Per-example note — shown below code */}
      {current.note && (
        <div className="rounded-b-lg border-t border-border bg-muted/40 px-4 py-3">
          <div className="flex gap-2">
            <Info size={14} className="mt-0.5 shrink-0 text-primary" />
            <p className="text-xs leading-relaxed text-muted-foreground">{current.note}</p>
          </div>
        </div>
      )}

      {/* One-time Origin header callout — only on the first /site/* endpoint */}
      {originNote && (
        <div className="mt-3 overflow-hidden rounded-lg border border-amber-300 bg-amber-50 dark:border-amber-700 dark:bg-amber-950/40">
          <div className="flex items-center gap-2 border-b border-amber-300 bg-amber-100 px-4 py-2 dark:border-amber-700 dark:bg-amber-900/40">
            <Info size={13} className="shrink-0 text-amber-600 dark:text-amber-400" />
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400">
              Required for all /site/* endpoints
            </span>
          </div>
          <div className="px-4 py-3 text-xs leading-relaxed text-amber-900 dark:text-amber-200">
            <p className="mb-2">{originNote.text}</p>
            <div className="space-y-1">
              <p className="font-semibold">In your browser (automatic):</p>
              <code className="block rounded bg-amber-100 px-3 py-1.5 font-mono text-amber-800 dark:bg-amber-900/60 dark:text-amber-300">
                Origin: https://yourdomain.com  ← browser sends this automatically
              </code>
              <p className="mt-2 font-semibold">Curl / Postman (add manually):</p>
              <code className="block rounded bg-amber-100 px-3 py-1.5 font-mono text-amber-800 dark:bg-amber-900/60 dark:text-amber-300">
                {`curl -H "Origin: ${BASE_URL.replace('/api/v1','')}" ${BASE_URL}/site/events`}
              </code>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

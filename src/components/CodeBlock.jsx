import { useState } from "react"
import { Copy, Check } from "lucide-react"
import { cn } from "@/lib/utils"

function colorizeJson(str) {
  // Escape HTML first
  const escaped = str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")

  // Tokenize JSON in a single pass using a state machine approach
  // Order matters: keys first, then string values, then primitives
  return escaped
    .replace(
      /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
      (match) => {
        if (/^"/.test(match)) {
          if (/:$/.test(match)) {
            // Object key
            return `<span class="json-key">${match}</span>`
          }
          // String value
          return `<span class="json-string">${match}</span>`
        }
        if (/true|false/.test(match)) {
          return `<span class="json-bool">${match}</span>`
        }
        if (/null/.test(match)) {
          return `<span class="json-null">${match}</span>`
        }
        // Number
        return `<span class="json-number">${match}</span>`
      }
    )
}

export function CodeBlock({ code, language = "json", title = null }) {
  const [copied, setCopied] = useState(false)

  const rawString =
    typeof code === "object" ? JSON.stringify(code, null, 2) : String(code)

  const highlighted = language === "json" ? colorizeJson(rawString) : rawString

  function handleCopy() {
    navigator.clipboard.writeText(rawString).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="code-block">
      <div className="code-block-header">
        <span>{title ?? language}</span>
        <button
          onClick={handleCopy}
          className={cn(
            "code-block-copy flex items-center gap-1.5",
            copied && "text-green-600 dark:text-green-400"
          )}
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <Check size={13} />
              <span>Copied</span>
            </>
          ) : (
            <>
              <Copy size={13} />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <pre>
        <code
          dangerouslySetInnerHTML={{ __html: highlighted }}
        />
      </pre>
    </div>
  )
}

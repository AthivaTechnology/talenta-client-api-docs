import { Lock, Unlock } from "lucide-react"
import { MethodBadge } from "@/components/MethodBadge"
import { CodeBlock } from "@/components/CodeBlock"
import { CodeExample } from "@/components/CodeExample"
import { ParamTable } from "@/components/ParamTable"
import { cn } from "@/lib/utils"

function InlineText({ text }) {
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

function statusBadgeClass(status) {
  if (status >= 500) return "status-5xx"
  if (status >= 400) return "status-4xx"
  return "status-2xx"
}

function SectionLabel({ children }) {
  return (
    <h4 className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
      {children}
    </h4>
  )
}

export function EndpointCard({ endpoint }) {
  return (
    <div className="endpoint-card">

      {/* Method + path */}
      <div className="mb-3 flex flex-wrap items-center gap-2.5">
        <MethodBadge method={endpoint.method} />
        {endpoint.path && (
          <code className="rounded-md bg-muted px-2.5 py-1 font-mono text-[13px] text-foreground">
            {endpoint.path}
          </code>
        )}
      </div>

      {/* Title */}
      <h2 className="mb-2.5 text-[22px] font-semibold tracking-tight text-foreground leading-snug">
        {endpoint.title}
      </h2>

      {/* Description */}
      <p className="mb-4 text-[14px] leading-relaxed text-muted-foreground">
        {endpoint.description}
      </p>

      {/* Tip callout */}
      {endpoint.tip && (
        <div className="mb-5 flex items-start gap-2.5 rounded-lg border border-primary/20 bg-primary/5 px-4 py-3">
          <span className="mt-[1px] text-[11px] font-bold text-primary shrink-0">TIP</span>
          <p className="text-[13px] leading-relaxed text-foreground">{endpoint.tip}</p>
        </div>
      )}

      {/* Bullets — shown before request body only for non-POST endpoints */}
      {endpoint.bullets?.length > 0 && !endpoint.requestBodyParams && (
        <ul className="mb-6 space-y-1.5 pl-1">
          {endpoint.bullets.map((bullet, i) => bullet && (
            <li key={i} className="flex items-start gap-2 text-[13px] leading-relaxed text-muted-foreground">
              <span className="mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground/50" />
              <span><InlineText text={bullet} /></span>
            </li>
          ))}
        </ul>
      )}

      {/* Key response fields table */}
      {endpoint.keyFields?.length > 0 && (
        <div className="mb-6">
          <SectionLabel>Key Response Fields</SectionLabel>
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="error-table w-full">
              <thead>
                <tr>
                  <th>Field</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {endpoint.keyFields.map((kf, i) => (
                  <tr key={i}>
                    <td>
                      <code className="font-mono text-[13px]">{kf.field}</code>
                    </td>
                    <td className="text-[13px] text-foreground/80">{kf.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Auth banner — only shown when authentication is required */}
      {endpoint.auth.required && (
        <div className="mb-6 flex items-center gap-2.5 rounded-lg border border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/30 px-4 py-3 text-[13px]">
          <Lock size={14} className="shrink-0 text-amber-600 dark:text-amber-400" />
          <span className="font-medium text-amber-800 dark:text-amber-300">Authentication required</span>
          {endpoint.auth.note && (
            <span className="ml-1 text-muted-foreground">{endpoint.auth.note}</span>
          )}
        </div>
      )}

      {/* Flow — numbered step-by-step */}
      {endpoint.flow?.length > 0 && (
        <div className="mb-6">
          <SectionLabel>Flow</SectionLabel>
          <ol className="space-y-2">
            {endpoint.flow.map((step, i) => (
              <li
                key={i}
                className="flex items-start gap-3 rounded-md border border-border bg-muted/30 px-3.5 py-2.5"
              >
                <span className="mt-px flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-foreground/10 text-[10px] font-bold tabular-nums text-foreground/70">
                  {i + 1}
                </span>
                <span className="text-[13px] leading-relaxed text-foreground/80">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* Path params */}
      {endpoint.pathParams && <ParamTable params={endpoint.pathParams} title="Path Parameters" />}

      {/* Query params */}
      {endpoint.queryParams && <ParamTable params={endpoint.queryParams} title="Query Parameters" />}

      {/* Request body */}
      {(endpoint.requestBody || endpoint.requestBodyParams) && (
        <div className="my-6">
          <SectionLabel>Request Body</SectionLabel>
          {endpoint.requestBodyParams && (
            <ParamTable params={endpoint.requestBodyParams} title={null} />
          )}
          {endpoint.requestBody && (
            <CodeBlock code={endpoint.requestBody} title="application/json" />
          )}
        </div>
      )}

      {/* Scenarios — shown after request body for POST endpoints */}
      {endpoint.scenarios?.length > 0 && (
        <div className="mb-6 grid gap-3 sm:grid-cols-2">
          {endpoint.scenarios.map((s, i) => (
            <div key={i} className="rounded-lg border border-border bg-muted/30 px-4 py-3.5">
              <span className={cn(
                "mb-2 inline-block rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider",
                s.type === "free"
                  ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400"
                  : "bg-blue-100 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400"
              )}>
                {s.label}
              </span>
              <p className="text-[13px] leading-relaxed text-muted-foreground">{s.detail}</p>
            </div>
          ))}
        </div>
      )}

      {/* Bullets — shown after request body for POST endpoints */}
      {endpoint.bullets?.length > 0 && endpoint.requestBodyParams && (
        <ul className="mb-6 space-y-1.5 pl-1">
          {endpoint.bullets.map((bullet, i) => bullet && (
            <li key={i} className="flex items-start gap-2 text-[13px] leading-relaxed text-muted-foreground">
              <span className="mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground/50" />
              <span><InlineText text={bullet} /></span>
            </li>
          ))}
        </ul>
      )}

      {/* Responses */}
      <div className="my-6">
        <SectionLabel>Responses</SectionLabel>
        <div className="space-y-4">
          {endpoint.responses.map((res, i) => (
            <div key={i}>
              <div className="mb-2 flex items-center gap-2.5">
                <span className={cn("status-badge", statusBadgeClass(res.status))}>{res.status}</span>
                <span className="text-[13px] text-muted-foreground">{res.description}</span>
              </div>
              <CodeBlock code={res.body} title={`${res.status} · ${res.description}`} />
            </div>
          ))}
        </div>
      </div>

      {/* Code examples */}
      {endpoint.codeExamples?.length > 0 && (
        <div className="my-6">
          <SectionLabel>Example Usage</SectionLabel>
          <CodeExample examples={endpoint.codeExamples} originNote={endpoint.originNote ?? null} />
        </div>
      )}

      {/* Error codes */}
      {endpoint.errorCodes?.length > 0 && (
        <div className="my-6">
          <SectionLabel>Error Codes</SectionLabel>
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="error-table w-full">
              <thead>
                <tr>
                  <th>Status</th>
                  <th>Code</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {endpoint.errorCodes.map((err) => (
                  <tr key={err.code}>
                    <td><span className={cn("status-badge", statusBadgeClass(err.status))}>{err.status}</span></td>
                    <td><code className="font-mono text-[13px]">{err.code}</code></td>
                    <td className="text-[13px] text-foreground/80">{err.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

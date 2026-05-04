import { Lock, Unlock } from "lucide-react"
import { MethodBadge } from "@/components/MethodBadge"
import { CodeBlock } from "@/components/CodeBlock"
import { CodeExample } from "@/components/CodeExample"
import { ParamTable } from "@/components/ParamTable"
import { cn } from "@/lib/utils"

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
      <p className="mb-6 text-[14px] leading-relaxed text-muted-foreground">
        {endpoint.description}
      </p>

      {/* Auth banner */}
      <div className={cn(
        "mb-6 flex items-center gap-2.5 rounded-lg border px-4 py-3 text-[13px]",
        endpoint.auth.required
          ? "border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/30"
          : "border-border bg-muted/40"
      )}>
        {endpoint.auth.required
          ? <Lock size={14} className="shrink-0 text-amber-600 dark:text-amber-400" />
          : <Unlock size={14} className="shrink-0 text-muted-foreground" />
        }
        <span className={cn("font-medium", endpoint.auth.required ? "text-amber-800 dark:text-amber-300" : "text-foreground")}>
          {endpoint.auth.required ? "Authentication required" : "No authentication required"}
        </span>
        {endpoint.auth.note && (
          <span className="ml-1 text-muted-foreground">— {endpoint.auth.note}</span>
        )}
      </div>

      {/* Path params */}
      {endpoint.pathParams && <ParamTable params={endpoint.pathParams} title="Path Parameters" />}

      {/* Query params */}
      {endpoint.queryParams && <ParamTable params={endpoint.queryParams} title="Query Parameters" />}

      {/* Request body */}
      {endpoint.requestBody && (
        <div className="my-6">
          <SectionLabel>Request Body</SectionLabel>
          <CodeBlock code={endpoint.requestBody} title="Request Body · application/json" />
        </div>
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

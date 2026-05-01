import { cn } from "@/lib/utils"

const METHOD_STYLES = {
  GET: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  POST: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300",
  DELETE: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300",
  PATCH: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
  PUT: "bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300",
}

const SIZE_STYLES = {
  default: "px-2 py-0.5 text-xs",
  xs: "px-1.5 py-0 text-[10px]",
}

export function MethodBadge({ method, size = "default" }) {
  const colorClasses = METHOD_STYLES[method] ?? "bg-muted text-muted-foreground"
  const sizeClasses = SIZE_STYLES[size] ?? SIZE_STYLES.default

  return (
    <span
      className={cn(
        "inline-flex items-center rounded font-mono font-bold uppercase tracking-wide",
        sizeClasses,
        colorClasses
      )}
    >
      {method}
    </span>
  )
}

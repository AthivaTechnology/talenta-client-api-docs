export function ParamTable({ params, title }) {
  if (!params || params.length === 0) return null

  return (
    <div className="my-6">
      <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {title}
      </h4>
      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="param-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Required</th>
              <th>Default</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {params.map((param) => (
              <tr key={param.name}>
                <td>
                  <code className="font-mono text-sm text-foreground">
                    {param.name}
                  </code>
                </td>
                <td>
                  <span className="font-mono text-xs text-muted-foreground">
                    {param.type}
                  </span>
                </td>
                <td>
                  {param.required ? (
                    <span className="param-required">required</span>
                  ) : (
                    <span className="param-optional">optional</span>
                  )}
                </td>
                <td>
                  {param.default != null ? (
                    <code className="font-mono text-xs text-muted-foreground">
                      {param.default}
                    </code>
                  ) : (
                    <span className="text-muted-foreground">—</span>
                  )}
                </td>
                <td className="text-sm text-foreground/80">{param.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

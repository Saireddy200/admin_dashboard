export default function DataTable({ columns, rows, noDataText = 'No results.' }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse text-sm text-gray-700">
        <thead>
          <tr className="bg-gray-100 text-left text-xs uppercase tracking-wider">
            {columns.map((col) => (
              <th key={col.key} className="px-3 py-2">{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-3 py-6 text-center text-gray-500">{noDataText}</td>
            </tr>
          ) : (
            rows.map((row) => (
              <tr key={row.key} className="border-t border-gray-200 hover:bg-gray-50">
                {columns.map((col) => (
                  <td key={`${row.key}-${col.key}`} className="px-3 py-2">{col.render ? col.render(row) : row[col.key]}</td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

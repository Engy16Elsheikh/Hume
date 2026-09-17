type TableProps = {
  columns: string[];
  data: Record<string, unknown>[];
  striped?: boolean;
};

export default function Table({
  columns,
  data,
  striped = false,
}: TableProps) {
  return (
    <table className={`table ${striped ? "table-striped" : ""}`}>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column}>{column}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((column) => (
              <td key={column}>
                {String(row[column.toLowerCase()])}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
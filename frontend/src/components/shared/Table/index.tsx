import React from 'react'

export interface IColumnFields {
  id: string
  name: string
}

interface ITableProps {
  columns: IColumnFields[]
  children: React.ReactNode
}

export default function TableComponent({ columns, children }: ITableProps) {
  return (
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          {columns.map((column: IColumnFields) => (
            <th key={column.id} scope="col" className="px-6 py-3">
              {column.name}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  )
}

import React from 'react';
import { flexRender, Row } from '@tanstack/react-table';
import clsx from 'clsx';
import type { ColumnMeta, User } from '@/constants';

const getMetaClass = (meta?: ColumnMeta) => meta?.className ?? '';

export const TableBody = ({ rows }: { rows: Row<User>[] }) => (
  <tbody>
    {rows.map((row) => (
      <tr
        key={row.id}
        className="odd:bg-white even:bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
      >
        {row.getVisibleCells().map((cell) => (
          <td
            key={cell.id}
            className={clsx(
              'py-3 px-4 border-b border-gray-200',
              getMetaClass(cell.column.columnDef.meta as ColumnMeta),
            )}
          >
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </td>
        ))}
      </tr>
    ))}
  </tbody>
);

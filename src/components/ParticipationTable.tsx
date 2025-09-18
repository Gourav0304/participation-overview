'use client';

import React, { useMemo } from 'react';
import { User } from '@/services/userApi';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

type ColumnMeta = {
  className?: string;
};

type DataTableProps = {
  data: User[];
};

export const ParticipationTable = ({ data }: DataTableProps) => {
  const columnHelper = createColumnHelper<User>();

  const columns = useMemo(
    () => [
      columnHelper.accessor((_row, i) => i + 1, {
        header: 'S.No',
        cell: (info) => info.getValue(),
        meta: { className: 'text-center font-mono font-semibold' },
      }),
      columnHelper.accessor('firstName', {
        header: 'First Name',
        cell: (info) => info.getValue(),
        meta: { className: 'text-left pl-6' },
      }),
      columnHelper.accessor('lastName', {
        header: 'Last Name',
        cell: (info) => info.getValue(),
        meta: { className: 'text-left pl-6' },
      }),
      columnHelper.accessor('participationPercentage', {
        header: 'Participation',
        cell: (info) => `${info.getValue()}%`,
        meta: { className: 'text-center font-semibold text-cyan-700' },
      }),
    ],
    [columnHelper],
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (!data || data.length === 0) {
    return (
      <div className="w-full max-w-4xl mx-auto py-12 text-center text-gray-500 font-medium">
        No records available
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-lg border border-gray-300 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead className="bg-gradient-to-r from-cyan-600 to-cyan-400 text-white sticky top-0 z-10">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className={`py-3 px-4 border-b border-cyan-300 font-semibold uppercase tracking-wide ${
                      (header.column.columnDef.meta as ColumnMeta)?.className ?? ''
                    }`}
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="even:bg-cyan-50 odd:bg-white hover:bg-cyan-100 hover:scale-[1.02] hover:shadow-md transition-transform duration-200 ease-in-out cursor-pointer"
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className={`py-3 px-4 border-b border-gray-200 ${
                      (cell.column.columnDef.meta as ColumnMeta)?.className ?? ''
                    }`}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

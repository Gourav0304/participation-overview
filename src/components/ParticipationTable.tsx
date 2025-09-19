'use client';

import React, { useMemo } from 'react';
import { User } from '@/services/userApi';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import clsx from 'clsx';

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
        meta: { className: 'text-center font-mono font-semibold text-gray-800' },
      }),
      columnHelper.accessor('firstName', {
        header: 'First Name',
        cell: (info) => info.getValue(),
        meta: { className: 'text-left pl-6 font-medium text-gray-800' },
      }),
      columnHelper.accessor('lastName', {
        header: 'Last Name',
        cell: (info) => info.getValue(),
        meta: { className: 'text-left pl-6 text-gray-800' },
      }),
      columnHelper.accessor('participationPercentage', {
        header: 'Participation',
        cell: (info) => {
          const value = info.getValue();
          return (
            <span className={clsx('px-3 py-1 rounded-full text-xs font-semibold')}>{value}%</span>
          );
        },
        meta: { className: 'text-center' },
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
      <div className="w-full max-w-4xl mx-auto py-12 text-center text-gray-400 font-medium bg-gray-900 rounded-2xl shadow-lg">
        No records available
      </div>
    );
  }

  return (
    <div className="w-full md:w-3/4 lg:w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-md overflow-hidden border border-gray-700">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm md:text-base">
          <thead className="bg-white text-gray-800">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className={`py-4 px-4 font-semibold uppercase tracking-wider text-sm md:text-base border-b border-gray-700 ${
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
              <tr key={row.id} className="odd:bg-gray-100 even:bg-gray-50">
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className={`py-4 px-4 border-b border-gray-700 ${
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

'use client';

import React, { useMemo } from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import clsx from 'clsx';
import type { ColumnMeta, DataTableProps, User } from '@/constants';

const columnHelper = createColumnHelper<User>();

const getMetaClass = (meta?: ColumnMeta) => meta?.className ?? '';

export const ParticipationTable = ({ userData }: DataTableProps) => {
  const columns = useMemo(
    () => [
      columnHelper.accessor((_row, i) => i + 1, {
        id: 'serial',
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
            <span
              className={clsx(
                'px-3 py-1 rounded-full text-xs font-semibold',
                value >= 50 ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700',
              )}
            >
              {value}%
            </span>
          );
        },
        meta: { className: 'text-center' },
      }),
    ],
    [],
  );

  const table = useReactTable({
    data: userData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (!userData || userData.length === 0) {
    return (
      <div className="w-full max-w-4xl mx-auto py-12 text-center text-gray-500 bg-gray-50 rounded-2xl shadow-md">
        No records available
      </div>
    );
  }

  return (
    <div className="w-full md:w-3/4 lg:w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-md overflow-hidden border border-gray-200">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm md:text-base">
          <thead className="bg-gray-100 text-gray-800">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className={clsx(
                      'py-3 px-4 font-semibold uppercase tracking-wider text-xs md:text-sm border-b border-gray-200',
                      getMetaClass(header.column.columnDef.meta as ColumnMeta),
                    )}
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="odd:bg-white even:bg-gray-50">
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
        </table>
      </div>
    </div>
  );
};

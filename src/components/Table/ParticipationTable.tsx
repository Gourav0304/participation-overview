'use client';

import React, { useMemo } from 'react';
import { useReactTable, getCoreRowModel } from '@tanstack/react-table';
import { TableHeader } from './TableHeader';
import { TableBody } from './TableBody';
import { getColumns } from './TableColumns';
import type { DataTableProps } from '@/constants';

export const ParticipationTable = ({ userData }: DataTableProps) => {
  const columns = useMemo(() => getColumns(), []);

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
          <TableHeader headerGroups={table.getHeaderGroups()} />
          <TableBody rows={table.getRowModel().rows} />
        </table>
      </div>
    </div>
  );
};

import React from 'react';
import { flexRender, HeaderGroup } from '@tanstack/react-table';
import clsx from 'clsx';
import type { ColumnMeta, User } from '@/constants';

const getMetaClass = (meta?: ColumnMeta) => meta?.className ?? '';

export const TableHeader = ({ headerGroups }: { headerGroups: HeaderGroup<User>[] }) => (
  <thead className="bg-gray-100 text-gray-800">
    {headerGroups.map((headerGroup) => (
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
);

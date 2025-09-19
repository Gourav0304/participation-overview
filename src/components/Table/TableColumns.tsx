import { createColumnHelper } from '@tanstack/react-table';
import clsx from 'clsx';
import type { User } from '@/constants';

const columnHelper = createColumnHelper<User>();

export const getColumns = () => [
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
];

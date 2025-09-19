import { render } from '@testing-library/react';
import { TableHeader } from './TableHeader';
import { ColumnMeta, User } from '@/constants';
import { Column, HeaderGroup, HeaderContext, Table, Header } from '@tanstack/react-table';

jest.mock('@tanstack/react-table', () => {
  const actual = jest.requireActual('@tanstack/react-table');
  return {
    ...actual,
    flexRender: (value: unknown) => value,
  };
});

describe('TableHeader', () => {
  const mockHeaderGroups: HeaderGroup<User>[] = [
    {
      id: 'group-1',
      headers: [
        {
          id: 'serial',
          column: {
            columnDef: {
              header: 'S.No',
              meta: { className: 'text-center' } as ColumnMeta,
            },
          } as unknown as Column<User, unknown>,
          getContext: () =>
            ({
              column: {} as Column<User, unknown>,
              header: {} as Header<User, unknown>,
              table: {} as Table<User>,
            }) as unknown as HeaderContext<User, unknown>,
          colSpan: 0,
          depth: 0,
          getLeafHeaders: function (): Header<User, unknown>[] {
            throw new Error('Function not implemented.');
          },
          headerGroup: {} as HeaderGroup<User>,
          index: 0,
          isPlaceholder: false,
          rowSpan: 0,
          subHeaders: [],
          getResizeHandler: function (): (event: unknown) => void {
            throw new Error('Function not implemented.');
          },
          getSize: function (): number {
            throw new Error('Function not implemented.');
          },
          getStart: function (): number {
            throw new Error('Function not implemented.');
          },
        },
        {
          id: 'firstName',
          column: {
            columnDef: {
              header: 'First Name',
              meta: { className: 'text-left' } as ColumnMeta,
            },
          } as unknown as Column<User, unknown>,
          getContext: () =>
            ({
              column: {} as Column<User, unknown>,
              header: {} as Header<User, unknown>,
              table: {} as Table<User>,
            }) as unknown as HeaderContext<User, unknown>,
          colSpan: 0,
          depth: 0,
          getLeafHeaders: function (): Header<User, unknown>[] {
            throw new Error('Function not implemented.');
          },
          headerGroup: {} as HeaderGroup<User>,
          index: 0,
          isPlaceholder: false,
          rowSpan: 0,
          subHeaders: [],
          getResizeHandler: function (): (event: unknown) => void {
            throw new Error('Function not implemented.');
          },
          getSize: function (): number {
            throw new Error('Function not implemented.');
          },
          getStart: function (): number {
            throw new Error('Function not implemented.');
          },
        },
      ],
      depth: 0,
    },
  ];

  it('renders header rows and cells with correct text and classes', () => {
    const { container } = render(
      <table>
        <TableHeader headerGroups={mockHeaderGroups} />
      </table>,
    );

    const thElements = container.querySelectorAll('th');
    expect(thElements).toHaveLength(2);

    expect(thElements[0].textContent).toBe('S.No');
    expect(thElements[0].className).toContain('text-center');

    expect(thElements[1].textContent).toBe('First Name');
    expect(thElements[1].className).toContain('text-left');
  });
});

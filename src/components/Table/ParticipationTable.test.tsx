import { render, screen } from '@testing-library/react';
import { ParticipationTable } from './ParticipationTable';
import { User } from '@/constants';
import { HeaderGroup, Row } from '@tanstack/react-table';

jest.mock('./TableHeader', () => ({
  TableHeader: ({ headerGroups }: { headerGroups: HeaderGroup<User>[] }) => (
    <thead>
      {headerGroups.map((hg) => (
        <tr key={hg.id}>
          {hg.headers.map((h) => (
            <th key={h.id}>
              {typeof h.column.columnDef.header === 'string' ? h.column.columnDef.header : ''}
            </th>
          ))}
        </tr>
      ))}
    </thead>
  ),
}));

jest.mock('./TableBody', () => ({
  TableBody: ({ rows }: { rows: Row<User>[] }) => (
    <tbody>
      {rows.map((r) => (
        <tr key={r.id}>
          {r.getVisibleCells().map((c) => (
            <td key={c.id}>{c.getValue() as React.ReactNode}</td>
          ))}
        </tr>
      ))}
    </tbody>
  ),
}));

type ColumnDefinition = {
  id: keyof User | 'serial' | 'participationPercentage';
  columnDef: {
    header: string;
  };
};

jest.mock('./TableColumns', () => ({
  getColumns: (): ColumnDefinition[] => [
    { id: 'serial', columnDef: { header: 'S.No' } },
    { id: 'firstName', columnDef: { header: 'First Name' } },
    { id: 'lastName', columnDef: { header: 'Last Name' } },
    { id: 'participationPercentage', columnDef: { header: 'Participation' } },
  ],
}));

jest.mock('@tanstack/react-table', () => {
  const actual = jest.requireActual('@tanstack/react-table');
  return {
    ...actual,
    useReactTable: ({ data, columns }: { data: User[]; columns: ColumnDefinition[] }) => ({
      getHeaderGroups: () =>
        [
          {
            id: 'group-1',
            headers: columns.map((col) => ({
              id: col.id,
              column: col,
            })),
          },
        ] as HeaderGroup<User>[],
      getRowModel: () => ({
        rows: data.map((user, idx) => ({
          id: `row-${idx}`,
          getVisibleCells: () =>
            columns.map((col) => ({
              id: col.id,
              column: col,
              getValue: (): string | number => {
                if (col.id === 'serial') return idx + 1;
                if (col.id === 'participationPercentage') return user.participationPercentage;
                return user[col.id as keyof User] as string;
              },
            })),
        })) as Row<User>[],
      }),
    }),
  };
});

describe('ParticipationTable', () => {
  const mockUsers: User[] = [
    { id: 1, firstName: 'John', lastName: 'Doe', participationPercentage: 60, createdAt: '' },
    { id: 2, firstName: 'Jane', lastName: 'Smith', participationPercentage: 30, createdAt: '' },
  ];

  it('renders table with correct headers and rows', () => {
    render(<ParticipationTable userData={mockUsers} />);

    const thElements = screen.getAllByRole('columnheader');
    expect(thElements.map((el) => el.textContent)).toEqual([
      'S.No',
      'First Name',
      'Last Name',
      'Participation',
    ]);

    const tdElements = screen.getAllByRole('cell');
    expect(tdElements.map((el) => el.textContent)).toEqual([
      '1',
      'John',
      'Doe',
      '60',
      '2',
      'Jane',
      'Smith',
      '30',
    ]);
  });

  it('shows fallback message when no data', () => {
    render(<ParticipationTable userData={[]} />);
    expect(screen.getByText(/no records available/i)).toBeInTheDocument();
  });
});

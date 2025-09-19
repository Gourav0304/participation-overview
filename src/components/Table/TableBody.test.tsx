import { render } from '@testing-library/react';
import { TableBody } from './TableBody';
import { ColumnMeta, User } from '@/constants';
import { Row, Cell, RowData, CellContext, Table, NoInfer } from '@tanstack/react-table';

jest.mock('@tanstack/react-table', () => {
  const actual = jest.requireActual('@tanstack/react-table');
  return {
    ...actual,
    flexRender: (value: unknown) => value,
  };
});

describe('TableBody', () => {
  const makeCell = <T extends RowData>(value: string, metaClass: string): Cell<T, string> =>
    ({
      id: '',
      column: {
        columnDef: {
          cell: value,
          meta: { className: metaClass } as ColumnMeta,
        },
      } as unknown as Cell<T, string>,
      getContext: (): CellContext<T, string> => ({
        column: {} as Cell<T, string>['column'],
        row: {} as Row<T>,
        table: {} as Table<T>,
        getValue: <TTValue = string,>() => value as TTValue,
        cell: {} as Cell<T, string>,
        renderValue: function <TTValue = string | null>(): NoInfer<TTValue> {
          throw new Error('Function not implemented.');
        },
      }),
    }) as unknown as Cell<T, string>;

  const mockRows: Row<User>[] = [
    {
      id: 'row-1',
      getVisibleCells: () => [
        makeCell<User>('John', 'text-left'),
        makeCell<User>('Doe', 'text-left'),
      ],
    } as Row<User>,
    {
      id: 'row-2',
      getVisibleCells: () => [
        makeCell<User>('Jane', 'text-left'),
        makeCell<User>('Smith', 'text-left'),
      ],
    } as Row<User>,
  ];

  it('renders rows and cells with correct text and classes', () => {
    const { container } = render(
      <table>
        <TableBody rows={mockRows} />
      </table>,
    );

    const tdElements = container.querySelectorAll('td');
    expect(tdElements).toHaveLength(4);

    expect(tdElements[0].textContent).toBe('John');
    expect(tdElements[0].className).toContain('text-left');

    expect(tdElements[1].textContent).toBe('Doe');
    expect(tdElements[1].className).toContain('text-left');

    expect(tdElements[2].textContent).toBe('Jane');
    expect(tdElements[2].className).toContain('text-left');

    expect(tdElements[3].textContent).toBe('Smith');
    expect(tdElements[3].className).toContain('text-left');
  });
});

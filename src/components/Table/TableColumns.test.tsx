import { CellContext } from '@tanstack/react-table';
import { getColumns } from './TableColumns';
import { render } from '@testing-library/react';
import { User } from '@/constants';
import { JSX } from 'react';

describe('getColumns', () => {
  it('returns 4 columns with correct headers', () => {
    const columns = getColumns();
    expect(columns).toHaveLength(4);
    expect(columns[0].id).toBe('serial');
    expect(columns[0].header).toBe('S.No');
    expect(columns[1].header).toBe('First Name');
    expect(columns[2].header).toBe('Last Name');
    expect(columns[3].header).toBe('Participation');
  });

  it('serial column cell returns correct index', () => {
    const columns = getColumns();
    const cell = columns[0].cell as (info: CellContext<User, number>) => number;

    const info = {
      getValue: () => 1,
    } as CellContext<User, number>;

    expect(cell(info)).toBe(1);
  });

  it('firstName and lastName columns return correct value', () => {
    const columns = getColumns();

    const firstNameCell = columns[1].cell as (info: CellContext<User, string>) => string;
    const lastNameCell = columns[2].cell as (info: CellContext<User, string>) => string;

    const firstNameInfo = { getValue: () => 'John' } as CellContext<User, string>;
    const lastNameInfo = { getValue: () => 'Doe' } as CellContext<User, string>;

    expect(firstNameCell(firstNameInfo)).toBe('John');
    expect(lastNameCell(lastNameInfo)).toBe('Doe');
  });

  it('participationPercentage cell returns styled JSX', () => {
    const columns = getColumns();
    const cell = columns[3].cell as (info: CellContext<User, number>) => JSX.Element;

    const highInfo = { getValue: () => 60 } as CellContext<User, number>;
    const { container: highContainer } = render(cell(highInfo));
    const highSpan = highContainer.querySelector('span');
    expect(highSpan?.textContent).toBe('60%');

    const lowInfo = { getValue: () => 30 } as CellContext<User, number>;
    const { container: lowContainer } = render(cell(lowInfo));
    const lowSpan = lowContainer.querySelector('span');
    expect(lowSpan?.textContent).toBe('30%');
  });
});

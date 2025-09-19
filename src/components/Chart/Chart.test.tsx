import { render, screen } from '@testing-library/react';
import { DoughnutChart } from '@/components/Chart/Chart';
import { COLORS } from '@/constants/color';
import type { DoughnutChartProps } from '@/constants';
import '@testing-library/jest-dom';

const mockData: DoughnutChartProps['data'] = [
  {
    firstName: 'John',
    lastName: 'Doe',
    participationPercentage: 40,
    id: 0,
    createdAt: '',
  },
  {
    firstName: 'Jane',
    lastName: 'Smith',
    participationPercentage: 30,
    id: 0,
    createdAt: '',
  },
  {
    firstName: 'Alex',
    lastName: 'Johnson',
    participationPercentage: 30,
    id: 0,
    createdAt: '',
  },
];

jest.mock('recharts', () => {
  const original = jest.requireActual('recharts');

  type ReactChild = React.ReactNode;

  return {
    ...original,
    ResponsiveContainer: ({ children }: { children: ReactChild }) => <div>{children}</div>,
    PieChart: ({ children }: { children: ReactChild }) => (
      <div data-testid="piechart">{children}</div>
    ),
    Pie: ({ children }: { children: ReactChild }) => <div data-testid="pie">{children}</div>,
    Cell: ({ fill }: { fill: string }) => <div data-testid="cell" data-fill={fill} />,
    Tooltip: () => <div data-testid="tooltip" />,
    Legend: () => (
      <div data-testid="legend">
        {mockData.map((user) => (
          <div key={user.id}>
            {user.firstName} {user.lastName}
          </div>
        ))}
      </div>
    ),
  };
});

describe('DoughnutChart', () => {
  it('renders without crashing', () => {
    render(<DoughnutChart data={mockData} />);
    expect(screen.getByTestId('piechart')).toBeInTheDocument();
  });

  it('renders all cells', () => {
    render(<DoughnutChart data={mockData} />);
    const cells = screen.getAllByTestId('cell');
    expect(cells.length).toBe(mockData.length);
    cells.forEach((cell, i) => {
      expect(cell).toHaveAttribute('data-fill', COLORS[i % COLORS.length]);
    });
  });

  it('renders user names in legend', () => {
    render(<DoughnutChart data={mockData} />);

    mockData.forEach((user) => {
      expect(screen.getByText(`${user.firstName} ${user.lastName}`)).toBeInTheDocument();
    });
  });

  it('applies colors from COLORS array', () => {
    const { container } = render(<DoughnutChart data={mockData} />);

    const paths = container.querySelectorAll('.recharts-pie-sector path');
    paths.forEach((path: unknown, i: number) => {
      expect(path).toHaveAttribute('fill', COLORS[i % COLORS.length]);
    });
  });
});

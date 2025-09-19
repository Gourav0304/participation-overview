export type User = {
  id: number;
  firstName: string;
  lastName: string;
  participationPercentage: number;
  createdAt: string;
};

export type DoughnutChartProps = {
  doughnutData: User[];
};

export type InputProps = {
  id: string;
  name: string;
  placeholder: string;
  type?: string;
};

export type ColumnMeta = {
  className?: string;
};

export type DataTableProps = {
  userData: User[];
};

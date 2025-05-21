import { CellProps, Column } from 'react-table';
import { Priority } from '../types/priorityTypes';

export const columns: Column<Priority>[] = [
  {
    Header: 'Name',
    accessor: 'Name',
  },
  {
    Header: 'Description',
    accessor: 'Description',
  },
];


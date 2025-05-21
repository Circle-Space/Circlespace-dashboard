import { CellProps, Column } from 'react-table';
import { ActivityType } from '../types/ActivityTypes';

export const columns: Column<ActivityType>[] = [
  {
    Header: 'Name',
    accessor: 'Name',
  },
  {
    Header: 'Description',
    accessor: 'Description',
  },
];


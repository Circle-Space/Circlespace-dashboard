import { Column } from 'react-table';
import { Status } from '../types/statusTypes';

export const columns: Column<Status>[] = [
  {
    Header: 'Name',
    accessor: 'Name',
  },
  {
    Header: 'Description',
    accessor: 'Description',
  },
];


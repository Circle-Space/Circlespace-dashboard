import { CellProps, Column } from 'react-table';
import { Activities, Case } from '../types/casesTypes';
import { format } from 'date-fns';
import { findOptionLabelById } from '../../../../utils/selectOptionUtils';
import useStaticValue from '../../../../hooks/useStaticValue';
import TruncatedTextWithModal  from '../../../../components/TruncatedTextWithModal';

const WrapCell = ({ value }: { value: string }) => <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>{value}</div>;

export const columns: Column<Case>[] = [
  {
    Header: 'Case Number',
    accessor: 'CaseNumber',
    width: 120,
  },
  {
    Header: 'Name',
    accessor: 'Name',
    width: 100,
  },
  {
    Header: 'Assign To',
    accessor: 'AssignTo',
    width: 120,
    Cell: ({ value }) => {
      const { staticValues } = useStaticValue();
      const name = findOptionLabelById(value, staticValues.Users);
      return <WrapCell value={name} />;
    },
  },
  {
    Header: 'Status',
    accessor: 'StatusID',
    Cell: ({ value }) => {
      const { staticValues } = useStaticValue();
      const name = findOptionLabelById(value, staticValues.CaseStatuses);
      return <WrapCell value={name} />;
    },
  },
  {
    Header: 'Priority',
    accessor: 'PriorityID',
    Cell: ({ value }) => {
      const { staticValues } = useStaticValue();
      const name = findOptionLabelById(value, staticValues.CasePriorities);
      return <WrapCell value={name} />;
    },
  },
  {
    Header: 'Description',
    accessor: 'Description',
    width: 200,
    Cell: ({ value }: CellProps<Case, string>) => <TruncatedTextWithModal text={value} maxLength={25} title="Comments" />,
  },
  {
    Header: 'Date Created',
    accessor: 'CreatedAt',
    width: 100,
    Cell: ({ value }) => format(new Date(value), 'MM/dd/yyyy'),
  },
];


export const activitycolumns: Column<Activities>[] = [
  {
    Header: "Activity Type",
    accessor: 'ActivityTypeId',
    Cell: ({ value }) => {
      const { staticValues } = useStaticValue();
      const name = findOptionLabelById(value, staticValues.CaseActivityTypes);
      return name
    },
  },
  {
    Header: 'Notes',
    accessor: 'Notes',
  },
  {
    Header: 'Outcome',
    accessor: 'Outcome',
  },
  {
    Header: 'Activity Date',
    accessor: 'ActivityDate',
    Cell: ({ value }) => format(new Date(value), 'MM/dd/yyyy'),
  },
];
import { CellProps, Column } from 'react-table';
import { Contact } from '../../../types/contacts/contactsTypes';

export const columns: Column<Contact>[] = [
  {
    Header: 'First Name',
    accessor: 'FirstName',
  },
  {
    Header: 'Last Name',
    accessor: 'LastName',
  },
  {
    Header: 'Primary Email',
    accessor: 'Email',
    Cell: ({ value }: CellProps<Contact, string>) => (value ? <a href={`mailto:${value}`}>{value}</a> : null), // Adjusted for email
  },
  {
    Header: 'Home Phone',
    accessor: row => {
      const homePhone = row.PhoneDirectories.find(phone => phone.PhoneType === 'Home');
      return homePhone ? homePhone.PhoneNumber : '';
    },
    Cell: ({ value }: CellProps<Contact, string>) => (value ? <a href={`tel:${value}`}>{value}</a> : null), // Explicitly typed 'value'
    id: 'homePhone',
  },
  {
    Header: 'Mobile Phone',
    accessor: row => {
      const mobilePhone = row.PhoneDirectories.find(phone => phone.PhoneType === 'Mobile');
      return mobilePhone ? mobilePhone.PhoneNumber : '';
    },
    Cell: ({ value }: CellProps<Contact, string>) => (value ? <a href={`tel:${value}`}>{value}</a> : null), // Explicitly typed 'value'
    id: 'mobilePhone',
  },
];

export const phoneNumberColumns = [
  {
    Header: 'Type',
    accessor: 'PhoneType',
  },
  {
    Header: 'Phone Number',
    accessor: 'PhoneNumber',
  },
];

export const socialMediaColumns = [
  {
    Header: 'Type',
    accessor: 'SocialMediaType',
  },
  {
    Header: 'URL',
    accessor: 'SocialMediaURL',
  },
];

export const accountColumns = [
  {
    Header: 'Name',
    accessor: 'Name',
  },
];

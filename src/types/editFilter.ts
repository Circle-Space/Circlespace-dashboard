export type FilterCondition = {
  columnName: string;
  columnCondition: string;
  columnValue: string;
}

export type  FilterGroup = {
  type: 'AND' | 'OR';
  children: (FilterCondition | FilterGroup)[];
}

export type FilterColumn = {
  name: string;
  type: 'string' | 'number' | 'date';
  conditions: string[];
}

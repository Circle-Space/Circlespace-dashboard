import React, { useEffect, useMemo, useState } from 'react';
import { Row } from 'react-table';
import Select from 'react-select';
import { Form } from "react-bootstrap"
import moment from "moment"

interface DateFilterProps<T extends object> {
	filterValue: any;
	setFilter: (value: any) => void;
	clearFilters: boolean;
}

export const DateFilter = <T extends object>({
	filterValue,
	setFilter,
	clearFilters,
}: DateFilterProps<T>) => {
	const [startDate, setStartDate] = useState<Date | null>(null);
	const [endDate, setEndDate] = useState<Date | null>(null);

	useEffect(() => {
		if (clearFilters) {
			setStartDate(null);
			setEndDate(null);
			setFilter(undefined);
		}
	}, [clearFilters]);

	useEffect(() => {
		setFilter({ date: { startDate, endDate } });
	}, [startDate, endDate]);

	const handleStartDateChange = (date: Date | null) => {
		setStartDate(date);
	};

	const handleEndDateChange = (date: Date | null) => {
		setEndDate(date);
	};

	return (
		<div className='mt-1'>
			<div className='px-3'>
				<Form.Group>
					<Form.Label>Start Date</Form.Label>
					<Form.Control
						type="date"
						className="datePicker"
						value={startDate ? moment(startDate).format("YYYY-MM-DD") : ""}
						onChange={(e) => handleStartDateChange(new Date(e.target.value))}
					/>
				</Form.Group>
			</div>
			<div className="px-3 mt-2">
				<Form.Control
					type="date"
					className="datePicker"
					value={endDate ? moment(endDate).format("YYYY-MM-DD") : ""}
					onChange={(e) => handleEndDateChange(new Date(e.target.value))}
				/>
			</div>
		</div>
	);
};

export const SelectFilter = ({ columnId, options, value, onChange }: any) => {
	return (
		<select
			value={value}
			onChange={(e) => onChange(e.target.value)}
			className='log-filter-input-select'
		>
			<option value="">All</option>
			{options.map((option: string, i: number) => (
				<option key={i} value={option}>
					{option}
				</option>
			))}
		</select>
	);
};

export function DefaultColumnFilter({
	column: { filterValue, preFilteredRows, setFilter },
}: any) {
	const count = preFilteredRows.length;

	return (
		<input
			value={filterValue || ''}
			onChange={(e) => {
				setFilter(e.target.value || undefined);
			}}
			placeholder={`Search`}
			className="log-filter-input log-filter-input-search"
		/>
	);
}

export function MultiSelectColumnFilter({
	column: { filterValue, setFilter, preFilteredRows, id },
}: any) {
	const options = useMemo(() => {
		const options = new Set();
		preFilteredRows.forEach((row: Row) => {
			options.add(row.values[id]);
		});
		return [...options.values()];
	}, [id, preFilteredRows]);

	return (
		<Select
			options={options.map((option) => ({ value: option, label: option }))}
			value={
				filterValue
					? filterValue.map((value: string) => ({ value, label: value }))
					: []
			}
			onChange={(selectedOptions) => {
				setFilter(
					selectedOptions ? selectedOptions.map((option: any) => option.value) : []
				)
			}}
			isMulti
		/>
	);
}

export const MultiSelectFilter = <T extends object>(rows: Array<Row<T>>, id: string, filterValue: string[]) =>
	filterValue.length > 0
		? rows.filter((row) => filterValue.includes(row.values[id]))
		: rows;

export const DateRangeFilter = <T extends object>(rows: Array<Row<T>>, id: string, filterValue: any) => {
	if (!filterValue || !filterValue.date || !filterValue.option) return rows;
	const date = new Date(filterValue.date);
	return rows.filter((row) => {
		const rowDate = new Date(row.values[id]);
		if (filterValue.option === "before") {
			return rowDate < date;
		} else if (filterValue.option === "after") {
			return rowDate > date;
		} else if (filterValue.option === "exactly") {
			return rowDate.getTime() === date.getTime();
		}
		return true;
	});
};

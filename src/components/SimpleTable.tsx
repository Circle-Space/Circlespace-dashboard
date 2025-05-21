import { Table } from "react-bootstrap";
import { useTable } from "react-table";

interface SimpleTableProps {
	columns: any[],
	data: any
}

const SimpleTable = ({ columns, data }: SimpleTableProps) => {
	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow
	} = useTable({ columns, data });

	return (
		<Table bordered {...getTableProps()}>
			<thead>
				{headerGroups.map(headerGroup => (
					<tr {...headerGroup.getHeaderGroupProps()}>
						{headerGroup.headers.map(column => (
							<th {...column.getHeaderProps()}>{column.render("Header")}</th>
						))}
					</tr>
				))}
			</thead>
			<tbody {...getTableBodyProps()}>
				{rows.map(row => {
					prepareRow(row);
					return (
						<tr {...row.getRowProps()}>
							{row.cells.map(cell => (
								<td {...cell.getCellProps()}>{cell.render("Cell")}</td>
							))}
						</tr>
					);
				})}
			</tbody>
		</Table>
	);
};

export default SimpleTable
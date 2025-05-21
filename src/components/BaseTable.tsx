import React, { useCallback, useEffect, useRef, useState } from "react";
import { debounce } from "lodash";
import { Pagination, Table, Dropdown } from "react-bootstrap";
import { useRowSelect, useTable } from "react-table";
import { MoreHorizontal } from "react-feather";

export type ActionButtonType = {
  name: string;
  onClick: (data: any) => void;
}

// Define a generic type for the props
interface BaseTableProps<T extends object> {
  data: T[];
  onRowSelect: (selectedRows: T[]) => void;
  columns: any[];
  pagePagination?: {
    CurrentPage: number;
    TotalPages: number;
  };
  setPagination?: (action: "RESET" | "PREV" | "NEXT" | "LAST") => void;
  showBorder?: boolean;
  showStriped?: boolean;
  showHover?: boolean;
  showPagination?: boolean;
  showCheckboxes?: boolean;
  renderRowDetails?: (row: T) => JSX.Element;
  actionButtons?: ActionButtonType[];
}

// BaseTable component definition
function BaseTable<T extends { Id: string }>({
  data,
  onRowSelect,
  columns,
  pagePagination,
  setPagination,
  showBorder = true,
  showStriped = true,
  showHover = true,
  showPagination = true,
  showCheckboxes = true,
  actionButtons = [],
  renderRowDetails
}: BaseTableProps<T>) {
  //const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [expandedRowId, setExpandedRowId] = useState<string | null>(null);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
  } = useTable({
    columns, data
  }, useRowSelect, (hooks) => {
    hooks.allColumns.push((columns) => [
      ...(showCheckboxes ? [{
        id: "selection",
        Header: ({ getToggleAllRowsSelectedProps }) => (
          <input type="checkbox" {...getToggleAllRowsSelectedProps()} />
        ),
        Cell: ({ row }: any) => (
          <input type="checkbox" {...row.getToggleRowSelectedProps()} />
        ),
      }] : []),
      ...(renderRowDetails !== undefined
        ? [
          {
            id: "expand",
            Header: "",
            Cell: ({ row }: any) => (
              <button onClick={() => toggleRowExpansion(row.original.Id)}>
                {row.original.Id === expandedRowId ? "-" : "+"}
              </button>
            ),
          },
        ]
        : []),
      ...columns,
      ...(actionButtons.length > 0 ? [
        {
          Header: "Actions",
          Cell: ({ row }: any) => (
            <ActionDropDown actions={actionButtons} data={row} />
          )
        }
      ] : [])
    ]);
  });

  const toggleRowExpansion = (rowId: string) => {
    setExpandedRowId((prevExpandedRowId) => (prevExpandedRowId === rowId ? null : rowId));
  };

  const debouncedOnRowSelect = useCallback(
    debounce((selectedRows: T[]) => {
      onRowSelect(selectedRows);
    }, 300),
    [onRowSelect]
  );

  useEffect(() => {
    debouncedOnRowSelect(selectedFlatRows.map((row) => row.original));
  }, [selectedFlatRows, debouncedOnRowSelect]);

  return (
    <div>
      {Array.isArray(data) && data.length > 0 ? (
        <>
          <Table
            {...getTableProps()}
            striped={showStriped}
            bordered={showBorder}
            hover={showHover}
          >
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => {
                    return (
                      <th
                        {...column.getHeaderProps()}
                        style={column.id === "selection" ? { width: "20px" } : {}}
                      >
                        {column.render("Header")}
                      </th>
                    )
                  })}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                const isExpanded = row.original.Id === expandedRowId;
                return (
                  <React.Fragment key={row.original.Id}>
                    <tr {...row.getRowProps()}>
                      {row.cells.map((cell) => (
                        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                      ))}
                    </tr>
                    {isExpanded && renderRowDetails && (
                      <tr>
                        <td colSpan={columns.length + (renderRowDetails ? 1 : 0)}>
                          {renderRowDetails(row.original)}
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </Table>
          {showPagination && pagePagination && setPagination && (
            <Pagination>
              <Pagination.First
                onClick={() => setPagination("RESET")}
                disabled={pagePagination.CurrentPage === 1}
              />
              <Pagination.Prev
                onClick={() => setPagination("PREV")}
                disabled={pagePagination.CurrentPage === 1}
              />
              <Pagination.Item active>
                {pagePagination.CurrentPage}
              </Pagination.Item>
              <Pagination.Ellipsis />
              <Pagination.Item
                onClick={() => setPagination("LAST")}
                disabled={
                  pagePagination.CurrentPage === pagePagination.TotalPages
                }
              >
                {pagePagination.TotalPages}
              </Pagination.Item>
              <Pagination.Next
                onClick={() => setPagination("NEXT")}
                disabled={
                  pagePagination.CurrentPage === pagePagination.TotalPages
                }
              />
              <Pagination.Last
                onClick={() => setPagination("LAST")}
                disabled={
                  pagePagination.CurrentPage === pagePagination.TotalPages
                }
              />
            </Pagination>
          )}
        </>
      ) : (
        <div>No records found</div>
      )}
    </div>
  );
}

export default BaseTable;

interface ActionDropDownProps {
  actions: ActionButtonType[];
  data: any;
}

const ActionDropDown = ({ actions, data }: ActionDropDownProps) => {
  const [show, setShow] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShow(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <Dropdown className="me-2 nav-item" align="end" ref={dropdownRef} show={show}>
      <Dropdown.Toggle as="a" className="dropdown-toggle-no-icon">
        <MoreHorizontal onClick={() => setShow(prev => !prev)} />
      </ Dropdown.Toggle>
      <Dropdown.Menu className="dropdown-menu-end">
        {actions.map(a => (
          <Dropdown.Item onClick={() => a.onClick(data)}>
            {a.name}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  )
}
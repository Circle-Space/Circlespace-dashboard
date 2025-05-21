import React, {
    useEffect,
    useMemo,
    useState,
} from "react";

import moment from "moment";
import {
    Button,
    Card,
    Form,
    Pagination,
    Table,
} from "react-bootstrap";
import {
    Edit,
    Trash,
} from "react-feather";
import { useNavigate } from "react-router-dom";
import {
    Column,
    useFilters,
    useGlobalFilter,
    usePagination,
    useSortBy,
    useTable,
} from "react-table";

import {
    faClose,
    faSearch,
    faSliders,
    faSort,
    faSortDown,
    faSortUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ModalBase from "../../../components/ModalBase";
import ModalSliderBase from "../../../components/ModalSliderBase";
import {
    DefaultColumnFilter,
} from "../../../components/ReactTable/TableFilterBase";
import useAccountManagement from "../../../hooks/useAccount";
import useContactManagement from "../../../hooks/useContact";
import useOpportunitiesManagement from "../../../hooks/useOpportunities";
import { Opportunities } from "../../../types/oppurtunities/opportunitiesTypes";
import {
    findSelectOptionByValue,
    mapAccountToOptions,
    mapContactToOptions,
} from "../../../utils/selectOptionUtils";
import ExportButton from "./ExportButton";

interface Props {
    opportunities: Opportunities[]
    clearSearchText: () => void;
}

const OpportunitiesTable = ({ opportunities, clearSearchText }: Props) => {
    const { getOpportunities, deleteOpportunities } = useOpportunitiesManagement();
    const { getAccount, account } = useAccountManagement();
    const { contact } = useContactManagement();
    const navigate = useNavigate();
    const [clearFilters, setClearFilters] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [numFilters, setNumFilters] = useState(0);
    const [filteredData, setFilteredData] = useState<Opportunities[]>();
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [OpportunitiesToDelete, setOpportunitiesToDelete] = useState<Opportunities | null>(null);
    // console.log('accountview', contact)

    useEffect(() => {
        if (opportunities.length === 0) {
            getOpportunities()
        }
    }, [])

    useEffect(() => {
        getAccount();
    }, [])

    useEffect(() => {
        if (clearFilters) {
            setClearFilters(false);
        }
    }, [clearFilters]);

    const handleCancelDeleteContact = () => {
        setOpportunitiesToDelete(null);
        setShowDeleteConfirmation(false);
    };

    const handleConfirmDeleteContact = async () => {
        if (OpportunitiesToDelete) {
            console.log(OpportunitiesToDelete.Id)
            await deleteOpportunities(OpportunitiesToDelete.Id);
            const updatedOpportunities = opportunities.filter(
                (opportunities) => opportunities.Id !== OpportunitiesToDelete.Id
            );
            getOpportunities();
        }
        setOpportunitiesToDelete(null);
        setShowDeleteConfirmation(false);
    };

    const SortIcon = ({ column }: any) => (
        <span>
            {column.isSorted
                ? column.isSortedDesc
                    ? <FontAwesomeIcon icon={faSortUp} />
                    : <FontAwesomeIcon icon={faSortDown} />
                : <FontAwesomeIcon icon={faSort} />
            }
        </span>
    );

    const columns: Column<Opportunities>[] = useMemo(
        () => [
            {
                Header: "ID",
                accessor: "Id" as keyof Opportunities,
            },
            {
                Header: "Name",
                accessor: "Name" as keyof Opportunities,
                SortIcon,
                Filter: DefaultColumnFilter,
                showFilter: false
            },
            {
                Header: "Title",
                accessor: "Title" as keyof Opportunities,
                SortIcon,
                Filter: DefaultColumnFilter,
                showFilter: false,
            },
            {
                Header: "Category",
                accessor: "Category" as keyof Opportunities,
                SortIcon,
                Filter: DefaultColumnFilter,
                showFilter: false
            },
            {
                Header: "Account",
                accessor: "AccountId" as keyof Opportunities,
                Cell: ({ cell }: any) => (
                    <td>
                        {findSelectOptionByValue(
                            cell.value,
                            mapAccountToOptions(account)
                        )?.label}
                    </td>
                ),
                SortIcon,
                Filter: DefaultColumnFilter,
                showFilter: false,
            },
            {
                Header: "Contact",
                accessor: "ContactId" as keyof Opportunities,
                Cell: ({ cell }: any) => (
                    <td>
                        {findSelectOptionByValue(
                            cell.value,
                            mapContactToOptions(contact)
                        )?.label}
                    </td>
                ),
                SortIcon,
                Filter: DefaultColumnFilter,
                showFilter: false
            },
            {
                Header: "Description",
                accessor: "Description" as keyof Opportunities,
                SortIcon,
                Filter: DefaultColumnFilter,
                showFilter: false
            },
        ],
        [clearFilters]
    )


    const defaultColumn = useMemo(
        () => ({
            Filter: DefaultColumnFilter,
        }),
        []
    );

    const filterTypes = React.useMemo(
        () => ({
            date: (rows: any, id: any, filterValue: any) => {
                if (!filterValue.date.endDate || !filterValue.date.startDate) {
                    return rows;
                } else {
                    return rows.filter((row: any) => {
                        const startDate = moment(filterValue.date.startDate)
                        const endDate = moment(filterValue.date.endDate)
                        return moment(row.values[id]).isBetween(startDate, endDate)
                    })
                }
            }
        }),
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        setGlobalFilter,
        setAllFilters,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        rows,
        state: { pageIndex, pageSize },
    } = useTable(
        {
            columns,
            data: opportunities,
            defaultColumn,
            filterTypes,
            initialState: {
                pageSize: 15,
                hiddenColumns: ["Id"]
            },
        },
        useFilters,
        useGlobalFilter,
        useSortBy,
        usePagination
    );

    const handleClearFiltersClick = () => {
        setAllFilters([]);
        setGlobalFilter(undefined);
        setClearFilters(true);
        clearSearchText();
    };
    useEffect(() => {
        setFilteredData(rows.map((row) => row.original as Opportunities));
        if (filteredData) {
            const filters = headerGroups[0].headers.reduce((acc, header) => {
                if (header.filterValue && header.filterValue.length > 0) {
                    acc += 1;
                } else if (
                    header?.id === 'CreatedAt' &&
                    header.filterValue?.date.startDate &&
                    header.filterValue?.date.endDate
                ) {
                    acc += 1;
                }
                return acc;
            }, 0);
            setNumFilters(filters);
        }
    }, [rows]);

    return (
        <Card>
            <Card.Header className="pb-0 d-flex justify-content-between">
                <Card.Title>Opportunities</Card.Title>
                <div className='d-flex'>
                    <ExportButton data={filteredData} />
                    <Button className='ms-2' variant='outline-secondary'
                        onClick={() => setIsFilterOpen(true)}
                        size='sm'
                    >
                        <FontAwesomeIcon icon={faSliders} style={{ marginRight: '5px' }} />
                        Filters {numFilters > 0 && (<span>({numFilters})</span>)}
                    </Button>
                    <div className="log-search-container ms-2">
                        <input
                            onChange={(e) => setGlobalFilter(e.target.value || undefined)}
                            placeholder='Search all columns'
                            className="log-global-search log-filter-input"
                        />
                        <FontAwesomeIcon className='log-search-icon' icon={faSearch} />
                    </div>
                </div>
            </Card.Header>
            <Card.Body>
                <Table bordered striped {...getTableProps()}>
                    <thead>
                        {headerGroups.map((hg) => (
                            <tr {...hg.getHeaderGroupProps()}>
                                {hg.headers.map((column) => (
                                    <th
                                        {...column.getHeaderProps({
                                            ...column.getSortByToggleProps({
                                                onClick: (e) => {
                                                    column.toggleSortBy(column.isSorted ? !column.isSortedDesc : false);
                                                },
                                            }),
                                        })}
                                    >
                                        <div className="d-flex">
                                            <div className="me-2">
                                                {column.render('Header')}
                                            </div>
                                            {column.render('SortIcon')}
                                        </div>
                                    </th>
                                ))}
                                <th>Actions</th>
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {page.map((row) => {
                            prepareRow(row)
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map((cell) => {
                                        if (cell.column.id === 'CreatedAt') {
                                            return (
                                                <td {...cell.getCellProps()}>
                                                    {moment(cell.value).format("MM-DD-YYYY")}
                                                </td>
                                            )
                                        }
                                        return (
                                            <td {...cell.getCellProps()}>
                                                {cell.render('Cell')}
                                            </td>
                                        )
                                    })}
                                    <td className="table-action">
                                        <Edit
                                            className="align-middle me-1 mx-2"
                                            size={18}
                                            onClick={() => {
                                                navigate("EditOpportunities", { state: row.original });
                                            }}
                                        />
                                        <Trash
                                            className="align-middle me-1 mx-2"
                                            size={18}
                                            onClick={() => {
                                                setOpportunitiesToDelete(row.original);
                                                setShowDeleteConfirmation(true);
                                            }}
                                        />
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
                <ModalBase
                    show={showDeleteConfirmation}
                    onHide={handleCancelDeleteContact}
                    onCancel={handleCancelDeleteContact}
                    onSubmit={handleConfirmDeleteContact}
                    title="Confirm Delete"
                    size="sm"
                    primaryButtonText="Delete"
                    secondaryButtonText="Cancel"
                >
                    <div>
                        Are you sure you want to delete Account:{" "}
                        <strong>{OpportunitiesToDelete?.Name}</strong>?
                    </div>
                </ModalBase>
                <span className="mx-2">
                    Page
                    <strong className="ms-1">
                        {pageIndex + 1} of {pageOptions.length}
                    </strong>
                </span>
                <span className="ms-3 me-2">Show:</span>
                <Form.Select
                    className="d-inline-block w-auto"
                    value={pageSize}
                    onChange={(e: any) => {
                        setPageSize(Number(e.target.value));
                    }}
                >
                    {[5, 10, 15, 25, 50, 100].filter(size => size <= rows.length).map((pageSize) => (
                        <option key={pageSize} value={pageSize}>
                            {pageSize}
                        </option>
                    ))}
                </Form.Select>

                <span className="ms-3 me-2">Go to page:</span>
                <Form.Control
                    className="d-inline-block"
                    type="number"
                    min={1}
                    max={pageOptions.length}
                    defaultValue={pageIndex + 1}
                    onChange={(e) => {
                        const page = e.target.value
                            ? Number(e.target.value) - 1
                            : 0;
                        gotoPage(page);
                    }}
                    style={{ width: "75px" }}
                />
                <Pagination className="float-end">
                    <Pagination.First
                        onClick={() => gotoPage(0)}
                        disabled={!canPreviousPage}
                    />
                    <Pagination.Prev
                        onClick={() => previousPage()}
                        disabled={!canPreviousPage}
                    />
                    <Pagination.Next
                        onClick={() => nextPage()}
                        disabled={!canNextPage}
                    />
                    <Pagination.Last
                        onClick={() => gotoPage(pageCount - 1)}
                        disabled={!canNextPage}
                    />
                </Pagination>
            </Card.Body>
            <ModalSliderBase
                title="Filters"
                sideTab={false}
                sideTabTitle="Filters"
                isOpen={isFilterOpen}
                setIsOpen={setIsFilterOpen}
                allowOverflowVisible={true}
            >
                {headerGroups.map((headerGroup) => (
                    <div {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) =>
                            column.canFilter && column.render("showFilter") ? (
                                <div {...column.getHeaderProps()}>
                                    {column.render('Header')}
                                    <div className="mb-3">{column.render('Filter')}</div>
                                </div>
                            ) : null
                        )}
                    </div>
                ))}
                <div className="mt-4 d-flex justify-content-center">
                    <Button variant='outline-secondary' style={{ marginLeft: "0px", marginTop: "10px" }} onClick={handleClearFiltersClick}>
                        <FontAwesomeIcon icon={faClose} style={{ paddingRight: "5px" }} />
                        Clear Filters
                    </Button>
                </div>
            </ModalSliderBase>
        </Card>
    );
};

export default OpportunitiesTable;

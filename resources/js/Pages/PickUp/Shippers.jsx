import React, { useState } from "react";
import Base from "../../Layouts/Base";
import { Inertia } from "@inertiajs/inertia";
import { Link } from "@inertiajs/inertia-react";
import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory, { Type } from "react-bootstrap-table2-editor";

export default function Shippers(props) {
    // const [show, setShow] = useState(false);
    const [packageShow, setPackageShow] = useState(false);

    const [packageCurrent, setPackageCurrent] = useState();
    const [selectedRows, setSelectedRows] = useState([]);

    // const [picked, setPicked] = useState(false);
    const [notAccepted, setNotAccepted] = useState(false);
    const setShowPage = (pageSize) => {
        Inertia.post(route("package.changePage"), {
            pageSize,
        });
    };

    const handleOpen = (row) => {
        setPackageCurrent(row);
        setPackageShow(true);
    };

    const selectRow = {
        mode: "checkbox",
        clickToSelect: false,
        classes: () => "selected",
        onSelect: (row, isSelect) => {
            if (isSelect) {
                setSelectedRows([
                    ...selectedRows.filter((it) => it !== row.id),
                    row.id,
                ]);
            } else {
                setSelectedRows([
                    ...selectedRows.filter((it) => it !== row.id),
                ]);
            }
        },
        onSelectAll: (isSelect, rows) => {
            if (isSelect) {
                setSelectedRows(rows.map((it) => it.id));
            } else {
                setSelectedRows([]);
            }
        },
    };
    function Status() {
        return <span className={`badge bg-info`}>Ready To ship</span>;
    }
    function CityFormater(cell, row) {
        return (
            <>
                <span>
                    <strong>{cell.localite}</strong>
                    <br />
                    <small className="text-muted">
                        <i className="fas fa-box"></i>{" "}
                        {cell.shipment_provider.ShipmentProviderName}
                    </small>
                </span>
            </>
        );
    }
    function ShipperFormater(cell, row) {
        return (
            <>
                <strong>{cell} </strong>
                <br />
                <small className="text-muted">
                    <i className="fas fa-phone-alt"></i> {row.ShipperPhone}
                </small>
            </>
        );
    }
    function DriverFormater(cell, row) {
        return (
            <>
                <strong>{cell.UserName} </strong>
                <br />
                <small className="text-muted">
                    <i className="fas fa-phone-alt"></i> {cell.ShipperPhone}
                </small>
            </>
        );
    }
    const [edit, setEdit] = useState(0);

    function ActionFormater(cell, row) {
        return (
            <>
                <button
                    id="Edit"
                    dataDriver="211124111402"
                    type="button"
                    // value={''}
                    onClick={(e) => {
                        console.log("cliced : ", edit, cell);
                        setEdit(cell);
                        console.log("set edit", setEdit);
                        console.log("data", e.target.attributes);
                    }}
                    style={{ display: edit === cell ? "none" : "" }}
                    className="btn btn-sm btn-success ml-2"
                >
                    {edit !== cell && <i className="fas fa-shipping-fast"></i>}
                    {edit === cell && <i className="fas fa-check-circle"></i>}
                </button>
                {/* <button
                    id="Update"
                    onClick={() => setEdit(cell)}
                    style={{ display: edit !== cell ? "none" : "" }}
                    type="button"
                    className="btn btn-sm btn-primary ml-2"
                >
                    <i className="fas fa-check-circle"></i>
                </button> */}

                <button
                    id="Picked"
                    type="button"
                    className="btn btn-sm btn-warning ml-2"
                >
                    <i className="fas fa-dolly-flatbed"></i>
                </button>
            </>
        );
    }

    const columns = [
        {
            dataField: "UserName",
            text: "Shipper Name",
            formatter: ShipperFormater,
            classes: (cell, row, rowIndex) => {
                if (rowIndex > 1) return "sorting";
                return "sorting_disabled";
            },
            style: () => {
                return {
                    width: " 38px",
                };
            },
        },
        {
            dataField: "status",
            text: "Status",
            formatter: Status,
            sort: true,
        },
        {
            dataField: "packages_total",
            text: "Total",
            sort: true,
            formatter: (cell) => {
                return <>{cell.length}</>;
            },
        },
        {
            dataField: "created_at",
            text: " Created Date",
            sort: true,
            // formatter: CreatedAtFormater,
        },
        {
            dataField: "ShipperAddress",
            text: "Shipper Address",
            formatter : (cell,row) => {
                return (
                    <p style={{
                        wordBreak:'break-all',
                        width:'100px',
                        maxWidth:'40px',
                        lineBreak:'auto'
                    }}>{cell}</p>
                )
            }
        },

        {
            dataField: "city",
            text: "Shipper City",
            formatter: CityFormater,
            sort: true,
        },
        {
            dataField: "driver",
            text: "Drivers",
            formatter: DriverFormater,
            sort: true,            
        },
        {
            dataField: "id",
            text: "Action",
            headerEvents: {
                onClick: (e, column, columnIndex) =>
                    console.log(
                        "Click on Product ID header column",
                        columnIndex
                    ),
            },
            formatter: ActionFormater,
        },
    ];

    return (
        <>
            <div className="container-fluid py-4">
                <div
                    className="panel panel-light panel-table mt-3"
                    id="Table-Panel"
                >
                    <div className="panel-body overflow-hidden px-0">
                        <div
                            id="tabledata_wrapper"
                            className="dataTables_wrapper dt-bootstrap4 no-footer"
                        >
                            <div className="row">
                                <div className="col-sm-12 col-md-6 pl-5 pb-2">
                                    <div
                                        className="dataTables_length"
                                        id="tabledata_length"
                                    >
                                        <label>
                                            Show{" "}
                                            <select
                                                name="tabledata_length"
                                                aria-controls="tabledata"
                                                defaultValue={
                                                    props.auth.user.page_size
                                                }
                                                className="custom-select custom-select-sm form-control form-control-sm"
                                                onChange={(e) =>
                                                    setShowPage(e.target.value)
                                                }
                                            >
                                                <option value="10">10</option>
                                                <option value="25">25</option>
                                                <option value="50">50</option>
                                                <option value="100">100</option>
                                            </select>{" "}
                                            entries
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12" style={{
                                    overflow:'auto'  
                                }}>
                                    <BootstrapTable
                                        bootstrap5
                                        keyField="id"
                                        data={props.shippers.data}
                                        columns={columns}
                                        striped
                                        hover
                                        classes="p-4 table table-2 table-hover table-striped text-nowrap table-responsive dataTable no-footer"
                                        headerWrapperClasses="sorting"
                                        bodyClasses="odd "
                                        condensed
                                        selectRow={selectRow}
                                        // cellEdit={cellEditFactory({
                                        //     mode: "click",
                                        //     blurToSave: true,
                                        //     onStartEdit: (
                                        //         row,
                                        //         column,
                                        //         rowIndex,
                                        //         columnIndex
                                        //     ) => {
                                        //         console.log("start to edit!!!");
                                        //     },
                                        //     beforeSaveCell: (
                                        //         oldValue,
                                        //         newValue,
                                        //         row,
                                        //         column
                                        //     ) => {
                                        //         console.log(
                                        //             "Before Saving Cell!!"
                                        //         );
                                        //     },
                                        //     afterSaveCell: (
                                        //         oldValue,
                                        //         newValue,
                                        //         row,
                                        //         column
                                        //     ) => {
                                        //         setEdit(-1);
                                        //         console.log(
                                        //             "After Saving Cell!!",
                                        //             newValue
                                        //         );
                                        //     },
                                        // })}
                                        // rowStyle={rowStyle2}
                                    />
                                </div>
                                <div className="d-flex gap-3  justify-content-between">
                                    <div className=" pl-5 pt-2">
                                        <div
                                            className="dataTables_info"
                                            id="tabledata_info"
                                            role="status"
                                            aria-live="polite"
                                        >
                                            {/* {total > 1 ? 'Show'} */}
                                            {}
                                            Showing 1 to{" "}
                                            {props.shippers.per_page} of{" "}
                                            {props.shippers.total} entries
                                        </div>
                                    </div>
                                    <div className=" pr-5 pt-3">
                                        <div
                                            className="dataTables_paginate paging_simple_numbers"
                                            id="tabledata_paginate"
                                        >
                                            <ul className="pagination">
                                                <li
                                                    className="paginate_button page-item previous disabled"
                                                    id="tabledata_previous"
                                                >
                                                    <a
                                                        href="#"
                                                        aria-controls="tabledata"
                                                        data-dt-idx="0"
                                                        tabIndex="0"
                                                        className="page-link"
                                                    >
                                                        Previous
                                                    </a>
                                                </li>
                                                {props.shippers.links.map(
                                                    (link, k) => (
                                                        <li
                                                            key={k}
                                                            className="paginate_button page-item active"
                                                        >
                                                            {link.label === "»"}
                                                            {}
                                                            <Link
                                                                disabled={
                                                                    link.url ==
                                                                    null
                                                                        ? true
                                                                        : false
                                                                }
                                                                as="button"
                                                                className={`${
                                                                    link.active &&
                                                                    "bg-info"
                                                                } ${
                                                                    link.url ==
                                                                        null &&
                                                                    ""
                                                                    // "btn  text-black bg-white"
                                                                } page-link`}
                                                                href={
                                                                    link.url ||
                                                                    ""
                                                                }
                                                                dangerouslySetInnerHTML={{
                                                                    __html: link.label,
                                                                }}
                                                            />
                                                        </li>
                                                    )
                                                )}
                                                <li
                                                    className="paginate_button page-item next"
                                                    id="tabledata_next"
                                                >
                                                    <a
                                                        href="#"
                                                        aria-controls="tabledata"
                                                        data-dt-idx="8"
                                                        tabIndex="0"
                                                        className="page-link"
                                                    >
                                                        Next
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

Shippers.layout = (page) => (
    <Base key={page} children={page} title={"Shippers"} />
);

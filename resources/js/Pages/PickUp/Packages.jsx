import React, { useState } from "react";
import Base from "../../Layouts/Base";
import { Inertia } from "@inertiajs/inertia";
import { HeadPickUp } from "../../Components/Packages/head";
import Modal from "react-bootstrap/Modal";
import { Link, useForm } from "@inertiajs/inertia-react";
import { ShowPackage } from "../../Components/Packages/ShowPackage";
import BootstrapTable from "react-bootstrap-table-next";
import Form from "react-bootstrap/Form";

export default function Packages(props) {
    // const [show, setShow] = useState(false);
    const [packageShow, setPackageShow] = useState(false);

    const [packageCurrent, setPackageCurrent] = useState();
    const [selectedRows, setSelectedRows] = useState([]);

    // const [picked, setPicked] = useState(false);
    const [notPicked, setNotPicked] = useState(false);
    const setShowPage = (pageSize) => {
        Inertia.post(route("package.changePage"), {
            pageSize,
        });
    };
    const handleShowClose = () => setPackageShow(false);

    const handleOpen = (row) => {
        setPackageCurrent(row);
        setPackageShow(true);
    };
    const pickup = (id) => {
        Inertia.post(
            route("package.pickup", {
                package: id,
            })
        );
    };

    const selectRow = {
        mode: "checkbox",
        clickToSelect: false,
        classes: (row, rowIndex) => "selected",
        onSelect: (row, isSelect, rowIndex, e) => {
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
        onSelectAll: (isSelect, rows, e) => {
            if (isSelect) {
                setSelectedRows(rows.map((it) => it.id));
            } else {
                setSelectedRows([]);
            }
        },
    };
    function Status(cell, row) {
        return (
            <span className={`badge ${cell.StatusStyle}`}>
                {cell.StatusName}
            </span>
        );
    }
    function TrackingNumberFormater(cell, row) {
        return (
            <span
                onClick={() => handleOpen(row)}
                style={{
                    cursor: "pointer",
                }}
            >
                <strong>{cell}</strong>
                <br />
                <small className="text-muted">
                    <i className="fas fa-box"></i> {row.Reference}
                </small>
            </span>
        );
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
    function CustomerFormater(cell, row) {
        return (
            <>
                <strong>{cell}</strong>
                <br />
                <small className="text-muted">
                    <i className="fas fa-phone-alt"></i> {row.CustomerPhone}
                </small>
            </>
        );
    }
    function CreatedAtFormater(cell, row) {
        return (
            <>
                <strong>{cell}</strong>
                <br />
                <small className="text-muted">
                    <i className="fas fa-user"></i> {row.created_by?.UserName}
                </small>
            </>
        );
    }
    function updatedFormater(cell, row) {
        return (
            <>
                <strong>{cell}</strong>
                <br />
                <small className="text-muted">
                    <i className="fas fa-user"></i> {row.updated_by?.UserName}
                </small>
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
    function PrintedFormater(cell, row) {
        return <>{cell ? "True" : "False"}</>;
    }
    function ActionFormater(cell, row) {
        return (
            <>
                <button
                    onClick={() => pickup(row.id)}
                    id="Create"
                    className="btn btn-success mr-2"
                    // dataToggle="modal"
                    data-target="#package-create"
                >
                    Picked
                </button>
                <button
                    onClick={() => {
                        setCurrentPackageId(row.id);
                        setNotPicked(true);
                    }}
                    id="Create"
                    className="btn btn-danger mr-2"
                    // dataToggle="modal"
                    data-target="#package-create"
                >
                    Not Picked
                </button>
                {/* <div className="dropdown">
                    <button
                        className="btn btn-sm btn-dark dropdown-toggle"
                        type="button"
                        id={cell}
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                    >
                        <span> Action</span>{" "}
                    </button>
                    <div className="dropdown-menu" aria-labelledby={cell}>
                        <a
                            href={`/packages/label/${row.id}`}
                            target="_blank"
                            id="DownloadLabel"
                            // onClick={(e) => {
                            //     label(row.id);
                            // }}
                            data-packageid={cell}
                            className="dropdown-item"
                        >
                            <i className="fas fa-download"></i>
                            <span>Label</span>
                        </a>
                    </div>
                </div> */}
            </>
        );
    }

    const columns = [
        {
            dataField: "TrackingNumber",
            text: "Tracking Number",
            formatter: TrackingNumberFormater,
            classes: (cell, row, rowIndex, colIndex) => {
                if (rowIndex > 1) return "sorting";
                return "sorting_disabled";
            },
            style: (cell, row, rowIndex, colIndex) => {
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
            dataField: "CustomerName",
            text: "Customer Name",
            sort: true,
            formatter: CustomerFormater,
        },
        {
            dataField: "customer_city",
            text: "Customer City",
            formatter: CityFormater,
            sort: true,
        },
        {
            dataField: "ShipperName",
            text: "Shipper",
            formatter: ShipperFormater,
        },
        {
            dataField: "Printed",
            text: "Printed",
            formatter: PrintedFormater,
            sort: true,
        },
        {
            dataField: "created_at",
            text: " Created Date",
            sort: true,
            formatter: CreatedAtFormater,
        },
        {
            dataField: "updated_at",
            text: "Updated Date",
            formatter: updatedFormater,
            sort: true,
        },
        {
            dataField: "id",
            text: "Action",
            formatter: ActionFormater,
        },
    ];

    const { data, setData, post, reset, errors } = useForm();
    const onChange = (e) => setData({ ...data, [e.target.id]: e.target.value });
    const [currentPackageID, setCurrentPackageId] = useState(-1);
    const submit = (e) => {
        e.preventDefault();
        post(
            route("package.notpicked", {
                package: currentPackageID,
            }),
            {
                data,
                onSuccess: () => {
                    reset(), setNotPicked(false);
                },
            }
        );
    };
    console.log("props", props);
    return (
        <>
            <div className="container-fluid py-4">
                <HeadPickUp
                    handlePickedShow={() => setPicked(true)}
                    handleNotPickedShow={() => setNotPicked(true)}
                    worflow={props.shippingMethods}
                    rowSelected={selectedRows}
                />

                <div
                    className="panel panel-light panel-table mt-3"
                    id="Table-Panel"
                >
                    <div className="panel-body overflow-hidden px-0">
                        <div
                            id="tabledata_wrapper"
                            className="dataTables_wrapper dt-bootstrap4 no-footer"
                        >
                            <Modal
                                show={packageShow}
                                onHide={handleShowClose}
                                size="xl"
                            >
                                <ShowPackage packageCurrent={packageCurrent} />
                            </Modal>
                            <Modal
                                show={notPicked}
                                onHide={() => setNotPicked(false)}
                                keyboard={false}
                                size="md"
                            >
                                {/* <h1>Select Why not Picked</h1> */}
                                <form onSubmit={submit}>
                                    <div className=" mt-3">
                                        <label htmlFor="reasonId">
                                            Reason: <i></i>
                                        </label>
                                        <Form.Select
                                            id="reasonId"
                                            value={data.reasonId}
                                            onChange={onChange}
                                            aria-label="reasonId Select"
                                            className=" form-control"
                                        >
                                            <option></option>
                                            {Object.keys(props.reasons).map((it) => {
                                                return (
                                                    <option
                                                        key={it.id}
                                                        value={it.id}
                                                    >
                                                        {it.ReasonName}
                                                    </option>
                                                    // <option value="true">YES</option>
                                                );
                                            })}
                                        </Form.Select>
                                        {errors && (
                                            <div className="text-danger mt-1">
                                                {errors.reasonId}
                                            </div>
                                        )}
                                    </div>
                                    <div className="modal-footer">
                                        <button
                                            id="CreatePackageConfirmation"
                                            type="submit"
                                            className="btn btn-success"
                                        >
                                            Confirm
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-secondary"
                                            data-dismiss="modal"
                                        >
                                            Back
                                        </button>
                                    </div>
                                </form>
                            </Modal>
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
                                <div className="col-sm-12">
                                    <BootstrapTable
                                        bootstrap5
                                        keyField="id"
                                        data={props.packages.data}
                                        columns={columns}
                                        striped
                                        hover
                                        classes="p-4 table table-2 table-hover table-striped text-nowrap table-responsive dataTable no-footer"
                                        headerWrapperClasses="sorting"
                                        bodyClasses="odd "
                                        condensed
                                        selectRow={selectRow}
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
                                            {props.packages.per_page} of{" "}
                                            {props.packages.total} entries
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
                                                {props.packages.links.map(
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

Packages.layout = (page) => (
    <Base key={page} children={page} title={"Packages"} />
);

import React, { useState } from "react";
import Base from "../../Layouts/Base";
import { HeadUpload } from "../../Components/Packages/head";
import { Modal } from "react-bootstrap";
import { FileUploader } from "react-drag-drop-files";
import { Link, useForm } from "@inertiajs/inertia-react";
import BootstrapTable from "react-bootstrap-table-next";
function UploadModal({ close, isEmployee }) {
    const { data, setData, post, progress } = useForm({
        file: null,
    });

    const [file, setFile] = useState(null);
    const handleChange = (file) => {
        setFile(file);
        console.log(file);
    };

    function submit(e) {
        e.preventDefault();
        setData("file", file);
        if (isEmployee) {
            post(route("packages.upload-em"), {
                data,
                onSuccess: () => {
                    // setTimeout(() => close)
                    close();
                },
            });
        } else {
            post(route("packages.upload-post"), {
                data,
                onSuccess: () => {
                    // setTimeout(() => close)
                    close();
                },
            });
        }
    }
    const fileTypes = ["csv"];
    return (
        <form className="" onSubmit={submit}>
            <div className="modal-header">
                <h5 className="modal-title">Mass Upload</h5>
                <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#333333"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                    >
                        <path d="M16.24 14.83a1 1 0 0 1-1.41 1.41L12 13.41l-2.83 2.83a1 1 0 0 1-1.41-1.41L10.59 12 7.76 9.17a1 1 0 0 1 1.41-1.41L12 10.59l2.83-2.83a1 1 0 0 1 1.41 1.41L13.41 12l2.83 2.83z"></path>
                    </svg>
                </button>
            </div>
            <div className="modal-body">
                <h6 className="text-danger">
                    Please check the separator must be a comma (,)
                </h6>
                {progress && (
                    <progress value={progress.percentage} max="100">
                        {progress.percentage}%
                    </progress>
                )}
                {file && (
                    <div className="py-3">
                        <span>{file.name} Selected</span>
                        <button
                            onClick={() => setFile(null)}
                            type="button"
                            className="close"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="#333333"
                                viewBox="0 0 24 24"
                                width="24"
                                height="24"
                            >
                                <path d="M16.24 14.83a1 1 0 0 1-1.41 1.41L12 13.41l-2.83 2.83a1 1 0 0 1-1.41-1.41L10.59 12 7.76 9.17a1 1 0 0 1 1.41-1.41L12 10.59l2.83-2.83a1 1 0 0 1 1.41 1.41L13.41 12l2.83 2.83z"></path>
                            </svg>
                        </button>
                        {/* <button onClick={() => setFile(null)}>x</button> */}
                    </div>
                )}
                <div className="d-flex justify-content-center w-100 pt-3">
                    <FileUploader
                        classes="w-100 "
                        // label='Drop'
                        multiple={false}
                        handleChange={handleChange}
                        name="file"
                        types={fileTypes}
                    />
                </div>
            </div>

            <div className="modal-footer">
                <button
                    type="button"
                    className="btn btn-light"
                    data-dismiss="modal"
                >
                    Close
                </button>
                <button
                    className="btn btn-success"
                    id="UploadConfirmation"
                    disabled={file === null}
                    type="submit"
                >
                    {" "}
                    Confirm{" "}
                </button>
            </div>
        </form>
    );
}
export default function Upload(props) {
    console.log(props.uploads);
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false);
    };
    const handleOpen = () => {
        setShow(true);
    };
    function HubFormater(cell, row) {
        return <>{cell.ShipmentProviderName}</>;
    }
    function PackageFormater(cell, row) {
        return (
            <>
                <div
                    className="progress bg-danger-light progress-lg"
                    style={{ height: " 20px" }}
                >
                    <div
                        className="progress-bar progress-bar-striped bg-danger"
                        role="progressbar"
                        style={{
                            width: `${
                                (row.PackageSuccess / row.TotalPackage) * 100
                            }%`,
                        }}
                        aria-valuenow={`${
                            (row.PackageSuccess / row.TotalPackage) * 100
                        }%`}
                        aria-valuemin="0"
                        aria-valuemax="100.00"
                    >
                        {(row.PackageSuccess / row.TotalPackage) * 100}
                    </div>
                </div>
                <div className="flex-grow-1">
                    <small className="text-muted">
                        <strong>
                            <span className="text-danger">
                                {row.PackageSuccess}
                            </span>{" "}
                            of {row.TotalPackage} Packages
                        </strong>
                    </small>
                </div>
            </>
        );
    }
    function OwnerFormater(cell, row) {
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
    function StatusFormater(cell, row) {
        return (
            <span className={`badge ${cell.StatusStyle}`}>
                {cell.StatusName}
            </span>
        );
    }
    function ActionFormater(cell, row) {
        return (
            <>
                <div className="dropdown">
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
                            disabled={row.PackageSuccess > 0}
                            // onClick={(e) => {
                            //     label(row.id);
                            // }}
                            data-packageid={cell}
                            className="dropdown-item"
                        >
                            <i className="fas fa-download"></i>
                            <span>Label</span>
                        </a>

                        <a
                            value={cell}
                            target="_blank"
                            href={`/storage/uploads/${row.LogFile}`}
                            id="LogFile"
                            data-packageid={cell}
                            className="dropdown-item"
                        >
                            <i className="fas fa-download"></i>
                            <span>LogFile</span>
                        </a>
                    </div>
                </div>
            </>
        );
    }

    const columns = [
        {
            dataField: "UploadID",
            text: "Reference",
            // formatter: TrackingNumberFormater,
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
            dataField: "UploadID",
            text: "Packages",
            formatter: PackageFormater,
            classes: (cell, row, rowIndex, colIndex) => {
                if (rowIndex > 1) return "sorting";
                return "sorting_disabled";
            },
        },
        {
            dataField: "shipment_provider",
            text: "Hub",
            formatter: HubFormater,
            classes: (cell, row, rowIndex, colIndex) => {
                if (rowIndex > 1) return "sorting";
                return "sorting_disabled";
            },
        },
        {
            dataField: "owner",
            text: "Created By",
            formatter: OwnerFormater,
            classes: (cell, row, rowIndex, colIndex) => {
                if (rowIndex > 1) return "sorting";
                return "sorting_disabled";
            },
        },
        {
            dataField: "created_at",
            text: "Created Date",
            // formatter: TrackingNumberFormater,
            classes: (cell, row, rowIndex, colIndex) => {
                if (rowIndex > 1) return "sorting";
                return "sorting_disabled";
            },
        },
        {
            dataField: "status",
            text: "STATUS",
            formatter: StatusFormater,
            classes: (cell, row, rowIndex, colIndex) => {
                if (rowIndex > 1) return "sorting";
                return "sorting_disabled";
            },
        },
        {
            dataField: "UploadID",
            text: "Action",
            formatter: ActionFormater,
        },
    ];
    return (
        <>
            <div className="container-fluid py-4">
                <HeadUpload open={handleOpen} isEmployee={props.isEmployee} />
                {/* <Head
                    handleShow={handleShow}
                    worflow={props.shippingMethods}
                    rowSelected={null}
                /> */}
                <Modal show={show} onHide={handleClose} size="md">
                    <UploadModal
                        close={handleClose}
                        isEmployee={props.isEmployee}
                    />
                </Modal>
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
                                                className="custom-select custom-select-sm form-control form-control-sm"
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
                                <div className="col-sm-12 col-md-6 pr-5 pb-2">
                                    <div
                                        id="tabledata_filter"
                                        className="dataTables_filter"
                                    >
                                        <label>
                                            Search:
                                            <input
                                                type="search"
                                                className="form-control form-control-sm"
                                                placeholder=""
                                                aria-controls="tabledata"
                                            />
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12">
                                    <BootstrapTable
                                        bootstrap5
                                        keyField="id"
                                        data={props.uploads.data}
                                        columns={columns}
                                        striped
                                        hover
                                        classes="p-4 table table-2 table-hover table-striped text-nowrap table-responsive dataTable no-footer"
                                        headerWrapperClasses="sorting"
                                        bodyClasses="odd "
                                        condensed
                                        // selectRow={selectRow}
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
                                            {props.uploads.per_page} of{" "}
                                            {props.uploads.total} entries
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
                                                {props.uploads.links.map(
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

Upload.layout = (page) => (
    <Base key={page} children={page} title={"Upload Packages"} />
);

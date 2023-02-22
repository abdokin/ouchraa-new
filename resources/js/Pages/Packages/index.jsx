import React, { useState } from "react";
import Base from "../../Layouts/Base";
import { Inertia } from "@inertiajs/inertia";
import { CreatePackageModal } from "../../Components/Packages/CreatePackage";
import Modal from "react-bootstrap/Modal";
import { Link } from "@inertiajs/inertia-react";
import { ShowPackage } from "../../Components/Packages/ShowPackage";
import { EditPackageModale } from "../../Components/Packages/EditPackage";
import { useMap } from "react-use";
import Collapse from "react-bootstrap/Collapse";
import Filters from "../../Components/Filters/Index";
import { Choice } from "../Configuration/Cities";
export default function Index(props) {
    const [show, setShow] = useState(false);
    const [create, setCreate] = useState(false);
    const [edit, setEdit] = useState(false);

    const [packageCurrent, setPackageCurrent] = useState();

    const [map, { set, setAll, remove, reset }] = useMap();
    return (
        <>
            <div className="container-fluid py-4">
                <Head
                    handleShow={() => setCreate(true)}
                    workflow={props.shippingMethods}
                    rowSelected={map}
                />
                <Modal show={show} onHide={() => setShow(false)} size="xl">
                    <ShowPackage packageCurrent={packageCurrent} />
                </Modal>
                <Modal
                    show={create}
                    onHide={() => setCreate(false)}
                    backdrop="static"
                    keyboard={false}
                    size="xl"
                >
                    <CreatePackageModal
                        close={() => setCreate(false)}
                        isShipper={props.isShipper}
                        shippingMethods={props.shippingMethods}
                        shippers={props.shippers}
                        cities={props.cities}
                        handleClose={() => setCreate(false)}
                    />
                </Modal>
                <Modal show={edit} onHide={() => setEdit(false)} size="xl">
                    <EditPackageModale
                        packageCurrent={packageCurrent}
                        close={() => setEdit(false)}
                        isShipper={props.isShipper}
                        shippingMethods={props.shippingMethods}
                        shippers={props.shippers}
                        cities={props.cities}
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
                                                // defaultValue={props.packages.per_page}
                                                checked={
                                                    props.packages.per_page
                                                }
                                                className="custom-select custom-select-sm form-control form-control-sm"
                                                // onChange={(e) =>
                                                //     Inertia.get(
                                                //         route(
                                                //             "packages.index",
                                                //             {
                                                //                 per_page:
                                                //                     e.target
                                                //                         .value,
                                                //             }
                                                //         )
                                                //     )
                                                // }
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
                            <Table
                                packages={props.packages.data}
                                openShow={(row) => {
                                    setPackageCurrent(row);
                                    setShow(true);
                                }}
                                openEdit={(row) => {
                                    setPackageCurrent(row);
                                    setEdit(true);
                                }}
                                map={map}
                                set={set}
                                setAll={setAll}
                                remove={remove}
                                reset={reset}
                            />

                            <div className="row">
                                <div className="col-sm-12"></div>
                                <div className="d-flex gap-3  justify-content-between">
                                    <div className=" pl-5 pt-2">
                                        <div
                                            className="dataTables_info"
                                            id="tabledata_info"
                                            role="status"
                                            aria-live="polite"
                                        >
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

Index.layout = (page) => (
    <Base key={page} children={page} title={"Manage Packages"} />
);

function Table({
    packages,
    openShow,
    openEdit,
    map,
    set,
    setAll,
    remove,
    reset,
}) {
    const cancel = (id) => {
        Inertia.post(
            route("package.cancel", {
                package: id,
            })
        );
    };
    const readyToShip = (id) => {
        Inertia.post(
            route("package.readyToShip", {
                package: id,
            })
        );
    };
    const packagesIds = packages.map((it) => it.id);
    const [choiceReady, setChoiceReady] = useState(false);
    const [choiceCancel, setChoiceCancel] = useState(false);

    const [currentID, setCurrentID] = useState(-1);
    return (
        <>
            <table
                id="tabledata"
                style={{
                    width: "100%",
                    borderBottom: " 1px solid rgb(222, 226, 230)",
                }}
                className="table table-2 table-hover table-striped text-nowrap table-responsive dataTable no-footer"
                role="grid"
                aria-describedby="tabledata_info"
            >
                <Modal
                    show={choiceReady}
                    onHide={() => setChoiceReady(false)}
                    size="md"
                >
                    <Choice
                        icon={
                            <i id="modal-icon" class="fas fa-dolly-flatbed"></i>
                        }
                        close={() => setChoiceReady(false)}
                        message={"make this package ready to ship"}
                        action={() => readyToShip(currentID)}
                    />
                </Modal>
                <Modal
                    show={choiceCancel}
                    onHide={() => setChoiceCancel(false)}
                    size="md"
                >
                    <Choice
                        icon={
                            <i id="modal-icon" className="fas fa-trash-alt"></i>
                        }
                        close={() => setChoiceCancel(false)}
                        message={"cancel this package"}
                        action={() => cancel(currentID)}
                    />
                </Modal>
                <thead>
                    <tr role="row">
                        <th
                            className="sorting_disabled"
                            rowSpan="1"
                            colSpan="1"
                            style={{ width: "38px" }}
                            aria-label=""
                            width="1%"
                        >
                            <div className="custom-control custom-checkbox custom-checkbox-2 d-block">
                                <input
                                    type="checkbox"
                                    onChange={(e) => {
                                        if (!e.target.checked) {
                                            reset();
                                        } else {
                                            setAll({ ...packagesIds });
                                        }
                                    }}
                                    className="custom-control-input"
                                    id="custom-checkbox-all"
                                />
                                <label
                                    className="custom-control-label"
                                    htmlFor="custom-checkbox-all"
                                ></label>
                            </div>
                        </th>
                        <th
                            className="sorting"
                            tabIndex="0"
                            aria-controls="tabledata"
                            rowSpan="1"
                            colSpan="1"
                            style={{ width: "120.5px" }}
                            aria-label="Tracking Number: activate to sort column ascending"
                            width="14%"
                        >
                            Tracking Number
                        </th>
                        <th
                            className="sorting"
                            tabIndex="0"
                            aria-controls="tabledata"
                            rowSpan="1"
                            colSpan="1"
                            style={{ width: " 78.5px" }}
                            aria-label="Status: activate to sort column ascending"
                            width="9%"
                        >
                            Status
                        </th>
                        <th
                            className="sorting"
                            tabIndex="0"
                            aria-controls="tabledata"
                            rowSpan="1"
                            colSpan="1"
                            style={{ width: " 121.5px" }}
                            aria-label="Customer Name: activate to sort column ascending"
                            width="13%"
                        >
                            Customer Name
                        </th>
                        <th
                            className="sorting"
                            tabIndex="0"
                            aria-controls="tabledata"
                            rowSpan="1"
                            colSpan="1"
                            style={{ width: " 102.5px" }}
                            aria-label="Customer City: activate to sort column ascending"
                            width="12%"
                        >
                            Customer City
                        </th>
                        <th
                            className="sorting"
                            tabIndex="0"
                            aria-controls="tabledata"
                            rowSpan="1"
                            colSpan="1"
                            style={{ width: " 70.5px" }}
                            aria-label="Shipper: activate to sort column ascending"
                            width="13%"
                        >
                            Shipper
                        </th>
                        <th
                            className="sorting"
                            tabIndex="0"
                            aria-controls="tabledata"
                            rowSpan="1"
                            colSpan="1"
                            style={{ width: " 110.5px" }}
                            aria-label="Created Date: activate to sort column ascending"
                            width="15%"
                        >
                            Created Date
                        </th>
                        <th
                            className="sorting"
                            tabIndex="0"
                            aria-controls="tabledata"
                            rowSpan="1"
                            colSpan="1"
                            style={{ width: " 115.5px" }}
                            aria-sort="descending"
                            aria-label="Updated Date: activate to sort column ascending"
                            width="15%"
                        >
                            Updated Date
                        </th>
                        <th
                            className="sorting"
                            tabIndex="0"
                            aria-controls="tabledata"
                            rowSpan="1"
                            colSpan="1"
                            style={{ width: " 52.5px" }}
                            aria-label="Printed: activate to sort column ascending"
                            width="1%"
                        >
                            Printed
                        </th>
                        <th
                            className="sorting_disabled"
                            rowSpan="1"
                            colSpan="1"
                            style={{ width: "65px" }}
                            aria-label=""
                            width="8%"
                        ></th>
                    </tr>
                </thead>
                <tbody>
                    {packages.map((it, index) => {
                        return (
                            <tr
                                role="row"
                                className={`odd ${
                                    map[index] == it.id ? "selected" : ""
                                }`}
                                key={it.id}
                            >
                                <td>
                                    <div className="custom-control custom-checkbox custom-checkbox-2 d-block">
                                        <input
                                            id={it.id}
                                            data-name="Hubs"
                                            type="checkbox"
                                            checked={map[index] == it.id}
                                            onChange={(e) => {
                                                if (!e.target.checked) {
                                                    remove(index);
                                                } else {
                                                    set(index, it.id);
                                                }
                                            }}
                                            className="custom-control-input"
                                        />
                                        <label
                                            className="custom-control-label"
                                            htmlFor={it.id}
                                        ></label>
                                    </div>
                                </td>
                                <td
                                    style={{ cursor: "pointer" }}
                                    id="Overview"
                                    onClick={() => openShow(it)}
                                    data-toggle="modal"
                                    data-target="#overview-modal"
                                >
                                    <span>
                                        <strong>{it.TrackingNumber}</strong>
                                        <br />
                                        <small className="text-muted">
                                            <i className="fas fa-box"></i>{" "}
                                            {it.Reference}
                                        </small>
                                    </span>
                                </td>
                                <td>
                                    <span
                                        className={`badge ${it.status.StatusStyle}`}
                                    >
                                        {it.status.StatusName}
                                    </span>
                                </td>
                                <td>
                                    <strong>{it.CustomerName}</strong>
                                    <br />
                                    <small className="text-muted">
                                        <i className="fas fa-phone-alt"></i>
                                        {it.CustomerPhone}
                                    </small>
                                </td>
                                <td>
                                    <strong>{it.cutomer_city.localite}</strong>
                                    <br />
                                    <small className="text-muted">
                                        <i className="fas fa-paper-plane"></i>
                                        {it.last_mile.ShipmentProviderName}
                                    </small>
                                </td>
                                <td>
                                    <strong>{it.ShipperName} </strong>
                                    <br />
                                    <small className="text-muted">
                                        <i className="fas fa-phone-alt"></i>
                                        {it.ShipperPhone}
                                    </small>
                                </td>
                                <td>
                                    <strong>{it.created_at}</strong>
                                    <br />
                                    <small className="text-muted">
                                        <i className="fas fa-user"></i>
                                        {it.created_by.UserName}
                                    </small>
                                </td>
                                <td className="sorting_1">
                                    <strong>{it.updated_at}</strong>
                                    <br />
                                    <small className="text-muted">
                                        <i className="fas fa-user"></i>{" "}
                                        {it.updated_by.UserName}
                                    </small>
                                </td>
                                <td>
                                    {it.Printed ? (
                                        <i class="fas fa-print fa-lg ml-3 text-dark"></i>
                                    ) : (
                                        ""
                                    )}
                                </td>
                                <td>
                                    <div className="dropdown">
                                        <button
                                            className="btn btn-sm btn-dark dropdown-toggle"
                                            type="button"
                                            id={it.Reference}
                                            data-toggle="dropdown"
                                            aria-haspopup="true"
                                            aria-expanded="false"
                                        >
                                            <span> Action</span>{" "}
                                        </button>
                                        <div
                                            className="dropdown-menu"
                                            aria-labelledby={it.Reference}
                                        >
                                            <a
                                                href={`/packages/label/${it.id}`}
                                                // target="_blank"
                                                id="DownloadLabel"
                                                onClick={() => {
                                                    Inertia.get(
                                                        route("packages.index")
                                                    );
                                                }}
                                                className="dropdown-item"
                                                download
                                            >
                                                <i className="fas fa-download"></i>
                                                <span>Label</span>
                                            </a>
                                            <button
                                                onClick={() => {
                                                    setCurrentID(it.id);
                                                    setChoiceReady(true);
                                                }}
                                                id="MonoReadyShip"
                                                className="dropdown-item"
                                            >
                                                <i className="fas fa-dolly-flatbed"></i>
                                                <span>Ready to Ship</span>
                                            </button>
                                            <button
                                                id="MonoEditPackage"
                                                onClick={() => openEdit(it)}
                                                className="dropdown-item"
                                            >
                                                <i className="fas fa-pencil-alt"></i>
                                                <span>Edit</span>
                                            </button>
                                            <a
                                                href=""
                                                id="MonoReturnCustomer"
                                                className="dropdown-item"
                                            >
                                                <i className="fas fa-undo-alt"></i>
                                                <span>Customer Return</span>
                                            </a>
                                            <button
                                                onClick={() => {
                                                    setCurrentID(it.id);
                                                    setChoiceCancel(true);
                                                }}
                                                id="MonoCancelPackage"
                                                className="dropdown-item"
                                            >
                                                <i className="fas fa-trash"></i>
                                                <span>Cancel</span>
                                            </button>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                    {packages.length == 0 && (
                        <div className="m-2 p-2">There is Not data</div>
                    )}
                </tbody>
            </table>
        </>
    );
}

function Head({ handleShow, workflow, rowSelected }) {
    const [filtersOpen, setFiltersOpen] = useState(false);
    const [filters, setFilter] = useState(null);

    const readyToShips = (ids) => {
        Inertia.post(route("package.readyToShips"), {
            data: ids,
        });
    };
    const cancels = (ids) => {
        Inertia.post(route("package.cancels"), {
            data: ids,
        });
    };
    const [choiceReady, setChoiceReady] = useState(false);
    const [choiceCancel, setChoiceCancel] = useState(false);
    const exportPackages = () => {
        Inertia.post(route("package.export"), {
            filter: filters,
        });
    };
    return (
        <header>
            <Modal
                show={choiceReady}
                onHide={() => setChoiceReady(false)}
                size="md"
            >
                <Choice
                    icon={<i id="modal-icon" class="fas fa-dolly-flatbed"></i>}
                    close={() => setChoiceReady(false)}
                    message={"make this packages ready to ship"}
                    action={() => readyToShips(rowSelected)}
                />
            </Modal>
            <Modal
                show={choiceCancel}
                onHide={() => setChoiceCancel(false)}
                size="md"
            >
                <Choice
                    icon={<i id="modal-icon" className="fas fa-trash-alt"></i>}
                    close={() => setChoiceCancel(false)}
                    message={"cancel this packages"}
                    action={() => cancels(rowSelected)}
                />
            </Modal>
            <div className="">
                <div className=" text-left mb-2">
                    <h1 className="mb-0">Packages</h1>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb m-0 mt-1 p-0 breadcrumbs-chevron">
                            <li className="breadcrumb-item">
                                <Link href="/dashboard">Dashboard</Link>
                            </li>
                            <li
                                className="breadcrumb-item active"
                                aria-current="page"
                            >
                                Packages
                            </li>
                        </ol>
                    </nav>
                </div>
                <div className="d-flex gap-2  justify-content-end">
                    <button
                        onClick={() => handleShow()}
                        id="Create"
                        className="btn btn-success "
                        data-target="#package-create"
                    >
                        <i className="fas fa-plus-circle"></i> Create
                    </button>
                    <button
                        id="Export"
                        onClick={() => {
                            exportPackages();
                        }}
                        className="btn btn-primary "
                    >
                        <i className="fas fa-download"></i> <span>Export</span>
                    </button>
                    <div className="dropdown ">
                        <button
                            className="btn  btn-dark dropdown-toggle"
                            type="button"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                            disabled={Object.keys(rowSelected).length == 0}
                        >
                            <span> Action</span>{" "}
                        </button>
                        <div className="dropdown-menu">
                            <a
                                href={`/labels/package?data=[${Object.values(
                                    rowSelected
                                )}]`}
                                target="_blank"
                                download={true}
                                onClick={(e) => {
                                    console.log(
                                        "selected",
                                        Object.values(rowSelected)
                                    );
                                }}
                                id="DownloadLabel"
                                className="dropdown-item"
                            >
                                <i className="fas fa-download"></i>
                                <span>Label Download</span>
                            </a>
                            <button
                                onClick={(e) => {
                                    setChoiceReady(true);
                                }}
                                id="ReadyShip"
                                className="dropdown-item"
                            >
                                <i className="fas fa-dolly-flatbed"></i>
                                <span>Ready to Ship</span>
                            </button>
                            <button
                                id="MonoEditPackage"
                                className="dropdown-item"
                            >
                                <i className="fas fa-pencil-alt"></i>
                                <span>Edit</span>
                            </button>
                            <a
                                href=""
                                id="MonoReturnCustomer"
                                className="dropdown-item"
                            >
                                <i className="fas fa-undo-alt"></i>
                                <span>Customer Return</span>
                            </a>
                            <button
                                href=""
                                id="MonoCancelPackage"
                                onClick={(e) => {
                                    setChoiceCancel(true);
                                }}
                                className="dropdown-item"
                            >
                                <i className="fas fa-trash"></i>
                                <span>Cancel</span>
                            </button>
                        </div>
                    </div>
                    <button
                        id="Filter"
                        className="btn btn-info "
                        onClick={() => setFiltersOpen(!filtersOpen)}
                    >
                        <i className="fas fa-filter"></i> Filter
                    </button>
                </div>
            </div>
            <Collapse in={filtersOpen}>
                <div id="example-collapse-text">
                    <Filters
                        setFiltersCallBack={(d) => {
                            setFilter(d);
                        }}
                    />
                </div>
            </Collapse>
        </header>
    );
}

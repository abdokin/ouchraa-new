import React, { useState } from "react";
import Base from "../../Layouts/Base";
import { Inertia } from "@inertiajs/inertia";
import { Link } from "@inertiajs/inertia-react";
import BootstrapTable from "react-bootstrap-table-next";
import { SelectSingle } from "../../Components/Filters/Index";

export default function Shippers(props) {
    return (
        <>
            <div className="container-fluid py-4">
                <div className="main-content">
                    <Head />
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
                                                    defaultValue={10}
                                                    className="custom-select custom-select-sm form-control form-control-sm"
                                                    // defaultValue={props.packages.per_page}
                                                    checked={
                                                        props.shippers.per_page
                                                    }
                                                    onChange={(e) =>
                                                        Inertia.get(
                                                            route(
                                                                "config.hub.index",
                                                                {
                                                                    per_page:
                                                                        e.target
                                                                            .value,
                                                                }
                                                            )
                                                        )
                                                    }
                                                >
                                                    <option value="10">
                                                        10
                                                    </option>
                                                    <option value="25">
                                                        25
                                                    </option>
                                                    <option value="50">
                                                        50
                                                    </option>
                                                    <option value="100">
                                                        100
                                                    </option>
                                                </select>{" "}
                                                entries
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                {/* head */}
                                <Table
                                    shippers={props.shippers.data}
                                    drivers={props.drivers}
                                />
                                <div className="row">
                                    <div
                                        className="col-sm-12"
                                        style={{
                                            overflow: "auto",
                                        }}
                                    ></div>
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
                                                {
                                                    props.shippers.per_page
                                                } of {props.shippers.total}{" "}
                                                entries
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
                                                                {link.label ===
                                                                    "»"}
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
            </div>
        </>
    );
}

Shippers.layout = (page) => (
    <Base key={page} children={page} title={"Shippers"} />
);

function Head() {
    return (
        <header>
            <div className="row">
                <div className="col-md-12">
                    <h1 className="mb-0 float-left">Shippers</h1>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb breadcrumbs-chevron float-right">
                            <li className="breadcrumb-item">
                                <a href="">Pickup</a>
                            </li>
                            <li
                                className="breadcrumb-item active"
                                aria-current="page"
                            >
                                Shippers
                            </li>
                        </ol>
                    </nav>
                </div>
            </div>
        </header>
    );
}
function Table({ shippers, drivers }) {
    const [edit, setEdit] = useState(-1);
    const [currendDriver, setCurrentDriver] = useState();

    const updateDriver = (id, driver) => {
        Inertia.post(
            route("pickup.shippers.updateDriver", {
                user: id,
            }),
            {
                driver: driver,
            }
        );
    };
    console.log("shippers", shippers);
    return (
        <div className="row">
            <div className="col-sm-12">
                <table
                    id="tabledata"
                    style={{
                        width: "100%",
                        borderBottom: "1px solid rgb(222, 226, 230)",
                    }}
                    className="table table-2 table-hover table-striped text-nowrap table-responsive dataTable no-footer"
                    role="grid"
                    aria-describedby="tabledata_info"
                >
                    <thead>
                        <tr role="row">
                            <th
                                className="sorting"
                                tabIndex="0"
                                aria-controls="tabledata"
                                rowSpan="1"
                                colSpan="1"
                                style={{ width: " 235.5px" }}
                                aria-label="Shipper Name: activate to sort column ascending"
                                width="15%"
                            >
                                Shipper Name
                            </th>
                            <th
                                className="sorting"
                                tabIndex="0"
                                aria-controls="tabledata"
                                rowSpan="1"
                                colSpan="1"
                                style={{ width: " 180.5px" }}
                                aria-label="Status: activate to sort column ascending"
                                width="12%"
                            >
                                Status
                            </th>
                            <th
                                className="sorting"
                                tabIndex="0"
                                aria-controls="tabledata"
                                rowSpan="1"
                                colSpan="1"
                                style={{ width: " 51.5px" }}
                                aria-label="Total: activate to sort column ascending"
                                width="5%"
                            >
                                Total
                            </th>
                            <th
                                className="sorting"
                                tabIndex="0"
                                aria-controls="tabledata"
                                rowSpan="1"
                                colSpan="1"
                                style={{ width: " 235.5px" }}
                                aria-sort="descending"
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
                                style={{ width: " 327.5px" }}
                                aria-label="Shipper Address: activate to sort column ascending"
                                width="20%"
                            >
                                Shipper Address
                            </th>
                            <th
                                className="sorting"
                                tabIndex="0"
                                aria-controls="tabledata"
                                rowSpan="1"
                                colSpan="1"
                                style={{ width: " 143.5px" }}
                                aria-label="Shipper City: activate to sort column ascending"
                                width="10%"
                            >
                                Shipper City
                            </th>
                            <th
                                className="sorting"
                                tabIndex="0"
                                aria-controls="tabledata"
                                rowSpan="1"
                                colSpan="1"
                                style={{ width: " 236.5px" }}
                                aria-label="Drivers: activate to sort column ascending"
                                width="15%"
                            >
                                Drivers
                            </th>
                            <th
                                className="sorting_disabled"
                                rowSpan="1"
                                colSpan="1"
                                style={{ width: " 127px" }}
                                aria-label=""
                                width="8%"
                            ></th>
                        </tr>
                    </thead>
                    <tbody>
                        {shippers.map((it, index) => {
                            return (
                                <tr role="row" className="odd">
                                    <td>
                                        <strong>{it.UserName} </strong>
                                        <br />
                                        <small className="text-muted">
                                            <i className="fas fa-phone-alt"></i>
                                            {it.ShipperPhone}
                                        </small>
                                    </td>
                                    <td>
                                        <span className="badge bg-info">
                                            Ready to Ship
                                        </span>
                                    </td>
                                    <td>
                                        {it.package_total_ready_to_ship_count}
                                    </td>
                                    <td className="sorting_1">
                                        {it.created_at}
                                    </td>
                                    <td>{it.ShipperAddress}</td>
                                    <td>{it.city.localite}</td>
                                    <td>
                                        {edit !== it.id ? (
                                            <span id="DriverName">
                                                {it.driver.UserName}
                                            </span>
                                        ) : (
                                            <SelectSingle
                                                data={drivers.map((it) => {
                                                    return {
                                                        value: it.id,
                                                        label: it.UserName,
                                                    };
                                                })}
                                                label="Driver"
                                                title={"Driver"}
                                                id="driver_select"
                                                onChange={(v) => {
                                                    console.log(v);
                                                    setCurrentDriver(v)
                                                }}
                                            />
                                        )}
                                    </td>
                                    <td>
                                        {edit !== it.id ? (
                                            <button
                                                id="Edit"
                                                onClick={() => {
                                                    setEdit(it.id);
                                                }}
                                                data-driver="211124111402"
                                                type="button"
                                                className="btn btn-sm btn-success ml-2"
                                            >
                                                <i className="fas fa-shipping-fast"></i>
                                            </button>
                                        ) : (
                                            <button
                                                id="Update"
                                                onClick={() => {
                                                    updateDriver(
                                                        it.id,
                                                        currendDriver
                                                    );
                                                    setEdit(-1);
                                                }}
                                                type="button"
                                                className="btn btn-sm btn-primary ml-2"
                                            >
                                                <i className="fas fa-check-circle"></i>
                                            </button>
                                        )}
                                        <button
                                            id="Picked"
                                            type="button"
                                            className="btn btn-sm btn-warning ml-2"
                                        >
                                            <i className="fas fa-dolly-flatbed"></i>
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <div
                    id="tabledata_processing"
                    className="dataTables_processing card"
                    style={{ display: "none" }}
                >
                    Processing...
                </div>
            </div>
        </div>
    );
}

// const SingleSelect = () => {
//     return (
//         <span
//             className="select2 select2-container select2-container--default select2-container--below"
//             dir="ltr"
//             data-select2-id="1"
//             style={{ width: "403.467px" }}
//         >
//             <span className="selection">
//                 <span
//                     className="select2-selection select2-selection--single"
//                     role="combobox"
//                     aria-haspopup="true"
//                     aria-expanded="false"
//                     tabindex="0"
//                     aria-disabled="false"
//                     aria-labelledby="select2-Drivers-container"
//                 >
//                     <span
//                         className="select2-selection__rendered"
//                         id="select2-Drivers-container"
//                         role="textbox"
//                         aria-readonly="true"
//                         title="Rider02"
//                     >
//                         Rider02
//                     </span>
//                     <span
//                         className="select2-selection__arrow"
//                         role="presentation"
//                     >
//                         <b role="presentation"></b>
//                     </span>
//                 </span>
//             </span>
//             <span className="dropdown-wrapper" aria-hidden="true"></span>
//         </span>
//     );
// };

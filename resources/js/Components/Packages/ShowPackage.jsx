import { useState } from "react";

export function ShowPackage({ packageCurrent }) {
    return (
        <>
            <div
                className="panel panel-light panel-tabbable tabbable-box modal-body"
                style={{ backgroundColor: "#f1f4f7" }}
            >
                <div className="panel-header">
                    <div className="panel-toolbar">
                        <ul className="nav nav-tabs" role="tablist">
                            <li className="nav-item">
                                <a
                                    id="general"
                                    className="nav-link active"
                                    data-toggle="tab"
                                    href="#boxed-tabs-tab-1"
                                    role="tab"
                                    aria-selected="true"
                                >
                                    GENERAL
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className="nav-link"
                                    data-toggle="tab"
                                    href="#boxed-tabs-tab-2"
                                    role="tab"
                                    aria-selected="false"
                                >
                                    COMMINUCATION
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className="nav-link"
                                    data-toggle="tab"
                                    href="#boxed-tabs-tab-3"
                                    role="tab"
                                    aria-selected="false"
                                >
                                    ITEMS
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className="nav-link"
                                    data-toggle="tab"
                                    href="#boxed-tabs-tab-4"
                                    role="tab"
                                    aria-selected="false"
                                >
                                    ATTEMPTS
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className="nav-link"
                                    data-toggle="tab"
                                    href="#boxed-tabs-tab-5"
                                    role="tab"
                                    aria-selected="false"
                                >
                                    HISTORY
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="panel-body p-0">
                    <div className="tab-content">
                        <div
                            className="tab-pane fade active show"
                            id="boxed-tabs-tab-1"
                            aria-expanded="true"
                        >
                            {/* {JSON.stringify(packageData)} */}
                            <h6 className="px-4 pt-4">
                                <i className="fas fa-box mr-1"></i> Package
                                Information
                            </h6>
                            <p className="mb-0"></p>
                            <div
                                className="mx-3 p-3"
                                style={{
                                    borderRadius: "5px",
                                    backgroundColor: "#FFF",
                                    width: "auto",
                                    border: "1px solid #E1E1E3",
                                }}
                            >
                                <dl id="PackageInfo" className="row">
                                    <dt className="col-sm-5">
                                        Tracking Number
                                    </dt>
                                    <dd className="col-sm-7">
                                        {packageCurrent.TrackingNumber}
                                    </dd>
                                    <dt className="col-sm-5">Reference</dt>
                                    <dd className="col-sm-7">
                                        {packageCurrent.Reference}
                                    </dd>
                                    <dt className="col-sm-5">Workflow</dt>
                                    <dd className="col-sm-7">
                                        {packageCurrent.work_flow.WorkflowName}
                                    </dd>
                                    <dt className="col-sm-5">Current Hub</dt>
                                    <dd className="col-sm-7">
                                        {
                                            packageCurrent.first_mile
                                                .ShipmentProviderName
                                        }
                                    </dd>
                                    <dt className="col-sm-5">Master Bag</dt>
                                    <dd className="col-sm-7">Not specified</dd>
                                    <dt className="col-sm-5">Delivery Run</dt>
                                    <dd className="col-sm-7">Not specified</dd>
                                    <dt className="col-sm-5">Driver</dt>
                                    <dd className="col-sm-7">
                                        {packageCurrent.driver?.UserName ??
                                            "Not specified"}
                                    </dd>
                                    <dt className="col-sm-5">Location</dt>
                                    <dd className="col-sm-7">Not specified</dd>
                                    <dt className="col-sm-5">Status</dt>
                                    <dd className="col-sm-7">
                                        <span
                                            className={`badge ${packageCurrent.status.StatusStyle}`}
                                        >
                                            {packageCurrent.status.StatusName}
                                        </span>
                                    </dd>
                                </dl>
                            </div>
                            <p></p>
                            <h6 className="px-4 pt-4">
                                <i className="fas fa-truck mr-1"></i> Shipping
                                Information
                            </h6>
                            <p className="mb-0"></p>
                            <div
                                className="mx-3 p-3"
                                style={{
                                    borderRadius: "5px",
                                    backgroundColor: "#FFF",
                                    width: "auto",
                                    border: "1px solid #E1E1E3",
                                }}
                            >
                                <dl id="ShippingInfo" className="row">
                                    <dt className="col-sm-5">
                                        Shipping Method
                                    </dt>
                                    <dd className="col-sm-7">
                                        <strong>
                                            {
                                                packageCurrent.shipping_method
                                                    .WorkflowName
                                            }
                                        </strong>
                                    </dd>
                                    <dt className="col-sm-5">
                                        Amount to be collecte
                                    </dt>
                                    <dd className="col-sm-7">
                                        <strong>
                                            {packageCurrent.AmountToCollect} Dhs
                                        </strong>
                                    </dd>
                                    <dt className="col-sm-5">Package Amount</dt>
                                    <dd className="col-sm-7">
                                        {packageCurrent.Amount} Dhs
                                    </dd>
                                    <dt className="col-sm-5">Shipping Fee</dt>
                                    <dd className="col-sm-7">
                                        {packageCurrent.ShippingFee} Dhs
                                    </dd>
                                    <dt className="col-sm-5">Declared Value</dt>
                                    <dd className="col-sm-7">
                                        {packageCurrent.DeclaredValue} Dhs
                                    </dd>
                                    <dt className="col-sm-5">Weight</dt>
                                    <dd className="col-sm-7">
                                        {packageCurrent.Weight} KG
                                    </dd>
                                    <dt className="col-sm-5">
                                        Proof of distributed object?
                                    </dt>
                                    <dd className="col-sm-7">
                                        {packageCurrent.ProfDistributedObject
                                            ? "YES"
                                            : "NO"}
                                    </dd>
                                    <dt className="col-sm-5">Fragile?</dt>
                                    <dd className="col-sm-7">
                                        {" "}
                                        {packageCurrent.Fragile ? "YES" : "NO"}
                                    </dd>
                                </dl>
                            </div>
                            <p></p>
                            <h6 className="px-4 pt-4">
                                <i className="fas fa-user-tie mr-1"></i> Shipper
                                Information
                            </h6>
                            <p className="mb-0"></p>
                            <div
                                className="mx-3 p-3"
                                style={{
                                    borderRadius: "5px",
                                    backgroundColor: "#FFF",
                                    width: "auto",
                                    border: "1px solid #E1E1E3",
                                }}
                            >
                                <dl id="ShipperInfo" className="row">
                                    <dt className="col-sm-5">Shipper Name</dt>
                                    <dd className="col-sm-7">
                                        {packageCurrent.ShipperName}
                                    </dd>
                                    <dt className="col-sm-5">Phone Number</dt>
                                    <dd className="col-sm-7">
                                        {packageCurrent.ShipperPhone}
                                    </dd>
                                    <dt className="col-sm-5">Address</dt>
                                    <dd className="col-sm-7">
                                        {packageCurrent.ShipperAddress}
                                    </dd>
                                    <dt className="col-sm-5">City</dt>
                                    <dd className="col-sm-7">
                                        {packageCurrent.shipper_city.localite}
                                    </dd>
                                </dl>
                            </div>
                            <p></p>
                            <h6 className="px-4 pt-4">
                                <i className="fas fa-map-marker-alt mr-1"></i>{" "}
                                Recipient Information
                            </h6>
                            <p className="mb-0"></p>
                            <div
                                className="mx-3 p-3"
                                style={{
                                    borderRadius: "5px",
                                    backgroundColor: "#FFF",
                                    width: "auto",
                                    border: "1px solid #E1E1E3",
                                }}
                            >
                                <dl id="CustomerInfo" className="row">
                                    <dt className="col-sm-5">Recipient Name</dt>
                                    <dd className="col-sm-7">
                                        {packageCurrent.CustomerName}
                                    </dd>
                                    <dt className="col-sm-5">Phone Number</dt>
                                    <dd className="col-sm-7">
                                        {packageCurrent.CustomerPhone}
                                    </dd>
                                    <dt className="col-sm-5">Address</dt>
                                    <dd className="col-sm-7">
                                        {packageCurrent.CustomerAddress}
                                    </dd>
                                    <dt className="col-sm-5">City</dt>
                                    <dd className="col-sm-7">
                                        {packageCurrent.cutomer_city.localite}
                                    </dd>
                                </dl>
                            </div>
                            <p></p>
                        </div>
                        <div
                            className="tab-pane fade"
                            id="boxed-tabs-tab-2"
                            aria-expanded="true"
                        >
                            <h4 className="mb-3">Tab 2 Content</h4>
                            <p className="mb-0">
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Odio provident modi nihil
                                molestiae, dolorum iusto iste in quas ratione,
                                iure quisquam maiores consectetur? Rem nihil
                                vero nisi voluptatibus hic corrupti!
                            </p>
                        </div>
                        <div
                            className="tab-pane fade"
                            id="boxed-tabs-tab-3"
                            aria-expanded="true"
                        >
                            <h4 className="mb-3">Tab 3 Content</h4>
                            <p className="mb-0">
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Odio provident modi nihil
                                molestiae, dolorum iusto iste in quas ratione,
                                iure quisquam maiores consectetur? Rem nihil
                                vero nisi voluptatibus hic corrupti!
                            </p>
                        </div>
                        <div
                            className="tab-pane fade"
                            id="boxed-tabs-tab-4"
                            aria-expanded="true"
                        >
                            <h4 className="mb-3">Tab 4 Content</h4>
                            <p className="mb-0">
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Odio provident modi nihil
                                molestiae, dolorum iusto iste in quas ratione,
                                iure quisquam maiores consectetur? Rem nihil
                                vero nisi voluptatibus hic corrupti!
                            </p>
                        </div>
                        <div
                            className="tab-pane fade overflow-hidden"
                            id="boxed-tabs-tab-5"
                            aria-expanded="true"
                        >
                            <h6 className="px-4 pt-4">
                                <i className="fas fa-history mr-1"></i> Package
                                History
                            </h6>
                            <table
                                style={{ width: "100%", borderSpacing: 0 }}
                                className="table table-2 table-hover table-striped text-nowrap table-responsive"
                            >
                                <thead>
                                    <tr>
                                        <th
                                            className="text-white"
                                            style={{
                                                backgroundColor: "#3c4e6b",
                                                fontSize: "10px",
                                            }}
                                            width="15%"
                                        >
                                            Workflow
                                        </th>
                                        <th
                                            className="text-white"
                                            style={{
                                                backgroundColor: "#3c4e6b",
                                                fontSize: "10px",
                                            }}
                                            width="12%"
                                        >
                                            Action
                                        </th>
                                        <th
                                            className="text-white"
                                            style={{
                                                backgroundColor: "#3c4e6b",
                                                fontSize: "10px",
                                            }}
                                            width="12%"
                                        >
                                            Status
                                        </th>
                                        <th
                                            className="text-white"
                                            style={{
                                                backgroundColor: "#3c4e6b",
                                                fontSize: "10px",
                                            }}
                                            width="16%"
                                        >
                                            Hub
                                        </th>
                                        <th
                                            className="text-white"
                                            style={{
                                                backgroundColor: "#3c4e6b",
                                                fontSize: "10px",
                                            }}
                                            width="15%"
                                        >
                                            Last Update
                                        </th>
                                        <th
                                            className="text-white"
                                            style={{
                                                backgroundColor: "#3c4e6b",
                                                fontSize: "10px",
                                            }}
                                            width="15%"
                                        >
                                            Update By
                                        </th>
                                        <th
                                            className="text-white"
                                            style={{
                                                backgroundColor: "#3c4e6b",
                                                fontSize: "10px",
                                            }}
                                            width="15%"
                                        >
                                            Delivery ID
                                        </th>
                                    </tr>
                                </thead>
                                <tbody id="TableHistory">
                                    {packageCurrent.history.map((it) => {
                                        return (
                                            <tr>
                                                <td>
                                                    <small>
                                                        {
                                                            it.work_flow
                                                                .WorkflowName
                                                        }
                                                    </small>
                                                </td>
                                                <td>
                                                    <small>
                                                        {it.action.ActionName}
                                                    </small>
                                                </td>
                                                <td>
                                                    <small
                                                        className={`badge ${it.status.StatusStyle}`}
                                                    >
                                                        {it.status.StatusName}
                                                    </small>
                                                </td>
                                                <td>
                                                    <small>
                                                        {
                                                            it.hub
                                                                .ShipmentProviderName
                                                        }
                                                    </small>
                                                </td>
                                                <td>
                                                    <small>
                                                        {it.created_at}
                                                    </small>
                                                </td>
                                                <td>
                                                    <small>
                                                        {it?.updated_by
                                                            ?.UserName ??
                                                            "Not Specified"}
                                                    </small>
                                                </td>
                                                <td>
                                                    <small>
                                                        {it.driver?.UserName ??
                                                            "Not Specified"}
                                                    </small>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="modal-footer">
                    <button
                        type="button"
                        className="btn btn-secondary"
                        data-dismiss="modal"
                    >
                        Back
                    </button>
                </div> */}
            {/* </div> */}
        </>
    );
}

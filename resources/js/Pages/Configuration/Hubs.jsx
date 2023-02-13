import { Link, usePage } from "@inertiajs/inertia-react";
import { useForm } from "@inertiajs/inertia-react";
import Form from "react-bootstrap/Form";
import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";

import Switch from "react-switchery-component";
import {
    DateRangePicker,
    Select,
    SelectNotMulti,
} from "../../Components/Filters/Index";
import ConfigLayout from "../../Layouts/Config";
import { Inertia } from "@inertiajs/inertia";
import { useLocalStorage, useMap } from "react-use";
import { FileUploader } from "react-drag-drop-files";

export default function Hubs(props) {
    const [create, setCreate] = useState(false);
    const [edit, setEdit] = useState(false);
    const [upload, setUpload] = useState(false);

    const [currentRow, setCurrentRow] = useState();

    const [map, { set, setAll, remove, reset }] = useMap();

    return (
        <div className="container-fluid">
            <Head openCreate={() => setCreate(true)} selected={map} />
            <br />
            <br />
            <Modal
                show={create}
                onHide={() => setCreate(false)}
                backdrop="static"
                keyboard={false}
                size="xl"
            >
                <CreateModal handleClose={() => setCreate(false)} />
            </Modal>
            <Modal show={edit} onHide={() => setEdit(false)} size="xl">
                <EditModal
                    row={currentRow}
                    handleClose={() => setEdit(false)}
                />
            </Modal>
            <Modal
                show={upload}
                onHide={() => setUpload(false)}
                // backdrop="static"
                // keyboard={false}
                size="md"
            >
                <UploadModal id={currentRow} close={() => setUpload(false)} />
            </Modal>
            <Table
                openUpload={(row) => {
                    setUpload(true);
                }}
                openEdit={(row) => {
                    setCurrentRow(row);
                    console.log(row);
                    setEdit(true);
                }}
                hubs={props.hubs}
                map={map}
                reset={reset}
                remove={remove}
                set={set}
                setAll={setAll}
            />
        </div>
    );
}

Hubs.layout = (page) => (
    <ConfigLayout key={page} children={page} title={"Hubs"} />
);

const Table = ({
    hubs,
    map,
    set,
    setAll,
    remove,
    reset,
    openEdit,
    openUpload,
}) => {
    const Enable = (id, value) => {
        Inertia.post(
            route("config.hub.enable", {
                shipmentProvider: id,
            }),
            {
                enable: value,
            }
        );
    };
    const AutoTn = (id, value) => {
        console.log("value", value);
        Inertia.post(
            route("config.hub.autoTn", {
                shipmentProvider: id,
            }),
            {
                enable: value,
            }
        );
    };
    const hubsId = hubs.map((it) => it.id);
    console.log("hubs", hubs);
    return (
        <div className="row">
            <div className="col-sm-12 min-vh-100">
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
                    <thead>
                        <tr role="row" className="">
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
                                                setAll({ ...hubsId });
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
                                className="sorting_disabled"
                                rowSpan="1"
                                colSpan="1"
                                style={{ width: "30px" }}
                                aria-label=""
                                width="2%"
                            ></th>
                            <th
                                className="sorting"
                                tabIndex="0"
                                aria-controls="tabledata"
                                rowSpan="1"
                                colSpan="1"
                                style={{
                                    width: "13.5px",
                                }}
                                aria-label="ID: activate to sort column ascending"
                                width="3%"
                            >
                                ID
                            </th>
                            <th
                                className="sorting"
                                tabIndex="0"
                                aria-controls="tabledata"
                                rowSpan="1"
                                colSpan="1"
                                style={{
                                    width: "96.5px",
                                }}
                                aria-label="Hub: activate to sort column ascending"
                                width="19%"
                            >
                                Hub
                            </th>
                            <th
                                className="sorting"
                                tabIndex="0"
                                aria-controls="tabledata"
                                rowSpan="1"
                                colSpan="1"
                                style={{
                                    width: "99.5px",
                                }}
                                aria-label="Hub Type: activate to sort column ascending"
                                width="14%"
                            >
                                Hub Type
                            </th>
                            <th
                                className="sorting"
                                tabIndex="0"
                                aria-controls="tabledata"
                                rowSpan="1"
                                colSpan="1"
                                style={{
                                    width: "102.5px",
                                }}
                                aria-label="Created Date: activate to sort column ascending"
                                width="16%"
                            >
                                Created Date
                            </th>
                            <th
                                className="sorting"
                                tabIndex="0"
                                aria-controls="tabledata"
                                rowSpan="1"
                                colSpan="1"
                                style={{
                                    width: "109.5px",
                                }}
                                aria-label="Last Update: activate to sort column ascending"
                                width="16%"
                            >
                                Last Update
                            </th>
                            <th
                                className="sorting"
                                tabIndex="0"
                                aria-controls="tabledata"
                                rowSpan="1"
                                colSpan="1"
                                style={{
                                    width: "48.5px",
                                }}
                                aria-label="Status: activate to sort column ascending"
                                width="9%"
                            >
                                Status
                            </th>
                            <th
                                className="sorting_disabled"
                                rowSpan="1"
                                colSpan="1"
                                style={{ width: "46px" }}
                                ari-label="Enable"
                                width="6%"
                            >
                                Enable
                            </th>
                            <th
                                className="sorting_disabled"
                                rowSpan="1"
                                colSpan="1"
                                style={{ width: "121px" }}
                                ari-label="Tracking Number"
                                width="4%"
                            >
                                Tracking Number
                            </th>
                            <th
                                className="sorting_disabled"
                                rowSpan="1"
                                colSpan="1"
                                style={{ width: "57px" }}
                                ari-label="Random"
                                width="4%"
                            >
                                Random
                            </th>
                            <th
                                className="sorting_disabled"
                                rowSpan="1"
                                colSpan="1"
                                style={{ width: "80px" }}
                                ari-label=""
                                width="6%"
                            ></th>
                        </tr>
                    </thead>
                    <tbody>
                        {hubs.map((it, index) => {
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
                                    <td className="sorting_1">
                                        <img
                                            src="/storage/logos/test01.png"
                                            className="avatar avatar-1 rounded-circle" //
                                            alt="Avatar image"
                                        />
                                    </td>
                                    <td>{it.id}</td>
                                    <td>{it.ShipmentProviderName}</td>
                                    <td>{it.hubtype.ShipmentType}</td>
                                    <td>
                                        <strong>{it.created_at}</strong>
                                        <br />
                                        <small className="text-muted">
                                            <i className="fas fa-user"></i>
                                            {it?.owner?.UserName}
                                        </small>
                                    </td>
                                    <td>
                                        <strong>{it.updated_at}</strong>
                                        <br />
                                        <small className="text-muted">
                                            <i className="fas fa-user"></i>
                                            {it?.owner?.UserName}
                                        </small>
                                    </td>
                                    <td>
                                        <span
                                            className={`badge badge-pill ${
                                                it.Status
                                                    ? "badge-success"
                                                    : "badge-danger"
                                            }`}
                                        >
                                            {it.Status ? "Enable" : "Desable"}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="checkbox mt-2">
                                            <Switch
                                                id="color-example"
                                                checked={it.Status}
                                                onChange={() => {
                                                    // setEnable(!it.S)
                                                    Enable(it.id, !it.Status);
                                                }}
                                            />
                                        </div>
                                    </td>
                                    <td>
                                        {it.AutoTN ? (
                                            <>
                                                <i className="fas fa-random"></i>{" "}
                                                Random
                                            </>
                                        ) : (
                                            <span>
                                                {it?.tpl_tracking_count} of
                                                Tracking Numbers Left
                                            </span>
                                        )}
                                    </td>
                                    <td>
                                        <div className="checkbox mt-2">
                                            <Switch
                                                id="color-example"
                                                checked={it.AutoTN}
                                                onChange={() => {
                                                    // setHasAccount(!hasAccount)
                                                    AutoTn(it.id, !it.AutoTN);
                                                }}
                                            />
                                        </div>
                                    </td>
                                    <td>
                                        <button
                                            id="Upload"
                                            data-hub="17"
                                            type="button"
                                            className="btn btn-sm btn-dark ml-2"
                                            disabled={it.AutoTN}
                                            onClick={() => openUpload(it)}
                                        >
                                            <i className="fas fa-cloud-upload-alt"></i>
                                        </button>
                                        <button
                                            id="Edit"
                                            data-hub="17"
                                            type="button"
                                            onClick={() => openEdit(it)}
                                            className="btn btn-sm btn-success ml-2"
                                        >
                                            <i className="fas fa-pen"></i>
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
};

const Head = ({ openCreate, selected }) => {
    const Enable = (value) => {
        Inertia.post(route("config.hub.enableAll"), {
            hubs: selected,
            value: value,
        });
    };
    const { hubsType } = usePage().props;
    // const [selectedHub, setSelectedHubs] = useLocalStorage('hubs_hub',[]);
    const [selectedHubType, setSelectedHubTypes] = useLocalStorage(
        "hubs_hubtype",
        []
    );
    const [status, setStatus] = useLocalStorage("hubs_hubstatus", []);
    const [createdAt, setCreatedAt] = useState([
        {
            startDate: new Date(),
            endDate: undefined,
            key: "selection",
        },
    ]);
    const [updateAt, setUpdatedAt] = useState([
        {
            startDate: new Date(),
            endDate: null,
            key: "selection",
        },
    ]);
    const resetFilter = () => {
        setSelectedHubTypes([]);
        setStatus([]);
        Inertia.get(route("config.hubs"));
    };
    return (
        <div id="FilterSelector" className="panel panel-light">
            <div className="panel-body p-3">
                <div className="form-row">
                    <div className="form-group col-md-2">
                        <Select
                            options={hubsType.map((it) => {
                                return {
                                    value: it.id,
                                    label: it.ShipmentType,
                                };
                            })}
                            label={"Hub Type"}
                            onChange={setSelectedHubTypes}
                            value={selectedHubType}
                        />{" "}
                    </div>
                    <div className="form-group col-md-2">
                        <SelectNotMulti
                            label={"Status"}
                            onChange={setStatus}
                            value={status}
                            options={[
                                { value: 1, label: "Enable" },
                                { value: 0, label: "Disable" },
                            ]}
                        />
                    </div>
                    <div className="form-group col-md-3">
                        <DateRangePicker
                            label={"Created Date"}
                            id="created_at"
                            state={createdAt}
                            setState={setCreatedAt}
                        />
                    </div>
                    <div className="form-group col-md-3">
                        <DateRangePicker
                            label={"updated Date"}
                            id="updated_at"
                            state={updateAt}
                            setState={setUpdatedAt}
                        />
                    </div>
                </div>
            </div>
            <div className="panel-footer d-flex justify-content-between">
                <div>
                    <div className="dropdown mr-l">
                        <button
                            className="btn btn-primary px-3 ml-2 dropdown-toggle"
                            type="button"
                            id="dropdownMenuButtonDefault"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                            disabled={Object.keys(selected).length == 0}
                        >
                            Action{" "}
                        </button>
                        <div
                            className="dropdown-menu"
                            aria-labelledby="dropdownMenuButtonDefault"
                        >
                            <button
                                onClick={() => Enable(true)}
                                id="MultiEnableHubs"
                                data-packageid=""
                                className="dropdown-item "
                            >
                                <i className="fas fa-unlock"></i>
                                <span>Enable</span>
                            </button>
                            <button
                                onClick={() => Enable(false)}
                                id="MultiDisableHubs"
                                data-packageid=""
                                className="dropdown-item "
                            >
                                <i className="fas fa-lock"></i>
                                <span>Disable</span>
                            </button>
                        </div>
                    </div>
                    <button
                        id="Create"
                        onClick={() => openCreate()}
                        type="button"
                        className="btn btn-success px-3 ml-2 float-left"
                    >
                        Create
                    </button>
                </div>
                <div>
                    <button
                        id="Reset"
                        onClick={() => resetFilter()}
                        type="button"
                        className="btn btn-danger px-3 mr-2 float-right"
                    >
                        Reset
                    </button>
                    <Link
                        id="FilterSubmit"
                        type="submit"
                        className="btn btn-primary"
                        href={`?${
                            selectedHubType.length > 0
                                ? `filter[hubtype]=${selectedHubType.map(
                                      (it) => it.value
                                  )}`
                                : ""
                        }${
                            status.length > 0
                                ? `&filter[status]=${status.map(
                                      (it) => it.value
                                  )}`
                                : ""
                        }${
                            createdAt[0].endDate
                                ? `&filter[created_in]=${createdAt[0].startDate.toLocaleDateString()},${createdAt[0].endDate.toLocaleDateString()}`
                                : ""
                        }${
                            updateAt[0].endDate
                                ? `&filter[updated_in]=${updateAt[0].startDate.toLocaleDateString()},${updateAt[0].endDate.toLocaleDateString()}`
                                : ""
                        }`}
                    >
                        Filter
                    </Link>
                    <button
                        id="ExportButton"
                        type="button"
                        className="btn btn-primary ladda-button px-3 mr-2 float-right"
                        data-style="slide-right"
                    >
                        <span className="ladda-label">Export</span>
                        <span className="ladda-spinner"></span>
                    </button>
                </div>
            </div>
        </div>
    );
};

function CreateModal({ handleClose }) {
    const { hubs, workflows, cities, hubsType } = usePage().props;
    const { data, setData, post, reset, errors } = useForm();

    const onChange = (e) => setData({ ...data, [e.target.id]: e.target.value });
    // onChangeCheck
    const onChangeCheck = (e) =>
        setData({ ...data, [e.target.id]: JSON.parse(e.target.value) });
    const onSubmit = (e) => {
        e.preventDefault();
        console.log(data);
        post(route("config.hub.create"), {
            data,
            onSuccess: () => {
                reset(), handleClose();
            },
        });
    };
    return (
        <form onSubmit={onSubmit}>
            {/* <div className="modal-content"> */}
            <div className="modal-header">
                <h5 className="modal-title">Create</h5>
                <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={() => handleClose()}
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
                <div className="form-row">
                    <div className="col-md-6">
                        <label for="ShipmentProviderName">
                            Hub Name: <i></i>
                        </label>
                        <input
                            id="ShipmentProviderName"
                            type="text"
                            onChange={onChange}
                            className="form-control"
                            placeholder="Enter hub name here..."
                        />

                        {errors && (
                            <div className="text-danger mt-1">
                                {errors.ShipmentProviderName}
                            </div>
                        )}
                    </div>
                    <div className="col-md-6">
                        <label for="ShipmentProviderAddress">
                            Hub Address: <i></i>
                        </label>
                        <input
                            id="ShipmentProviderAddress"
                            type="text"
                            onChange={onChange}
                            className="form-control"
                            placeholder="Enter hub address here..."
                        />
                        {errors && (
                            <div className="text-danger mt-1">
                                {errors.ShipmentProviderAddress}
                            </div>
                        )}
                    </div>
                </div>
                <div className="form-row mt-3">
                    <div className="col-md-6">
                        <label for="ShipmentProviderPhone">
                            Hub Phone: <i></i>
                        </label>
                        <input
                            id="ShipmentProviderPhone"
                            type="text"
                            onChange={onChange}
                            className="form-control"
                            placeholder="+212661234567"
                        />
                        {errors && (
                            <div className="text-danger mt-1">
                                {errors.ShipmentProviderPhone}
                            </div>
                        )}
                    </div>
                    <div className="col-md-6">
                        <label for="CreateHubCity">
                            Hub City: <i></i>
                        </label>
                        <Form.Select
                            id="ShipmentProviderCity"
                            value={data.ShipmentProviderCity}
                            onChange={onChange}
                            title="Select City..."
                            className=" form-control"
                        >
                            <option></option>
                            {cities.map((it) => {
                                return (
                                    <option value={it.id}>{it.localite}</option>
                                );
                            })}
                        </Form.Select>{" "}
                    </div>
                </div>
                <div className="form-row mt-3">
                    <div className="col-md-6">
                        <label for="Type">
                            Hub Type: <i></i>
                        </label>
                        {/* <SelectPanel
                            options={hubsType.map((it) => {
                                return { value: it.id, label: it.ShipmentType };
                            })}
                            value={[]}
                            onChange={(value) => {console.log(value)}}
                            labelledBy={'Hub-type'}
                        /> */}
                        <Form.Select
                            id="Type"
                            value={data.Type}
                            onChange={onChange}
                            title="Select Type..."
                            className=" form-control"
                        >
                            <option></option>
                            {hubsType.map((it) => {
                                return (
                                    <option value={it.id}>
                                        {it.ShipmentType}
                                    </option>
                                );
                            })}
                        </Form.Select>{" "}
                    </div>
                    <div className="col-md-6">
                        <label for="TemplateID">
                            Hub Template: <i></i>
                        </label>
                        <Form.Select
                            id="TemplateID"
                            value={data.TemplateID}
                            onChange={onChange}
                            title="Select Type..."
                            className=" form-control"
                        >
                            <option></option>
                            {hubsType.map((it) => {
                                return (
                                    <option value={it.id}>
                                        {it.ShipmentType}
                                    </option>
                                );
                            })}
                        </Form.Select>
                    </div>
                </div>
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
                    onClick={() => handleClose()}
                    className="btn btn-secondary"
                    data-dismiss="modal"
                >
                    Back
                </button>
            </div>
            {/* </div> */}
        </form>
    );
}

function EditModal({ handleClose, row }) {
    const { hubs, workflows, cities, hubsType } = usePage().props;
    const { data, setData, post, reset, errors } = useForm({
        ...row,
    });

    const onChange = (e) => setData({ ...data, [e.target.id]: e.target.value });
    // onChangeCheck
    const onChangeCheck = (e) =>
        setData({ ...data, [e.target.id]: JSON.parse(e.target.value) });
    const onSubmit = (e) => {
        e.preventDefault();
        console.log(data);
        post(
            route("config.hub.update", {
                shipmentProvider: row.id,
            }),
            {
                data,
                onSuccess: () => {
                    reset(), handleClose();
                },
            }
        );
    };
    return (
        <form onSubmit={onSubmit}>
            {JSON.stringify(errors)}
            {/* <div className="modal-content"> */}
            <div className="modal-header">
                <h5 className="modal-title">Edit Hub </h5>
                <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={() => handleClose()}
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
                <div className="form-row">
                    <div className="col-md-6">
                        <label for="ShipmentProviderName">
                            Hub Name: <i></i>
                        </label>
                        <input
                            id="ShipmentProviderName"
                            type="text"
                            onChange={onChange}
                            value={data.ShipmentProviderName}
                            className="form-control"
                            placeholder="Enter hub name here..."
                        />

                        {errors && (
                            <div className="text-danger mt-1">
                                {errors.ShipmentProviderName}
                            </div>
                        )}
                    </div>
                    <div className="col-md-6">
                        <label for="ShipmentProviderAddress">
                            Hub Address: <i></i>
                        </label>
                        <input
                            id="ShipmentProviderAddress"
                            type="text"
                            onChange={onChange}
                            value={data.ShipmentProviderAddress}
                            className="form-control"
                            placeholder="Enter hub address here..."
                        />
                        {errors && (
                            <div className="text-danger mt-1">
                                {errors.ShipmentProviderAddress}
                            </div>
                        )}
                    </div>
                </div>
                <div className="form-row mt-3">
                    <div className="col-md-6">
                        <label for="ShipmentProviderPhone">
                            Hub Phone: <i></i>
                        </label>
                        <input
                            id="ShipmentProviderPhone"
                            type="text"
                            onChange={onChange}
                            value={data.ShipmentProviderPhone}
                            className="form-control"
                            placeholder="+212661234567"
                        />
                        {errors && (
                            <div className="text-danger mt-1">
                                {errors.ShipmentProviderPhone}
                            </div>
                        )}
                    </div>
                    <div className="col-md-6">
                        <label for="CreateHubCity">
                            Hub City: <i></i>
                        </label>
                        <Form.Select
                            id="ShipmentProviderCity"
                            value={data.ShipmentProviderCity}
                            onChange={onChange}
                            title="Select City..."
                            className=" form-control"
                        >
                            <option></option>
                            {cities.map((it) => {
                                return (
                                    <option value={it.id}>{it.localite}</option>
                                );
                            })}
                        </Form.Select>{" "}
                    </div>
                </div>
                <div className="form-row mt-3">
                    <div className="col-md-6">
                        <label for="Type">
                            Hub Type: <i></i>
                        </label>
                        {/* <SelectPanel
                            options={hubsType.map((it) => {
                                return { value: it.id, label: it.ShipmentType };
                            })}
                            value={[]}
                            onChange={(value) => {console.log(value)}}
                            labelledBy={'Hub-type'}
                        /> */}
                        <Form.Select
                            id="Type"
                            value={data.Type}
                            onChange={onChange}
                            title="Select Type..."
                            className=" form-control"
                        >
                            <option></option>
                            {hubsType.map((it) => {
                                return (
                                    <option value={it.id}>
                                        {it.ShipmentType}
                                    </option>
                                );
                            })}
                        </Form.Select>{" "}
                    </div>
                    <div className="col-md-6">
                        <label for="TemplateID">
                            Hub Template: <i></i>
                        </label>
                        <Form.Select
                            id="TemplateID"
                            value={data.TemplateID}
                            onChange={onChange}
                            title="Select Type..."
                            className=" form-control"
                        >
                            <option></option>
                            {hubsType.map((it) => {
                                return (
                                    <option value={it.id}>
                                        {it.ShipmentType}
                                    </option>
                                );
                            })}
                        </Form.Select>
                    </div>
                </div>
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
                    onClick={() => handleClose()}
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                >
                    Back
                </button>
            </div>
            {/* </div> */}
        </form>
    );
}
function UploadModal({ close, id }) {
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
        post(route("config.hub.upload"), {
            data,
            onSuccess: () => {
                close();
            },
        });
        console.log("data", data);
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
                    onClick={() => close()}
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
                <a
                    id="UploadTemplate"
                    href="/storage/templates/TPL_Upload.csv"
                    className="btn btn-primary float-left"
                >
                    <i className="fas fa-download"></i> Template
                </a>
                <button
                    type="button"
                    className="btn btn-light ml-auto"
                    data-dismiss="modal"
                    onClick={() => close()}
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

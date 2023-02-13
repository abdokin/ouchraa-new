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

export default function Cities(props) {
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
                size="lg"
            >
                <CreateModal handleClose={() => setCreate(false)} />
            </Modal>
            <Modal show={edit} onHide={() => setEdit(false)} size="lg">
                <EditModal
                    row={currentRow}
                    handleClose={() => setEdit(false)}
                />
            </Modal>
            {/*

            <Modal
                show={upload}
                onHide={() => setUpload(false)}
                // backdrop="static"
                // keyboard={false}
                size="md"
            >
                <UploadModal id={currentRow} close={() => setUpload(false)} />
            </Modal>
    */}
            <Table
                cities={props.cities}
                openUpload={(row) => {
                    setUpload(true);
                }}
                openEdit={(row) => {
                    setCurrentRow(row);
                    console.log(row);
                    setEdit(true);
                }}
                map={map}
                reset={reset}
                remove={remove}
                set={set}
                setAll={setAll}
            />
        </div>
    );
}

Cities.layout = (page) => (
    <ConfigLayout key={page} children={page} title={"Hubs"} />
);

const Table = ({
    map,
    set,
    setAll,
    remove,
    reset,
    openEdit,
    openUpload,
    cities,
}) => {
    // const { cities } = usePage().props;
    const [currentID, setCurrentID] = useState(-1);
    const [show, setShow] = useState(false);
    const Enable = (id, value) => {
        Inertia.post(
            route("config.cities.enable", {
                city: id,
            }),
            {
                enable: value,
            }
        );
    };
    const Delete = (id) => {
        Inertia.post(
            route("config.cities.delete", {
                city: id,
            })
        );
    };
    const citiesId = cities.map((it) => it.id);
    return (
        <div className="row">
            <Modal show={show} onHide={() => setShow(false)} size="md">
                <Choice
                    close={() => setShow(false)}
                    message={"Delete this City"}
                    action={() => Delete(currentID)}
                />
            </Modal>
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
                                                setAll({ ...citiesId });
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
                                City
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
                                ZIP CODE
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
                                LAST MILE
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
                                style={{ width: "80px" }}
                                ari-label=""
                                width="6%"
                            ></th>
                        </tr>
                    </thead>
                    <tbody>
                        {cities.map((it, index) => {
                            return (
                                <tr role="row" className="odd">
                                    <td>
                                        <div className="custom-control custom-checkbox custom-checkbox-2 d-block">
                                            <input
                                                id={it.id}
                                                data-name="Cities"
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
                                    <td>{it.id}</td>
                                    <td>
                                        <strong>{it.localite}</strong>
                                        <br />
                                        <small className="text-muted">
                                            <i className="fas fa-map-marker-alt"></i>{" "}
                                            {it.region_postal}
                                        </small>
                                    </td>
                                    <td>{it.code_postal}</td>
                                    <td className="sorting_1">
                                        <strong>
                                            {
                                                it.shipment_provider
                                                    ?.ShipmentProviderName
                                            }{" "}
                                            <i></i>
                                        </strong>
                                        <br />
                                        <small className="text-muted">
                                            <i className="fas fa-traffic-light"></i>{" "}
                                            {
                                                it.shipment_provider?.hubtype
                                                    ?.ShipmentType
                                            }
                                        </small>
                                    </td>
                                    <td>
                                        <strong>{it.created_at}</strong>
                                        <br />
                                        <small className="text-muted">
                                            <i className="fas fa-user"></i>{" "}
                                            {it.creator?.UserName}
                                        </small>
                                    </td>
                                    <td>
                                        <strong>{it.updated_at}</strong>
                                        <br />
                                        <small className="text-muted">
                                            <i className="fas fa-user"></i>{" "}
                                            {it?.updater?.UserName}
                                        </small>
                                    </td>
                                    <td>
                                        <span
                                            className={`badge badge-pill ${
                                                it.status
                                                    ? "badge-success"
                                                    : "badge-danger"
                                            }`}
                                        >
                                            {it.status ? "Enabled" : "Desable"}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="checkbox mt-2">
                                            <Switch
                                                id="color-example"
                                                checked={it.status}
                                                onChange={() => {
                                                    Enable(it.id, !it.status);
                                                }}
                                            />
                                        </div>
                                    </td>
                                    <td>
                                        <button
                                            id="Edit"
                                            dataCity="421"
                                            type="button"
                                            onClick={() => openEdit(it)}
                                            className="btn btn-sm btn-success ml-2"
                                        >
                                            <i className="fas fa-pen"></i>
                                        </button>
                                        <button
                                            id="Delete"
                                            onClick={() => {
                                                setShow(true)
                                                setCurrentID(it.id)
                                            }}
                                            data-city="421"
                                            type="button"
                                            className="btn btn-sm btn-danger ml-2"
                                        >
                                            <i className="fas fa-trash-alt"></i>
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
                    style={{ display: cities.length > 0 ? "none" : "block" }}
                >
                    {/* Processing... */}
                    No Data
                </div>
            </div>
        </div>
    );
};

const Head = ({ openCreate, selected }) => {
    const Enable = (value) => {
        Inertia.post(route("config.cities.enableAll"), {
            cities: selected,
            value: value,
        });
    };
    const { hubs, cities } = usePage().props;
    const [selectedHubType, setSelectedHubTypes] = useLocalStorage(
        "cities_hubtype",
        []
    );
    const [selectedCities, setSelectedCities] = useLocalStorage(
        "cities_cities",
        []
    );

    const [status, setStatus] = useLocalStorage("cities_hubstatus", []);
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
        Inertia.get(route("config.cities"));
    };
    return (
        <div id="FilterSelector" className="panel panel-light">
            <div className="panel-body p-3">
                <div className="form-row">
                    <div className="form-group col-md-2">
                        <Select
                            options={cities.map((it) => {
                                return {
                                    value: it.id,
                                    label: it.localite,
                                };
                            })}
                            label={"Cities"}
                            onChange={setSelectedCities}
                            value={selectedCities}
                        />{" "}
                    </div>
                    <div className="form-group col-md-2">
                        <Select
                            options={hubs.map((it) => {
                                return {
                                    value: it.id,
                                    label: it.ShipmentProviderName,
                                };
                            })}
                            label={" Last Mile Hub  "}
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
    const { hubs } = usePage().props;
    const { data, setData, post, reset, errors } = useForm();

    const onChange = (e) => setData({ ...data, [e.target.id]: e.target.value });
    const onSubmit = (e) => {
        e.preventDefault();
        console.log(data);
        post(route("config.cities.store"), {
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
                <div className="form-group">
                    <label for="Localite">
                        City Localite: <i></i>
                    </label>
                    <input
                        id="localite"
                        type="text"
                        onChange={onChange}
                        className="form-control"
                        placeholder="Enter city name here..."
                    />
                    {errors && (
                        <div className="text-danger mt-1">
                            {errors.localite}
                        </div>
                    )}
                </div>
                <div className="form-group mt-3">
                    <label for="code_postal">
                        City code Postal: <i></i>
                    </label>
                    <input
                        id="code_postal"
                        type="text"
                        onChange={onChange}
                        className="form-control"
                        placeholder="Enter Code Postal  here..."
                    />
                    {errors && (
                        <div className="text-danger mt-1">
                            {errors.code_postal}
                        </div>
                    )}
                </div>
                <div className="form-group mt-3">
                    <label for="code_pays">
                        City code pays: <i></i>
                    </label>
                    <input
                        id="code_pays"
                        onChange={onChange}
                        type="text"
                        className="form-control"
                        placeholder="Enter Code pays  here..."
                    />
                    {errors && (
                        <div className="text-danger mt-1">
                            {errors.code_pays}
                        </div>
                    )}
                </div>
                <div className="form-group mt-3">
                    <label for="province">
                        City province: <i></i>
                    </label>
                    <input
                        id="province"
                        onChange={onChange}
                        type="text"
                        className="form-control"
                        placeholder="Enter province here..."
                    />
                    {errors && (
                        <div className="text-danger mt-1">
                            {errors.province}
                        </div>
                    )}
                </div>
                <div className="form-group mt-3">
                    <label for="region_postal">
                        City region postal: <i></i>
                    </label>
                    <input
                        id="region_postal"
                        onChange={onChange}
                        type="text"
                        className="form-control"
                        placeholder="Enter region postal here..."
                    />
                    {errors && (
                        <div className="text-danger mt-1">
                            {errors.region_postal}
                        </div>
                    )}
                </div>
                <div className="form-group mt-3">
                    <label for="LastMileHub">
                        Last Mile Hub: <i></i>
                    </label>
                    <Form.Select
                        id="LastMileHub"
                        value={data.LastMileHub}
                        onChange={onChange}
                        title="Select LastMileHub..."
                        className=" form-control"
                    >
                        <option></option>
                        {hubs.map((it) => {
                            return (
                                <option value={it.id}>
                                    {it?.ShipmentProviderName}
                                </option>
                            );
                        })}
                    </Form.Select>{" "}
                    {errors && (
                        <div className="text-danger mt-1">
                            {errors.LastMileHub}
                        </div>
                    )}
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
    const { hubs } = usePage().props;
    const { data, setData, post, reset, errors } = useForm({
        ...row,
    });

    const onChange = (e) => setData({ ...data, [e.target.id]: e.target.value });
    // onChangeCheck
    const onSubmit = (e) => {
        e.preventDefault();
        console.log(data);
        post(
            route("config.cities.update", {
                city: row.id,
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
            <div className="modal-header">
                <h5 className="modal-title">Edit City </h5>
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
                <div className="form-group">
                    <label for="Localite">
                        City Localite: <i></i>
                    </label>
                    <input
                        id="localite"
                        onChange={onChange}
                        type="text"
                        value={data.localite}
                        className="form-control"
                        placeholder="Enter city name here..."
                    />
                    {errors && (
                        <div className="text-danger mt-1">
                            {errors.localite}
                        </div>
                    )}
                </div>
                <div className="form-group mt-3">
                    <label for="code_postal">
                        City code Postal: <i></i>
                    </label>
                    <input
                        id="code_postal"
                        type="text"
                        onChange={onChange}
                        value={data.code_postal}
                        className="form-control"
                        placeholder="Enter Code Postal  here..."
                    />
                    {errors && (
                        <div className="text-danger mt-1">
                            {errors.code_postal}
                        </div>
                    )}
                </div>
                <div className="form-group mt-3">
                    <label for="code_pays">
                        City code pays: <i></i>
                    </label>
                    <input
                        id="code_pays"
                        type="text"
                        onChange={onChange}
                        value={data.code_pays}
                        className="form-control"
                        placeholder="Enter Code pays  here..."
                    />
                    {errors && (
                        <div className="text-danger mt-1">
                            {errors.code_pays}
                        </div>
                    )}
                </div>
                <div className="form-group mt-3">
                    <label for="province">
                        City province: <i></i>
                    </label>
                    <input
                        id="province"
                        type="text"
                        onChange={onChange}
                        value={data.province}
                        className="form-control"
                        placeholder="Enter province here..."
                    />
                    {errors && (
                        <div className="text-danger mt-1">
                            {errors.province}
                        </div>
                    )}
                </div>
                <div className="form-group mt-3">
                    <label for="region_postal">
                        City region postal: <i></i>
                    </label>
                    <input
                        id="region_postal"
                        type="text"
                        onChange={onChange}
                        value={data.region_postal}
                        className="form-control"
                        placeholder="Enter region postal here..."
                    />
                    {errors && (
                        <div className="text-danger mt-1">
                            {errors.region_postal}
                        </div>
                    )}
                </div>
                <div className="form-group mt-3">
                    <label for="LastMileHub">
                        Last Mile Hub: <i></i>
                    </label>
                    <Form.Select
                        id="LastMileHub"
                        value={data.LastMileHub}
                        onChange={onChange}
                        title="Select LastMileHub..."
                        className=" form-control"
                    >
                        <option></option>
                        {hubs.map((it) => {
                            return (
                                <option value={it.id}>
                                    {it.ShipmentProviderName}
                                </option>
                            );
                        })}
                    </Form.Select>{" "}
                    {errors && (
                        <div className="text-danger mt-1">
                            {errors.LastMileHub}
                        </div>
                    )}
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

function Choice({ message,action, close }) {
    return (
        <>
            <div className="modal-body">
                <div className="icon-box">
                    <i id="modal-icon" className="fas fa-trash-alt"></i>
                </div>
                <h4 className="modal-title text-center">Are you sure?</h4>
                <p id="modal-message" className="text-center mt-3 text-center">
                    Do you really confirm to {message}? This process cannot be
                    undone.
                </p>
            </div>
            <div className="modal-footer row">
                <div className="col-md-6 px-2">
                    <button
                        onClick={() => {
                            action();
                            close();
                        }}
                        className="btn btn-success m-0 btn-block"
                        id="ModalConfirmation"
                    >
                        YES
                    </button>
                </div>
                <div className="col-md-6 px-2">
                    <button
                        onClick={() => {
                            close();
                        }}
                        className="btn btn-secondary m-0 btn-block"
                        data-dismiss="modal"
                    >
                        No
                    </button>
                </div>
            </div>
        </>
    );
}

import { useEffect, useRef, useState } from "react";
import { usePage } from "@inertiajs/inertia-react";
import { useMountedState } from "react-use";
import { Inertia } from "@inertiajs/inertia";

export default function Filters({ setFiltersCallBack, isPickUp }) {
    const { hubs, statuses, workflows, cities } = usePage().props;
    const [search, setSearch] = useState("");

    const [workFlows, setWorkFlows] = useState([]);

    const [status, setStatus] = useState([]);
    const [cutomer_city, setCustomerCity] = useState([]);
    const [firstMile, setFirstMile] = useState([]);
    const [lastMile, setLastMile] = useState([]);

    const [createdAt, setCreatedAt] = useState({
        start: null,
        end: null,
    });
    const [updateAt, setUpdatedAt] = useState({
        start: null,
        end: null,
    });

    const setFilters = () => {
        setFiltersCallBack({
            search,
            workFlows: workFlows.map((it) => it.value),
            status: status.map((it) => it.value),
            cutomer_city: cutomer_city.map((it) => it.value),
            firstMile: firstMile.map((it) => it.value),
            lastMile: lastMile.map((it) => it.value),
            createdAt,
            updateAt,
        });
    };
    useEffect(() => {
        setFilters();
    }, [
        status,
        cutomer_city,
        createdAt,
        updateAt,
        lastMile,
        firstMile,
        search,
        workFlows,
    ]);
    function reset() {
        Inertia.get("");
    }
    return (
        <>
            <div
                className="panel panel-light"
                style={{ margin: " 5px 0px" }}
                id="FilterPanel"
            >
                <div className="panel-body">
                    <div className="form-row">
                        <div className="form-group col-md-3">
                            <label>Search</label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">
                                        <i className="fas fa-search"></i>
                                    </span>
                                </div>
                                <input
                                    id="FilterSearch"
                                    type="text"
                                    className="form-control"
                                    autoComplete="off"
                                    placeholder="Search..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>
                        </div>
                        {isPickUp && (
                            <div className="form-group col-md-3">
                                <Select
                                    label={"Work Flow"}
                                    id={"work_flow_filter"}
                                    data={workflows.map((it) => {
                                        return {
                                            value: it.id,
                                            label: it.WorkflowName,
                                        };
                                    })}
                                    title={"Select A workflow"}
                                    onChange={(data) => {
                                        setWorkFlows(data);
                                    }}
                                />
                            </div>
                        )}
                        <div className="form-group col-md-3">
                            <Select
                                label={"Status"}
                                id={"status_filter"}
                                data={statuses.map((it) => {
                                    return {
                                        value: it.id,
                                        label: it.StatusName,
                                    };
                                })}
                                title={"Select A status"}
                                onChange={setStatus}
                            />
                        </div>
                        <div className="form-group col-md-3">
                            <Select
                                label={"Recipient City"}
                                id={"customer_city_filter"}
                                data={cities.map((it) => {
                                    return {
                                        value: it.id,
                                        label: it?.localite,
                                    };
                                })}
                                title={'Select a recipient cities"'}
                                onChange={(data) => {
                                    setCustomerCity(data);
                                }}
                            />
                        </div>
                        <div className="form-group col-md-3">
                            <DateRangePicker
                                label={"Created At"}
                                id={"created-at"}
                                state={createdAt}
                                setState={setCreatedAt}
                            />
                        </div>
                        <div className="form-group col-md-3">
                            <DateRangePicker
                                label={"Updated At"}
                                id={"updated-at"}
                                state={updateAt}
                                setState={setUpdatedAt}
                            />
                        </div>
                        {/* <div className="form-group col-md-3">
                            <Select
                                label={"First Mile"}
                                id={"first_mile_filter"}
                                data={hubs.map((it) => {
                                    return {
                                        value: it.id,
                                        label: it.ShipmentProviderName,
                                    };
                                })}
                                title={"Select a first mile hub"}
                                onChange={(data) => {
                                    setFirstMile(data);
                                    // console.log(e.target.value);
                                }}
                            />
                        </div> */}
                        <div className="form-group col-md-3">
                            <Select
                                label={"Last Mile"}
                                id={"last_mile_filter"}
                                data={hubs.map((it) => {
                                    return {
                                        value: it.id,
                                        label: it.ShipmentProviderName,
                                    };
                                })}
                                title={"Select a last mile hub"}
                                onChange={(data) => {
                                    setLastMile(data);
                                }}
                            />
                        </div>
                    </div>
                </div>
                <div className="panel-footer text-right">
                    <button
                        id="FilterSubmit"
                        type="submit"
                        className="btn btn-primary"
                        onClick={() => {
                            Inertia.post("", {
                                filter: {
                                    search,
                                    status: status.map((it) => it.value),
                                    workFlow: workFlows.map((it) => it.value),
                                    customerCity: cutomer_city.map(
                                        (it) => it.value
                                    ),
                                    lastMile: lastMile.map((it) => it.value),
                                    firstMile: firstMile.map((it) => it.value),
                                    created_in: createdAt,
                                    updated_in: updateAt,
                                },
                            });
                        }}
                    >
                        Search
                    </button>
                    <button
                        id="FilterReset"
                        onClick={() => reset()}
                        type="submit"
                        className="btn btn-danger"
                    >
                        Reset
                    </button>
                </div>
            </div>
        </>
    );
}

export function Select({ data, title, onChange, id, label }) {
    const ref = useRef(null);
    const isMounted = useMountedState();
    useEffect(() => {
        if (isMounted) {
            $(`#select-drop-${id}`).selectpicker();
        }
    });

    const getListOfSelected = (id) => {
        var _data = [];

        document
            .getElementById(`select-${id}`)
            .children[1].children[2].children[2].children[0].children.forEach(
                (value, key) => {
                    if (value.className === "selected") {
                        _data.push(
                            value.childNodes[0].childNodes[1].textContent
                        );
                    }
                }
            );

        var new_data = data.filter((v, i) => {
            return _data.includes(v.label);
        });
        return new_data;
    };

    return (
        <div
            className="dropdown bootstrap-select show-tick form-control"
            id={`select-${id}`}
        >
            <label htmlFor={id}>{label}</label>
            <select
                className="selectpicker form-control"
                id={`select-drop-${id}`}
                title={title}
                multiple="multiple"
                data-live-search="true"
                data-actions-box="true"
                onChange={(e) => {
                    // console.log(getListOfSelected(id));
                    onChange(getListOfSelected(id));
                    // console.log()
                }}
                data-selected-text-format="count"
            >
                {data.map((it, index) => {
                    return (
                        <option key={index} value={it?.value}>
                            {it?.label}
                        </option>
                    );
                })}
            </select>
            <div className="dropdown-menu ">
                <div className="bs-searchbox">
                    <input
                        type="search"
                        className="form-control"
                        autocomplete="off"
                        role="combobox"
                        aria-label="Search"
                        aria-controls="bs-select-1"
                        aria-autocomplete="list"
                    />
                </div>
                <div className="bs-actionsbox">
                    <div className="btn-group btn-group-sm btn-block">
                        <button
                            type="button"
                            className="actions-btn bs-select-all btn btn-light"
                        >
                            Select All
                        </button>
                        <button
                            type="button"
                            className="actions-btn bs-deselect-all btn btn-light"
                        >
                            Deselect All
                        </button>
                    </div>
                </div>
                <div
                    className="inner show"
                    role="listbox"
                    id="bs-select-1"
                    ref={ref}
                    tabindex="-1"
                    aria-multiselectable="true"
                >
                    <ul
                        className="dropdown-menu inner show"
                        role="presentation"
                    ></ul>
                </div>
            </div>
        </div>
    );
}

export function SelectSingle({ data, title, onChange, id,label, value }) {
    const ref = useRef(null);
    const isMounted = useMountedState();
    useEffect(() => {
        if (isMounted) {
            $(`#select-drop-${id}`).selectpicker("val", value);
        }
    });

    const getListOfSelected = (id) => {
        var _data = [];

        document
            .getElementById(`select-${id}`)
            .children[1].children[2].children[2].children[0].children.forEach(
                (value, key) => {
                    if (value.className === "selected") {
                        _data.push(
                            value.childNodes[0].childNodes[1].textContent
                        );
                    }
                }
            );

        var new_data = data.filter((v, i) => {
            return _data.includes(v.label);
        });
        return new_data;
    };

    return (
        <div
            className="dropdown bootstrap-select show-tick form-control"
            id={`select-${id}`}
        >
            <select
                className="selectpicker form-control"
                id={`select-drop-${id}`}
                title={title}
                data-live-search="true"
                data-actions-box="true"
                onChange={(e) => {
                    onChange(e.target.value);
                }}
                data-selected-text-format="count"
            >
                {data.map((it, index) => {
                    return (
                        <option key={index} value={it?.value}>
                            {it?.label}
                        </option>
                    );
                })}
            </select>
            <div className="dropdown-menu ">
                <div className="bs-searchbox">
                    <input
                        type="search"
                        className="form-control"
                        autocomplete="off"
                        role="combobox"
                        aria-label="Search"
                        aria-controls="bs-select-1"
                        aria-autocomplete="list"
                    />
                </div>
                <div className="bs-actionsbox">
                    <div className="btn-group btn-group-sm btn-block">
                        <button
                            type="button"
                            className="actions-btn bs-select-all btn btn-light"
                        >
                            Select All
                        </button>
                        <button
                            type="button"
                            className="actions-btn bs-deselect-all btn btn-light"
                        >
                            Deselect All
                        </button>
                    </div>
                </div>
                <div
                    className="inner show"
                    role="listbox"
                    id="bs-select-1"
                    ref={ref}
                    tabindex="-1"
                    aria-multiselectable="true"
                >
                    <ul
                        className="dropdown-menu inner show"
                        role="presentation"
                    ></ul>
                </div>
            </div>
        </div>
    );
}
export function DateRangePicker({ label, id, state, setState }) {
    const isMounted = useMountedState();

    if (isMounted) {
        $(function () {
            $(`input[name="${id}"]`).daterangepicker(
                {
                    opens: "left",
                },
                // 2023-02-15
                function (start, end, label) {
                    console.log("connected");
                    setState({
                        start: start.format("Y-M-D"),
                        end: end.format("Y-M-D"),
                    });
                }
            );
        });

        $(`input[name="${id}"]`).on(
            "apply.daterangepicker",
            function (ev, picker) {
                console.log("connected");

                setState({
                    start: picker.startDate.format("Y-M-D"),
                    end: picker.endDate.format("Y-M-D"),
                });
            }
        );
        $(`input[name="${id}"]`).on(
            "cancel.daterangepicker",
            function (ev, picker) {
                $(`input[name="${id}"`).val("");
                // alert("cancled");
                setState(null);
            }
        );
    }
    return (
        <>
            <label htmlFor={id}>{label}</label>
            <div className="input-group">
                <div className="input-group-prepend">
                    <span className="input-group-text">
                        <i className="fas fa-calendar-alt"></i>
                    </span>
                </div>
                <input
                    type="text"
                    className="form-control"
                    // name="CreatedDate"
                    id="CreatedDate"
                    name={id}
                    autocomplete="off"
                    placeholder="Select a date time range"
                    value=""
                />
            </div>
        </>
    );
}

export function SelectNotMulti() {
    return <></>;
}

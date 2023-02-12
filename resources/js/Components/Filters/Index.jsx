import { useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import { DateRange } from "react-date-range";
import { Link, usePage } from "@inertiajs/inertia-react";
import { useLocalStorage } from "react-use";

export default function Filters({ workflow }) {
    const { hubs, statuses, workflows, cities } = usePage().props;
    const [search, setSearch] = useState("");
    const [workFlows, setWorkFlows] = useLocalStorage("index_work_flow", []);

    const [status, setStatus] = useLocalStorage("status_filter", []);
    const [customer_city, setCustomerCity] = useLocalStorage(
        "index_customer_city_filter",
        []
    );
    const [firstMile, setFirstMile] = useLocalStorage(
        "index_first_mile_filter",
        []
    );
    const [lastMile, setLastMile] = useLocalStorage("index_latmile_filte", []);
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
    function reset() {
        // setCreatedAt()
        setWorkFlows([]);
        setStatus([]);
        setCustomerCity([]);
        setFirstMile([]);
        setLastMile([]);
    }
    return (
        <>
            <div
                className="panel panel-light"
                style={{ margin: " 5px 0px" }}
                id="FilterPanel"
            >
                <pre>{/*{JSON.stringify(state, null, 2)}*/}</pre>
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
                                    style={{
                                        padding: "1.5em 1em",
                                    }}
                                    className="form-control"
                                    autoComplete="off"
                                    placeholder="Search..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="form-group col-md-3">
                            <Select
                                options={workflow.map((it) => {
                                    return {
                                        value: it.id,
                                        label: it.WorkflowName,
                                    };
                                })}
                                label={"Select A workflow"}
                                onChange={setWorkFlows}
                                value={workFlows}
                            />
                        </div>
                        <div className="form-group col-md-3">
                            <Select
                                options={statuses.map((it) => {
                                    return {
                                        value: it.id,
                                        label: it.StatusName,
                                    };
                                })}
                                label={"Select A status"}
                                onChange={setStatus}
                                value={status}
                            />
                        </div>
                        <div className="form-group col-md-3">
                            <Select
                                options={cities.map((it) => {
                                    return { value: it.id, label: it.localite };
                                })}
                                label={'Select a recipient cities"'}
                                onChange={setCustomerCity}
                                value={customer_city}
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
                        <div className="form-group col-md-3">
                            <Select
                                options={hubs.map((it) => {
                                    return {
                                        value: it.id,
                                        label: it.ShipmentProviderName,
                                    };
                                })}
                                label={"Select a first mile hub"}
                                onChange={setFirstMile}
                                value={firstMile}
                            />
                        </div>
                        <div className="form-group col-md-3">
                            <Select
                                options={hubs.map((it) => {
                                    return {
                                        value: it.id,
                                        label: it.ShipmentProviderName,
                                    };
                                })}
                                label={"Select a last mile hub"}
                                onChange={setLastMile}
                                value={lastMile}
                            />
                        </div>
                    </div>
                </div>
                <div className="panel-footer text-right">
                    <Link
                        id="FilterSubmit"
                        type="submit"
                        className="btn btn-primary"
                        href={`?${
                            workFlows.length > 0
                                ? `filter[workFlow]=${workFlows.map(
                                      (it) => it.value
                                  )}`
                                : ""
                        }&${
                            status.length > 0
                                ? `filter[status]=${status.map(
                                      (it) => it.value
                                  )}`
                                : ""
                        }&${
                            lastMile.length > 0
                                ? `filter[LastMile]=${lastMile.map(
                                      (it) => it.value
                                  )}`
                                : ""
                        }&${
                            firstMile.length > 0
                                ? `filter[FirstMile]=${firstMile.map(
                                      (it) => it.value
                                  )}`
                                : ""
                        }&${
                            createdAt[0].endDate
                                ? `filter[created_in]=${createdAt[0].startDate.toLocaleDateString()},${createdAt[0].endDate.toLocaleDateString()}`
                                : ""
                        }&${
                            updateAt[0].endDate
                                ? `filter[updated_in]=${updateAt[0].startDate.toLocaleDateString()},${updateAt[0].endDate.toLocaleDateString()}`
                                : ""
                        }`}
                    >
                        Search
                    </Link>
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

function DateRangePicker({ label, id, state, setState }) {
    const [openCalander, setOpenCalander] = useState(false);

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
                    className="form-control daterange-time"
                    name={id}
                    id={id}
                    style={{
                        padding: "1.5em 1em",
                    }}
                    onClick={() => setOpenCalander(true)}
                    autoComplete="off"
                    placeholder="Select a date time range"
                    value={`${
                        state[0].startDate?.toLocaleDateString("fr") ?? ""
                    }  - ${state[0]?.endDate?.toLocaleDateString("fr") ?? ""}`}
                />
            </div>
            {openCalander && (
                <div
                    className={""}
                    style={{
                        position: "absolute",
                        zIndex: "100",
                        background: "white",
                    }}
                >
                    <DateRange
                        onChange={(item) => {
                            setState([item.selection]);
                        }}
                        ranges={state}
                    />
                    <div
                        className={" d-flex justify-content-end p-1"}
                        style={{
                            width: "312px",
                        }}
                    >
                        <button
                            className={"btn btn-primary"}
                            onClick={() => setOpenCalander(false)}
                        >
                            apply
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

const Select = ({ label, value, options, onChange }) => {
    return (
        <div>
            <label>{label}</label>
            <MultiSelect
                // defaultIsOpen={true}
                options={options}
                value={value}
                onChange={onChange}
                labelledBy={label}
            />
        </div>
    );
};

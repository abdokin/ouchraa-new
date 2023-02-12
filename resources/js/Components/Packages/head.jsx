import Collapse from "react-bootstrap/Collapse";
import {useState} from "react";
import {Inertia} from "@inertiajs/inertia";
import {Link} from "@inertiajs/inertia-react";
import Filters from "../Filters/Index";
import { useLocalStorage } from "react-use";
export function HeadUpload({open, isEmployee}) {
    const [filtersOpen, setFiltersOpen] = useLocalStorage('filter_upload',false);
    const readyToShips = (ids) => {
        // console.log(id);
        Inertia.post(route("package.readyToShips"), {
            data: ids,
        });
    };
    const cancels = (ids) => {
        // console.log(id);
        Inertia.post(route("package.cancels"), {
            data: ids,
        });
    };
    return (
        <header>
            <div className="">
                <div className=" text-left mb-2">
                    <h1 className="mb-0">Packages</h1>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb m-0 mt-1 p-0 breadcrumbs-chevron">
                            <li className="breadcrumb-item">
                                <a href="/">Dashboard</a>
                            </li>
                            <li
                                className="breadcrumb-item active"
                                aria-current="page"
                            >
                                Uploads
                            </li>
                        </ol>
                    </nav>
                </div>
                <div className="d-flex gap-3  justify-content-end">
                    <div>
                        <Link
                            // onClick={() => handleShow()}
                            // target={'_blank'}
                            href={route("packages.uploads")}
                            id="Template"
                            className="btn btn-primary bg-gradient waves-effect waves-light mr-2"
                            // dataToggle="modal"
                        >
                            Reload
                        </Link>
                        <a
                            // onClick={() => handleShow()}
                            // target={'_blank'}
                            href={
                                isEmployee
                                    ? "/storage/templates/Employee_Template.csv"
                                    : "/storage/templates/User_Template.csv"
                            }
                            id="Template"
                            className="btn btn-danger bg-gradient waves-effect waves-light"
                            // dataToggle="modal"
                        >
                            Template
                        </a>
                        <a
                            id="Upload"
                            onClick={(e) => open()}
                            className="btn btn-wide btn-success ml-2"
                        >
                            <span>Upload</span>
                        </a>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default function Head({handleShow, workflow, rowSelected}) {
    const [filtersOpen, setFiltersOpen] = useLocalStorage('index_filter',false);
    const readyToShips = (ids) => {
        // console.log(id);
        Inertia.post(route("package.readyToShips"), {
            data: ids,
        });
    };
    const cancels = (ids) => {
        // console.log(id);
        Inertia.post(route("package.cancels"), {
            data: ids,
        });
    };
    return (
        <header>
            <div className="">
                <div className=" text-left mb-2">
                    <h1 className="mb-0">Packages</h1>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb m-0 mt-1 p-0 breadcrumbs-chevron">
                            <li className="breadcrumb-item">
                                <a href="/">Dashboard</a>
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
                <div className="d-flex gap-3  justify-content-between">
                    <div className="dropdown ml-2">
                        <button
                            className="btn  btn-dark dropdown-toggle"
                            type="button"
                            disabled={rowSelected.length === 0}
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                        >
                            <span> Action</span>{" "}
                        </button>
                        <div className="dropdown-menu">
                            <a
                                href={`/labels/package?data=[${rowSelected}]`}
                                target="_blank"
                                onClick={(e) => {
                                    console.log("selected", rowSelected);
                                }}
                                id="DownloadLabel"
                                // data-packageid={it.id}
                                className="dropdown-item"
                            >
                                <i className="fas fa-download"></i>
                                <span>Label Download</span>
                            </a>
                            <button
                                onClick={(e) => {
                                    readyToShips(rowSelected);
                                }}
                                id="MonoReadytoShip"
                                // dataPackageid={it.id}
                                className="dropdown-item"
                            >
                                <i className="fas fa-dolly-flatbed"></i>
                                <span>Ready to Ship</span>
                            </button>
                            <button
                                // value={it.id}
                                id="MonoEditPackage"
                                // data-packageid={it.id}
                                className="dropdown-item"
                            >
                                <i className="fas fa-pencil-alt"></i>
                                <span>Edit</span>
                            </button>
                            <a
                                href=""
                                id="MonoReturnCustomer"
                                // data-packageid={it.id}
                                className="dropdown-item"
                            >
                                <i className="fas fa-undo-alt"></i>
                                <span>Customer Return</span>
                            </a>
                            <button
                                href=""
                                id="MonoCancelPackage"
                                onClick={(e) => {
                                    cancels(rowSelected);
                                }}
                                className="dropdown-item"
                            >
                                <i className="fas fa-trash"></i>
                                <span>Cancel</span>
                            </button>
                        </div>
                    </div>
                    <div>
                        <button
                            onClick={() => handleShow()}
                            id="Create"
                            className="btn btn-success "
                            // dataToggle="modal"
                            data-target="#package-create"
                        >
                            <i className="fas fa-plus-circle"></i> Create
                        </button>
                        <a
                            href="/export/packages"
                            id="Export"
                            className="btn btn-primary ml-2"
                        >
                            <i className="fas fa-download"></i>{" "}
                            <span>Export</span>
                        </a>

                        <button
                            id="Filter"
                            className="btn btn-info ml-2"
                            onClick={() => setFiltersOpen(!filtersOpen)}
                        >
                            <i className="fas fa-filter"></i> Filter
                        </button>
                    </div>
                </div>
            </div>
            <Collapse in={filtersOpen}>
                <div id="example-collapse-text">
                    <Filters workflow={workflow}/>
                </div>
            </Collapse>
        </header>
    );
}

export function HeadDropoff({handleNotAcceptedShow, worflow, rowSelected}) {
    const [filtersOpen, setFiltersOpen] = useState(false);

    return (
        <header>
            <div className="">
                <div className=" text-left mb-2">
                    <h1 className="mb-0">Packages</h1>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb m-0 mt-1 p-0 breadcrumbs-chevron">
                            <li className="breadcrumb-item">
                                <a href="/">Dashboard</a>
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
                <div className="d-flex gap-3  justify-content-between">
                    <div className="dropdown ml-2">
                        <button
                            className="btn  btn-dark dropdown-toggle"
                            type="button"
                            disabled={rowSelected.length === 0}
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                        >
                            <span> Action</span>{" "}
                        </button>
                        <div className="dropdown-menu">
                            {/* <a
                                href={`/labels/package?data=[${rowSelected}]`}
                                target="_blank"
                                onClick={(e) => {
                                    console.log("selected", rowSelected);
                                }}
                                id="DownloadLabel"
                                // data-packageid={it.id}
                                className="dropdown-item"
                            >
                                <i className="fas fa-download"></i>
                                <span>Label Download</span>
                            </a> */}
                            <button
                                onClick={(e) => {
                                    handleNotAcceptedShow();
                                }}
                                id="MonoReadytoShip"
                                // dataPackageid={it.id}
                                className="dropdown-item"
                            >
                                {/* <i className="fas fa-dolly-flatbed"></i> */}
                                <span>Picked</span>
                            </button>
                            <button
                                onClick={(e) => {
                                    handleNotPickedShow();
                                }}
                                id="MonoReadytoShip"
                                // dataPackageid={it.id}
                                className="dropdown-item"
                            >
                                {/* <i className="fas fa-dolly-flatbed"></i> */}
                                <span>Not Picked</span>
                            </button>
                        </div>
                    </div>
                    <div>
                        {/* <button
                            // onClick={() => handleShow()}
                            id="Create"
                            className="btn btn-success mr-2"
                            dataToggle="modal"
                            data-target="#package-create"
                        >
                            Picked
                        </button>
                        <button
                            // onClick={() => handleShow()}
                            id="Create"
                            className="btn btn-success mr-2"
                            dataToggle="modal"
                            data-target="#package-create"
                        >
                             Not Picked
                        </button> */}
                        {/* <a
                            href="/export/packages"
                            id="Export"
                            className="btn btn-primary mr-2"
                        >
                            <i className="fas fa-download"></i>{" "}
                            <span>Export</span>
                        </a> */}

                        {/* <button
                            id="Filter"
                            className="btn btn-info "
                            onClick={() => setFiltersOpen(!filtersOpen)}
                        >
                            <i className="fas fa-filter"></i> Filter
                        </button> */}
                    </div>
                </div>
            </div>
            <Collapse in={filtersOpen}>
                <div id="example-collapse-text">
                    <FilterPanel worflow={worflow}/>
                </div>
            </Collapse>
        </header>
    );
}

export function HeadPickUp({
                               handleNotPickedShow,
                               handlePickedShow,
                               worflow,
                               rowSelected,
                           }) {
    const [filtersOpen, setFiltersOpen] = useState(false);

    return (
        <header>
            <div className="">
                <div className=" text-left mb-2">
                    <h1 className="mb-0">Packages</h1>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb m-0 mt-1 p-0 breadcrumbs-chevron">
                            <li className="breadcrumb-item">
                                <a href="/">Dashboard</a>
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
                <div className="d-flex gap-3  justify-content-between">
                    <div className="dropdown ml-2">
                        <button
                            className="btn  btn-dark dropdown-toggle"
                            type="button"
                            disabled={rowSelected.length === 0}
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                        >
                            <span> Action</span>{" "}
                        </button>
                        <div className="dropdown-menu">
                            {/* <a
                                href={`/labels/package?data=[${rowSelected}]`}
                                target="_blank"
                                onClick={(e) => {
                                    console.log("selected", rowSelected);
                                }}
                                id="DownloadLabel"
                                // data-packageid={it.id}
                                className="dropdown-item"
                            >
                                <i className="fas fa-download"></i>
                                <span>Label Download</span>
                            </a> */}
                            <button
                                onClick={(e) => {
                                    handlePickedShow();
                                }}
                                id="MonoReadytoShip"
                                // dataPackageid={it.id}
                                className="dropdown-item"
                            >
                                {/* <i className="fas fa-dolly-flatbed"></i> */}
                                <span>Picked</span>
                            </button>
                            <button
                                onClick={(e) => {
                                    handleNotPickedShow();
                                }}
                                id="MonoReadytoShip"
                                // dataPackageid={it.id}
                                className="dropdown-item"
                            >
                                {/* <i className="fas fa-dolly-flatbed"></i> */}
                                <span>Not Picked</span>
                            </button>
                        </div>
                    </div>
                    <div>
                        {/* <button
                            // onClick={() => handleShow()}
                            id="Create"
                            className="btn btn-success mr-2"
                            dataToggle="modal"
                            data-target="#package-create"
                        >
                            Picked
                        </button>
                        <button
                            // onClick={() => handleShow()}
                            id="Create"
                            className="btn btn-success mr-2"
                            dataToggle="modal"
                            data-target="#package-create"
                        >
                             Not Picked
                        </button> */}
                        {/* <a
                            href="/export/packages"
                            id="Export"
                            className="btn btn-primary mr-2"
                        >
                            <i className="fas fa-download"></i>{" "}
                            <span>Export</span>
                        </a> */}

                        {/* <button
                            id="Filter"
                            className="btn btn-info "
                            onClick={() => setFiltersOpen(!filtersOpen)}
                        >
                            <i className="fas fa-filter"></i> Filter
                        </button> */}
                    </div>
                </div>
            </div>
            <Collapse in={filtersOpen}>
                <div id="example-collapse-text">
                    <FilterPanel worflow={worflow}/>
                </div>
            </Collapse>
        </header>
    );
}

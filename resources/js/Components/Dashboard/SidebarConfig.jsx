import { Link } from "@inertiajs/inertia-react";
import React from "react";

export default function SidebarConfig({ isEmployee }) {
    return (
        <nav className="navbar navbar-bottom navbar-expand-lg navbar-dark">
            <div className="container-fluid">
                <div
                    className="collapse navbar-collapse"
                    id="navbar-bottom-collapsible"
                >
                    <ul className="navbar-nav">
                        <li className="nav-item dropdown">
                            <Link
                                className={`
                                dropdown-toggle"
                                ${
                                    route().current("config.*") && "active"
                                } nav-link`}
                                href={route("config.hubs")}
                                role="button"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                <i className="fas fa-users fa-lg align-middle mr-1"></i>
                                <span>Access</span>
                            </Link>
                            <ul className="dropdown-menu dropdown-menu-arrow dropdown-menu-end">
                                <li>
                                    <a
                                        href="/configuration/users"
                                        className="dropdown-item"
                                    >
                                        <i className="fas fa-user"></i>
                                        <span>Users</span>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="/configuration/shippers"
                                        className="dropdown-item"
                                    >
                                        <i className="fas fa-user-tie"></i>
                                        <span>Shippers</span>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="/configuration/drivers"
                                        className="dropdown-item"
                                    >
                                        <i className="fas fa-shipping-fast"></i>
                                        <span>Drivers</span>
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li className="nav-item dropdown">
                            <a
                                className={`
                                dropdown-toggle"
                                ${
                                    route().current("config.*") && "active"
                                } nav-link`}
                                href={"#"}
                                role="button"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                <i className="fas fa-building fa-lg align-middle mr-1"></i>
                                <span>Shipping Providers</span>
                            </a>
                            <ul className="dropdown-menu dropdown-menu-arrow dropdown-menu-end">
                                <li>
                                    <Link
                                        href={route("config.hubs")}
                                        className={`
                                        dropdown-item 
                                        ${
                                            route().current("config.hubs") &&
                                            "active"
                                        } `}
                                    >
                                        <i className="fas fa-building"></i>
                                        <span>Hubs</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className={`
                                        dropdown-item 
                                        ${
                                            route().current("config.cities") &&
                                            "active"
                                        } `}
                                        href={route("config.cities")}
                                    >
                                        <i className="fas fa-map-marker-alt"></i>
                                        <span>Cities</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className={`
                                        dropdown-item 
                                        ${
                                            route().current("config.prices") &&
                                            "active"
                                        } `}
                                        href={route("config.prices")}
                                    >
                                        <i className="fas fa-dollar-sign"></i>
                                        <span>Prices</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className={`
                                        dropdown-item 
                                        ${
                                            route().current("config.sizes") &&
                                            "active"
                                        } `}
                                        href={route("config.sizes")}
                                    >
                                        <i className="fas fa-expand-arrows-alt"></i>
                                        <span>Sizes</span>
                                    </Link>
                                </li>
                                <li>
                                    <a
                                        href="/configuration/routes"
                                        className="dropdown-item"
                                    >
                                        <i className="fas fa-route"></i>
                                        <span>Routes</span>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="/configuration/locations"
                                        className="dropdown-item"
                                    >
                                        <i className="fas fa-layer-group"></i>
                                        <span>Locations</span>
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <a
                                href="/configuration/reasons"
                                className="nav-link active"
                            >
                                <i className="fas fa-list-alt fa-lg align-middle mr-1"></i>
                                <span>Reasons</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a
                                href="/configuration/templates"
                                className="nav-link active"
                            >
                                <i className="fas fa-file-code fa-lg align-middle mr-1"></i>
                                <span>Templates</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a
                                href="/configuration/trigger"
                                className="nav-link active"
                            >
                                <i className="fas fa-mail-bulk fa-lg align-middle mr-1"></i>
                                <span>Trigger</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a
                                href="/configuration/package-editor"
                                className="nav-link active"
                            >
                                <i className="fas fa-tools fa-lg align-middle mr-1"></i>
                                <span>Package Editor</span>
                            </a>
                        </li>
                        <li className="nav-item"></li>
                        <li className="nav-item">
                            <a
                                href="/configuration/setting"
                                className="nav-link active"
                            >
                                <i className="fas fa-cogs fa-lg align-middle mr-1"></i>
                                <span>Setting</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a
                                href="/configuration/backup"
                                className="nav-link active"
                            >
                                <i className="fas fa-database fa-lg align-middle mr-1"></i>
                                <span>Backup</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

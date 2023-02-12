import { Link, usePage } from "@inertiajs/inertia-react";
import React from "react";

export default function Navbar({ props, pageName }) {
    const { auth } = usePage().props;
    return (
        <nav className="navbar navbar-top navbar-expand-lg navbar-light bg-white">
            <div className="container-fluid">
                <button
                    className="navbar-toggler navbar-toggler-css navbar-menu-toggler collapsed"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbar-bottom-collapsible"
                    aria-controls="navbar-bottom-collapsible"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="line"></span>
                    <span className="line"></span>
                    <span className="line"></span>
                </button>
                <a className="navbar-brand" href="/">
                    <img
                        src="/assets/layouts/logos/logo-light.png"
                        height="20"
                        alt=""
                    />
                </a>
                <button
                    className="navbar-toggler navbar-toggler-css-reverse navbar-menu-toggler collapsed"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbar-top-collapsible"
                    aria-controls="navbar-top-collapsible"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="line"></span>
                    <span className="line"></span>
                    <span className="line"></span>
                </button>

                <div
                    className="collapse navbar-collapse"
                    id="navbar-top-collapsible"
                >
                    <ul className="navbar-nav navbar-menu-primary">
                        <li className="nav-item dropdown language-dropdown">
                            <a
                                href="#"
                                className="nav-link dropdown-toggle dropdown-nocaret"
                                role="button"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                <img
                                    src="/assets/layouts/flags/us.svg"
                                    alt=""
                                />
                            </a>
                            <div className="dropdown-menu dropdown-menu-arrow dropdown-menu-sm dropdown-menu-start">
                                <a href="#" className="dropdown-item">
                                    <img
                                        src="/assets/layouts/flags/us.svg"
                                        alt=""
                                    />{" "}
                                    English
                                </a>
                                <a href="#" className="dropdown-item">
                                    <img
                                        src="/assets/layouts/flags/fr.svg"
                                        alt=""
                                    />{" "}
                                    French
                                </a>
                                <a href="#" className="dropdown-item">
                                    <img
                                        src="/assets/layouts/flags/it.svg"
                                        alt=""
                                    />{" "}
                                    Italian
                                </a>
                            </div>
                        </li>
                        <li className="nav-item">
                            {/* <a href="/packages" className="nav-link dropdown-toggle dropdown-nocaret position-relative">
                            </a> */}
                            <Link
                                className={`${
                                    route().current("packages.*") && "active"
                                } nav-link dropdown-toggle dropdown-nocaret position-relative`}
                                href={route("packages.index")}
                            >
                                <i className="fas fa-box fa-lg"></i>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className={`${
                                    route().current("packages.uploads") && "active"
                                } nav-link dropdown-toggle dropdown-nocaret position-relative`}
                                href={route("packages.uploads")}
                            >
                                <i className="fas fa-cloud-upload-alt fa-lg"></i>
                            </Link>
                        </li>
                        <li className="nav-item dropdown notifications-nav-item">
                            <a
                                href="#"
                                className="nav-link dropdown-toggle dropdown-nocaret position-relative"
                                role="button"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                <svg
                                    fill="#555555"
                                    width="22"
                                    height="22"
                                    id="lnr-alarm"
                                    viewBox="0 0 1024 1024"
                                >
                                    <path
                                        className="path1"
                                        d="M860.171 773.15c-58.576-44-92.171-111.194-92.171-184.35v-153.6c0-128.661-86.733-237.442-204.798-270.954l-0.002-36.246c0-42.347-34.451-76.8-76.8-76.8-42.347 0-76.8 34.453-76.8 76.8v36.245c-118.067 33.512-204.8 142.294-204.8 270.955v153.6c0 73.157-33.595 140.349-92.171 184.35-8.808 6.616-12.395 18.125-8.907 28.573 3.486 10.448 13.267 17.496 24.283 17.496h232.982c-1.709 8.384-2.587 16.955-2.587 25.581 0 70.579 57.421 128 128 128s128-57.421 128-128c0-8.626-0.878-17.197-2.584-25.581h232.981c11.016 0 20.795-7.046 24.283-17.496s-0.101-21.957-8.909-28.573zM460.8 128c0-14.115 11.485-25.6 25.6-25.6s25.6 11.485 25.6 25.6v26.774c-8.435-0.763-16.97-1.176-25.6-1.176s-17.166 0.413-25.6 1.176v-26.774zM563.2 844.8c0 42.347-34.453 76.8-76.8 76.8s-76.8-34.453-76.8-76.8c0-8.76 1.515-17.411 4.394-25.581h144.813c2.878 8.168 4.394 16.821 4.394 25.581zM191.571 768.019c13.075-15.826 24.437-33.051 33.744-51.27 20.362-39.858 30.685-82.906 30.685-127.949v-153.6c0-127.043 103.357-230.4 230.4-230.4s230.4 103.357 230.4 230.4v153.6c0 45.043 10.323 88.091 30.685 127.949 9.307 18.219 20.669 35.445 33.744 51.27h-589.658z"
                                    ></path>
                                </svg>
                                <span
                                    className="color-badge bg-info position-absolute"
                                    style={{ top: "1.3rem", right: " 1rem" }}
                                ></span>
                            </a>
                            <div className="dropdown-menu dropdown-menu-arrow dropdown-menu-sm dropdown-menu-start">
                                <div className="notifications-box">
                                    <small
                                        className="d-block mt-3"
                                        style={{
                                            marginLeft:
                                                "30px; font-weight: 500",
                                            color: " #999",
                                        }}
                                    >
                                        Today
                                    </small>

                                    <ul className="list-group list-group-notifications-2">
                                        <li className="list-group-item">
                                            <div className="user-avatar">
                                                <span className="avatar avatar-1 rounded-circle">
                                                    KB
                                                </span>
                                                <span className="badge badge-secondary color-badge badge-size-1"></span>
                                            </div>
                                            <div className="item-info">
                                                <p>
                                                    <a href="#">Keon Boyer</a>{" "}
                                                    sent you a new message.
                                                </p>
                                            </div>
                                            <div className="timestamp">
                                                19:45
                                            </div>
                                        </li>
                                        <li className="list-group-item">
                                            <div className="user-avatar">
                                                <span className="avatar avatar-1 rounded-circle">
                                                    RA
                                                </span>
                                                <span className="badge badge-success color-badge badge-size-1"></span>
                                            </div>
                                            <div className="item-info">
                                                <p>
                                                    <a href="#">
                                                        Roger Aniston
                                                    </a>{" "}
                                                    started following you.
                                                </p>
                                            </div>
                                            <div className="timestamp">
                                                19:45
                                            </div>
                                        </li>
                                    </ul>

                                    <small
                                        className="d-block mt-3"
                                        style={{
                                            marginLeft: " 30px",
                                            fontWeight: 500,
                                            color: " #999",
                                        }}
                                    >
                                        Yesterday
                                    </small>

                                    <ul className="list-group list-group-notifications-2">
                                        <li className="list-group-item">
                                            <div className="user-avatar">
                                                <span className="avatar avatar-1 rounded-circle">
                                                    <i className="fas fa-comments"></i>
                                                </span>
                                            </div>
                                            <div className="item-info">
                                                <a href="#">
                                                    You have 43 new comments.
                                                </a>
                                            </div>
                                            <div className="timestamp">
                                                19:45
                                            </div>
                                        </li>
                                        <li className="list-group-item">
                                            <div className="user-avatar">
                                                <span className="avatar avatar-1 rounded-circle">
                                                    LG
                                                </span>
                                                <span className="badge badge-secondary color-badge badge-size-1"></span>
                                            </div>
                                            <div className="item-info">
                                                <p>
                                                    <a href="#">
                                                        Leone Gutkowski
                                                    </a>{" "}
                                                    started following you.
                                                </p>
                                            </div>
                                            <div className="timestamp">
                                                19:45
                                            </div>
                                        </li>
                                        <li className="list-group-item">
                                            <div className="user-avatar">
                                                <span className="avatar avatar-1 rounded-circle">
                                                    SR
                                                </span>
                                                <span className="badge badge-success color-badge badge-size-1"></span>
                                            </div>
                                            <div className="item-info">
                                                <p>
                                                    <a href="#">
                                                        Sterling Robel
                                                    </a>{" "}
                                                    sent you a new message.
                                                </p>
                                            </div>
                                            <div className="timestamp">
                                                19:45
                                            </div>
                                        </li>
                                    </ul>

                                    <small
                                        className="d-block mt-3"
                                        style={{
                                            marginLeft: " 30px",
                                            fontWeight: 500,
                                            color: " #999",
                                        }}
                                    >
                                        5 days ago
                                    </small>

                                    <ul className="list-group list-group-notifications-2">
                                        <li className="list-group-item">
                                            <div className="user-avatar">
                                                <span className="avatar avatar-1 rounded-circle">
                                                    <i className="fas fa-shopping-bag"></i>
                                                </span>
                                            </div>
                                            <div className="item-info">
                                                <a href="#">
                                                    You have 2 new orders
                                                    waiting.
                                                </a>
                                            </div>
                                            <div className="timestamp">
                                                19:45
                                            </div>
                                        </li>
                                        <li className="list-group-item mt-3 list-group-loader">
                                            <a
                                                href="#"
                                                className="btn btn-ellipsis-loader"
                                            >
                                                <div className="lds-ellipsis">
                                                    <div></div>
                                                    <div></div>
                                                    <div></div>
                                                    <div></div>
                                                </div>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </li>
                        <li className="nav-item nav-user-dropdown dropdown">
                            <a
                                href="#"
                                className="nav-link dropdown-toggle dropdown-nocaret"
                                role="button"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="true"
                            >
                                <div
                                    className="float-left mr-2"
                                    bis_skin_checked="1"
                                >
                                    <h6 className="mb-0">{auth.user.UserName}</h6>{" "}
                                    <small>{auth.current_hub.ShipmentProviderName}</small>
                                </div>
                                <img
                                    src="/assets/avatars/users.jpg"
                                    className="avatar avatar-1 rounded-circle"
                                    alt="Avatar image"
                                />
                            </a>
                            <div className="dropdown-menu dropdown-menu-arrow dropdown-menu-sm dropdown-menu-start">
                                <div className="dropdown-header pt-0">
                                    <small className="text-overflow m-0">
                                        Welcome
                                    </small>
                                </div>
                                <Link
                                    className={`${
                                        route().current("profile") && "active"
                                    } dropdown-item`}
                                    href={route("profile")}
                                >
                                    <i className="fas fa-users"></i>
                                    <span>Profile</span>
                                </Link>
                                <Link
                                    className={`${
                                        route().current("switchHub") && "active"
                                    } dropdown-item`}
                                    href={route("switchHub")}
                                >
                                    <i className="fas fa-exchange-alt"></i>
                                    <span>Switch Hubs</span>
                                </Link>

                                <a href="/switch-hubs" className="dropdown-item">
                                    <i className="fas fa-shipping-fast"></i>
                                    <span>Drivers Management</span>
                                </a>
                                <a href="/switch-hubs" className="dropdown-item">
                                    <i className="fas fa-cog"></i>
                                    <span>Configuration</span>
                                </a>
                                <a href="/switch-hubs" className="dropdown-item">
                                    <i className="fas fa-code"></i>
                                    <span>API</span>
                                </a>
                                <Link
                                    className="dropdown-item"
                                    as="a"
                                    method="post"
                                    href={route("logout")}
                                >
                                    <i className="fas fa-power-off"></i>
                                    <span className="nav-link-text ms-1">
                                        Log out
                                    </span>
                                </Link>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

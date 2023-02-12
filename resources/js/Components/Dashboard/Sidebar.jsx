import { Link } from "@inertiajs/inertia-react";
import React from "react";

export default function Sidebar({isEmployee}) {
    return (
        <nav className="navbar navbar-bottom navbar-expand-lg navbar-dark">
            <div className="container-fluid">
                <div
                    className="collapse navbar-collapse"
                    id="navbar-bottom-collapsible"
                >
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link
                                className={`${
                                    route().current("dashboard") && "active"
                                } nav-link`}
                                href={route("dashboard")}
                            >
                                <i className="fas fa-tachometer-alt fa-lg align-middle mr-1"></i>
                                <span>Dashboard</span>
                            </Link>
                        </li>
                        {/* <li className='nav-item'>
                            <Link className={`${route().current('profile') && 'active'} nav-link`} href={route('profile')}>
                                    <i className="ni ni-single-02 text-dark text-sm opacity-10" />
                                <span className="nav-link-text ms-1">Profile</span>
                            </Link>
                        </li> */}
                        <li className="nav-item">
                            <a href="/" className="nav-link active">
                                <i className="fas fa-eye fa-lg align-middle mr-1"></i>
                                <span>Overview</span>
                            </a>
                        </li>
                        {/* <li className="nav-item">
                            <Link
                                className={`${
                                    route().current("users.*") && "active"
                                } nav-link`}
                                href={route("users.index")}
                            >
                                <i className="fas fa-user-lock text-warning text-sm opacity-10" />
                                <span className="nav-link-text ms-1">
                                    Users
                                </span>
                            </Link>
                        </li> */}
                        <li className="nav-item dropdown">
                            <a
                                className="nav-link dropdown-toggle"
                                href="#"
                                role="button"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                <i className="fas fa-donate fa-lg align-middle mr-1"></i>
                                <span>Finance</span>
                            </a>
                            <ul className="dropdown-menu dropdown-menu-arrow dropdown-menu-end">
                                <li>
                                    <a href="#" className="dropdown-item">
                                        <i className="fas fa-check-circle"></i>
                                        <span>Delivered</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="dropdown-item">
                                        <i className="fas fa-dollar-sign"></i>
                                        <span>Paid</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="dropdown-item">
                                        <i className="fas fa-file-invoice-dollar"></i>
                                        <span>Transactions</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="dropdown-item">
                                        <i className="fas fa-file-invoice-dollar"></i>
                                        <span>Invoices</span>
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li className="nav-item dropdown">
                            <a
                                className="nav-link dropdown-toggle"
                                href="#"
                                role="button"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                <i className="fas fa-boxes fa-lg align-middle mr-1"></i>
                                <span>Consignment</span>
                            </a>
                            <ul className="dropdown-menu dropdown-menu-arrow dropdown-menu-end">
                                <li>
                                    <a href="#" className="dropdown-item">
                                        <i className="fas fa-tshirt"></i>
                                        <span>Products</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="dropdown-item">
                                        <i className="fas fa-clipboard-list"></i>
                                        <span>PO Lists</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="dropdown-item">
                                        <i className="fas fa-box"></i>
                                        <span>Orders</span>
                                    </a>
                                </li>
                            </ul>
                        </li>
                       {isEmployee &&
                         <li className="nav-item dropdown">
                         <a
                             className={`${
                                 route().current("pickup.*") && "active"
                             } nav-link dropdown-toggle`}
                             href="#"
                             role="button"
                             data-toggle="dropdown"
                             aria-haspopup="true"
                             aria-expanded="false"
                         >
                             <i className="fas fa-dolly-flatbed fa-lg align-middle mr-1"></i>
                             <span>Pickup</span>
                         </a>
                         <ul className="dropdown-menu dropdown-menu-arrow dropdown-menu-end">
                             <li>
                                 <Link
                                     className={`${
                                         route().current(
                                             "pickup.packages"
                                         ) && "active"
                                     }  dropdown-item`}
                                     href={route("pickup.packages")}
                                 >
                                     <i className="fas fa-box"></i>
                                     <span>Packages</span>
                                 </Link>
                             </li>
                             <li>
                                 <Link
                                     className={`${
                                         route().current("pickup.dropoff") &&
                                         "active"
                                     }  dropdown-item 
                                     `}
                                     href={route("pickup.dropoff")}
                                 >
                                     <i className="fas fa-pallet"></i>
                                     <span>Drop off</span>
                                 </Link>
                             </li>
                             <li>
                                 <Link
                                     className={`${
                                         route().current(
                                             "pickup.shippers"
                                         ) && "active"
                                     }  dropdown-item`}
                                     href={route("pickup.shippers")}
                                 >
                                     <i className="fas fa-user-tie"></i>
                                     <span>Shippers</span>
                                 </Link>
                             </li>
                         </ul>
                     </li>
                       }
                        <li className="nav-item dropdown">
                            <a
                                className="nav-link dropdown-toggle"
                                href="#"
                                role="button"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                <i className="fas fa-truck-moving fa-lg align-middle mr-1"></i>
                                <span>In Transit</span>
                            </a>
                            <ul className="dropdown-menu dropdown-menu-arrow dropdown-menu-end">
                                <li>
                                    <a href="#" className="dropdown-item">
                                        <i className="fas fa-box"></i>
                                        <span>Packages</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="dropdown-item">
                                        <i className="fas fa-luggage-cart"></i>
                                        <span>Movable Unit</span>
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li className="nav-item dropdown">
                            <a
                                className="nav-link dropdown-toggle"
                                href="#"
                                role="button"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                <i className="fas fa-building fa-lg align-middle mr-1"></i>
                                <span>At the Hub</span>
                            </a>
                            <ul className="dropdown-menu dropdown-menu-arrow dropdown-menu-end">
                                <li>
                                    <a href="#" className="dropdown-item">
                                        <i className="fas fa-box"></i>
                                        <span>Packages</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="dropdown-item">
                                        <i className="fas fa-layer-group"></i>
                                        <span>Locations</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="dropdown-item">
                                        <i className="fas fa-sync-alt"></i>
                                        <span>Cycle count</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="dropdown-item">
                                        <i className="fas fa-question-circle"></i>
                                        <span>Lost</span>
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li className="nav-item dropdown">
                            <a
                                className="nav-link dropdown-toggle"
                                href="#"
                                role="button"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                <i className="fas fa-paper-plane fa-lg align-middle mr-1"></i>
                                <span>Transfert</span>
                            </a>
                            <ul className="dropdown-menu dropdown-menu-arrow dropdown-menu-end">
                                <li>
                                    <a href="#" className="dropdown-item">
                                        <i className="fas fa-luggage-cart"></i>
                                        <span>Movable Unit</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="dropdown-item">
                                        <i className="fas fa-shipping-fast"></i>
                                        <span>Delivery run</span>
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li className="nav-item dropdown">
                            <a
                                className="nav-link dropdown-toggle"
                                href="#"
                                role="button"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                <i className="fas fa-undo-alt fa-lg align-middle mr-1"></i>
                                <span>Reconciel</span>
                            </a>
                            <ul className="dropdown-menu dropdown-menu-arrow dropdown-menu-end">
                                <li>
                                    <a href="#" className="dropdown-item">
                                        <i className="fas fa-box"></i>
                                        <span>Packages</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="dropdown-item">
                                        <i className="fas fa-shipping-fast"></i>
                                        <span>Delivery run</span>
                                    </a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

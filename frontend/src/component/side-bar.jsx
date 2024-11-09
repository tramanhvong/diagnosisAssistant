import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const SideBar = () => {
    const routes = [
        {
            icon: <i className="bi bi-house-door iconSize" />,
            placeholder: 'Home',
            route: '/'
        },
        {
            icon: <i className="bi bi-cart2 iconSize" />,
            placeholder: 'Orders',
            route: '/orders'
        },
        {
            icon: <i className="bi bi-box iconSize" />,
            placeholder: 'Products',
            route: '/products'
        },
        {
            icon: <i className="bi bi-person iconSize" />,
            placeholder: 'Customers',
            route: '/customers'
        },
        {
            icon: <i className="bi bi-bar-chart iconSize" />,
            placeholder: 'Analytics',
            route: '/analytics'
        },
        {
            icon: <i className="bi bi-gear iconSize" />,
            placeholder: 'Settings',
            route: '/settings'
        }
    ];

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-auto bg-light sticky-top" style={{ width: '80px' }}>
                    <div className="d-flex flex-column flex-nowrap bg-light align-items-center sticky-top">
                        <a href="/" className="d-block py-2 px-1 link-dark text-decoration-none" title="Home">
                            <i className="bi-bootstrap fs-3"></i>
                        </a>
                        <ul className="nav nav-pills nav-flush flex-column flex-nowrap mb-auto text-center align-items-center">
                            <li className="nav-item">
                                <a href="#" className="nav-link py-2 px-1" title="Home">
                                    <i className="bi-house fs-5"></i>
                                </a>
                            </li>
                            <li>
                                <a href="#" className="nav-link py-2 px-1" title="Dashboard">
                                    <i className="bi-speedometer2 fs-5"></i>
                                </a>
                            </li>
                            <li>
                                <a href="#" className="nav-link py-2 px-1" title="Orders">
                                    <i className="bi-table fs-5"></i>
                                </a>
                            </li>
                            <li>
                                <a href="#" className="nav-link py-2 px-1" title="Products">
                                    <i className="bi-heart fs-5"></i>
                                </a>
                            </li>
                            <li>
                                <a href="#" className="nav-link py-2 px-1" title="Customers">
                                    <i className="bi-people fs-5"></i>
                                </a>
                            </li>
                        </ul>
                        <div className="dropdown mt-auto">
                            <a href="#" className="d-flex align-items-center justify-content-center py-2 px-1 link-dark text-decoration-none dropdown-toggle" id="dropdownUser3" data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="bi-person-circle fs-5"></i>
                            </a>
                            <ul className="dropdown-menu text-small shadow" aria-labelledby="dropdownUser3">
                                <li><a className="dropdown-item" href="#">New project...</a></li>
                                <li><a className="dropdown-item" href="#">Settings</a></li>
                                <li><a className="dropdown-item" href="#">Profile</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col p-2 min-vh-100">
                    {/* Main content goes here */}
                </div>
            </div>
        </div>
    );
};

export default SideBar;

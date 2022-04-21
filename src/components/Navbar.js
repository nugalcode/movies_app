import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/Navbar.css';

const Navbar = ({ navLocation } ) => {

    const [currPage, setCurrentPage] = useState(navLocation);

    return (
        <div className="nav">
            <li>
                <Link
                    to="/"
                    className={currPage === "/" ? "navLink currPage" : "navLink"}
                    onClick={() => setCurrentPage("/")}
                >
                    Home
                </Link>
            </li>

            <li>
                <Link
                    to="/Favorites"
                    className={currPage === "/Favorites" ? "navLink currPage" : "navLink"}
                    onClick={() => setCurrentPage("/Favorites")}
                >
                    Favorites
                </Link>
            </li>
        </div>
    );
}

export default Navbar;
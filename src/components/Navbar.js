import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Navbar.css';

const Navbar = () => {
    return (
        <div className="nav">
            <li>
                <Link to="/"> Home </Link>
            </li>
            <li>
                <Link to="/Favorites"> Favorites </Link>
            </li>
        </div>
    );
}

export default Navbar;
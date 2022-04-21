import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/Navbar.css';
import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';

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
                    <span className="textLink"> Home </span>
                    <HomeIcon className="iconLink" /> 
                </Link>
            </li>

            <li>
                <Link
                    to="/Favorites"
                    className={currPage === "/Favorites" ? "navLink currPage" : "navLink"}
                    onClick={() => setCurrentPage("/Favorites")}
                >
                    <span className="textLink"> Favorites </span>
                    <FavoriteIcon className="iconLink" />
                </Link>
            </li>
        </div>
    );
}

export default Navbar;
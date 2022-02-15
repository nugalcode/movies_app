import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/Navbar.css';

const Navbar = () => {

    const [home, setHome] = useState(true);
    const [favorites, setFavorites] = useState(false);


    const handleOnClick = (page) => {
        if (page === "home") {
            if (home)
                return;
            else {
                setHome(true)
                setFavorites(false);
            }
        }
        else {
            if (favorites)
                return;
            else {
                setFavorites(true);
                setHome(false);
            }
        }
    }

    return (
        <div className="nav">
            <li>
                <Link
                    to="/"
                    className={home ? "navLink currPage" : "navLink"}
                    onClick={() => handleOnClick("home")}
                >
                    Home
                </Link>
            </li>

            <li>
                <Link
                    to="/Favorites"
                    className={favorites ? "navLink currPage" : "navLink"}
                    onClick={() => handleOnClick("favorites")}
                >
                    Favorites
                </Link>
            </li>
        </div>
    );
}

export default Navbar;
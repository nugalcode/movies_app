import React from 'react';
import tmdb_logo from '../imgs/tmdb_logo (2).png';
import '../css/Footer.css'

const Footer = () => {
    return (
        <div id="footer">
            <div> 2022 </div>
            <div id="tmdbWrap">
                <img src={tmdb_logo} alt="tmdbLogo" title="The Movie Database" />
            </div>
        </div>
    )
}

export default Footer;
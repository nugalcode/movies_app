import React, { useState, useEffect } from 'react';
import '../App.css'

/**
 *  Favorites Page
 *  - Movies are added to this page via the home page
 *  - 
 */
const Favorites = ( { moviesFromHome } ) => {

    const [movies, setMovies] = useState([moviesFromHome])



    useEffect(() => {

    }, [moviesFromHome] )

    return (
        <div className="favorites">
            
        </div>
    );
}

export default Favorites;
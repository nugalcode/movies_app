import React, { useState, useEffect } from 'react';
import Movie from '../components/Movie'
import '../App.css'

/**
 *  Favorites Page
 *  - Movies are added to this page via the home page
 *  - 
 */
const Favorites = () => {

    const [movies, setMovies] = useState(() => {
        const saved = localStorage.getItem("favoriteMovies");
        var initVal = saved ? JSON.parse(saved) : [];
        return initVal || [];
    })

    return (
        <div className="favorites">
            <div className="movieList">
                {movies.map((movie, index) => {
                    return (
                        <Movie
                            key={index}
                            movie_={movie}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default Favorites;
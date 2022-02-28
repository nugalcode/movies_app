import React, { useState, useEffect } from 'react';
import Movie from '../components/Movie';
import '../css/Favorites.css';
import ClearIcon from '@mui/icons-material/Clear';
/**
 *  Favorites Page
 *  - Movies are added to this page via the home page
 *  - 
 */

const getLocalStorageArr = () => {
    const saved = localStorage.getItem("favoriteMovies");
    var initVal = saved ? JSON.parse(saved) : [];
    return initVal || [];
}

const deleteMovieFromArray = (valToDelete, arr) => {
    if (arr.length === 0) {
        return [];
    }
    const result = arr.filter(element => valToDelete !== element.id);
    return result;
}

const Favorites = () => {

    const [movies, setMovies] = useState(() => {
        return getLocalStorageArr();
    });

    const handleOnClick = (id) => {
        const currentFavs = movies;
        const favsToStore = deleteMovieFromArray(id, currentFavs);
        localStorage.setItem("favoriteMovies", JSON.stringify(favsToStore));
        setMovies(favsToStore);
    }

    return (
        <div className="favorites">
            <div className="movieList" >
                {movies.map((movie, index) => {
                    return (
                        <div className="favoriteMovie" key={index}>
                            <Movie
                                key={index}
                                movie_={movie}
                                />
                            <ClearIcon
                                className="favoritesClearIcon"
                                key={movie.id}
                                onClick={() => handleOnClick(movie.id)}
                                />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Favorites;
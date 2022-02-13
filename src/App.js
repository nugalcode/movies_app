import './App.css';
import './css/Genres.css';
import React, { useState, useEffect, useRef } from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Routes, Route, Link } from 'react-router-dom';
import Favorites from './pages/Favorites';
import Home from './pages/Home';
import Navbar from './components/Navbar.js';

const API_POPULAR = "https://api.themoviedb.org/3/movie/popular?api_key=4bca7efadb757706ddd4616b4bf154d9&language=en-US&page=1";
const API_SIMILAR = "https://api.themoviedb.org/3/movie/634649/similar?api_key=4bca7efadb757706ddd4616b4bf154d9&language=en-US&page=1"
const API_SEARCH_MOVIE = "https://api.themoviedb.org/3/search/movie?api_key=4bca7efadb757706ddd4616b4bf154d9&query=";
const API_LATEST = "https://api.themoviedb.org/3/movie/latest?api_key=4bca7efadb757706ddd4616b4bf154d9";
const API_TOP_RATED = "https://api.themoviedb.org/3/movie/top_rated?api_key=4bca7efadb757706ddd4616b4bf154d9&language=en-US&page=1";
const API_NOW_PLAYING = "https://api.themoviedb.org/3/movie/now_playing?api_key=4bca7efadb757706ddd4616b4bf154d9&language=en-US&page=1";

function App() {

    const [movies, setMovies] = useState([]);
    const [dropDownOpen, setDropDownOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const handleSortPopular = (e) => {
        getMoviesRequest(API_POPULAR);
    }
    const handleSortLatest = (e) => {
        getMoviesRequest(API_LATEST);
    }
    const handleSortTopRated = (e) => {
        getMoviesRequest(API_TOP_RATED);
    }
    const handleSortNowPlaying = (e) => {
        getMoviesRequest(API_NOW_PLAYING);
    }

    // function to fetch the movies using passed in API param, sets the movies state
    const getMoviesRequest = async (API) => {
        const response = await fetch(API);
        const responseJson = await response.json();
        if (responseJson.results) {
            setMovies(responseJson.results);
        }
        else {
            setMovies([responseJson]);
        }

    }

    /* handling user search input */
    const handleOnSubmit = (e) => {
        //prevents page reload
        e.preventDefault();

        //only call API when there is a search term
        if (searchTerm) {
            getMoviesRequest(API_SEARCH_MOVIE + searchTerm);
            //reset search term
            setSearchTerm("");
        }
    }
    const handleOnChange = (e) => {
        setSearchTerm(e.target.value);
    }

    // on initial render
    useEffect(() => {
        getMoviesRequest(API_POPULAR)
    }, []);

    return (
        <div className="App">

            <div className="header">
                <div className="sortBy"
                    onMouseEnter={() => setDropDownOpen(true)}
                    onMouseLeave={() => setDropDownOpen(false)}>
                    <div className="sortAndIconWrap">
                        <span> Sort By </span>
                        <ArrowDropDownIcon />
                        <div className={dropDownOpen ? "sortOptions open" : "sortOptions"}>
                            <ul>
                                <li onClick={() => handleSortPopular()}> Popular </li>
                                <li onClick={() => handleSortNowPlaying()}> Now Playing </li>
                                <li onClick={() => handleSortTopRated()}> Top Rated </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <Navbar />

                <div className="searchBarWrap">
                    <form onSubmit={handleOnSubmit}>
                        <input
                            type="search"
                            className="searchBar"
                            placeholder="Search movie..."
                            value={searchTerm}
                            onChange={handleOnChange}
                        />
                    </form>
                </div>
            </div>

            <Routes>
                <Route path='/' element={<Home movies_={movies} />} />
                <Route path='/Favorites' element={<Favorites />} />
            </Routes>

        </div>
    );
}

export default App;

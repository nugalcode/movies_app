import './App.css';
import './css/Genres.css';
import React, { useState, useEffect, useRef } from 'react';
import Movie from './components/Movie';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { GENRES_LIST } from './components/GenresList';
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import { Routes, Route, useLocation, Link } from 'react-router-dom'
import Favorites from './pages/Favorites'
import Home from './pages/Home'

const genres_list = GENRES_LIST;

const API_POPULAR = "https://api.themoviedb.org/3/movie/popular?api_key=4bca7efadb757706ddd4616b4bf154d9&language=en-US&page=1";
const API_SIMILAR = "https://api.themoviedb.org/3/movie/634649/similar?api_key=4bca7efadb757706ddd4616b4bf154d9&language=en-US&page=1"
const API_SEARCH_MOVIE = "https://api.themoviedb.org/3/search/movie?api_key=4bca7efadb757706ddd4616b4bf154d9&query=";
const API_LATEST = "https://api.themoviedb.org/3/movie/latest?api_key=4bca7efadb757706ddd4616b4bf154d9";
const API_TOP_RATED = "https://api.themoviedb.org/3/movie/top_rated?api_key=4bca7efadb757706ddd4616b4bf154d9&language=en-US&page=1";
const API_NOW_PLAYING = "https://api.themoviedb.org/3/movie/now_playing?api_key=4bca7efadb757706ddd4616b4bf154d9&language=en-US&page=1";
const API_GET_GENRES_LIST = "https://api.themoviedb.org/3/genre/movie/list?api_key=4bca7efadb757706ddd4616b4bf154d9&language=en-US"
const API_GET_MOVIE_BY_GENRE = "https://api.themoviedb.org/3/discover/movie?api_key=4bca7efadb757706ddd4616b4bf154d9&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres="


function App() {

    const [movies, setMovies] = useState([]);
    const [dropDownOpen, setDropDownOpen] = useState(false);
    const [genresString, setGenresString] = useState("");
    const [selected, setSelected] = useState([]);
    const [notSelected, setNotSelected] = useState(genres_list);

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
    const [searchTerm, setSearchTerm] = useState("");
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

    /* Handling genre query */
    /* Logic Flow: 
        1) User clicks on a Genre -> onClick is fired 
        2) calls either removeSelected or addSelected depending on what genre is clicked
        3) function updates selected and notSelected array state
        4) updating selected fires useEffect -> handleGenreString is called
        5) handleGenreString updates genresString state
        6) updating genresString activates another useEffect -> getMoviesRequest is called
        7) Movies display is updated according to genres selected
     */

    // when a selected genre is clicked
    const removeSelected = (genre_id, genre_name) => {
        // remove genre from selected array state
        var newList = [];
        newList = selected.filter((element) => element.id != genre_id);
        setSelected(newList);

        // add genre into notSelected array state
        var tempList = [];
        var newGenre = {};
        newGenre.id = genre_id;
        newGenre.name = genre_name;
        tempList = notSelected.concat(newGenre);
        setNotSelected(tempList);
    }

    // when a not selected genre is clicked
    const addSelected = (genre_id, genre_name) => {
        // add genre into selected array state
        var newList = [];
        var newGenre = {};
        newGenre.id = genre_id;
        newGenre.name = genre_name;
        newList = selected.concat(newGenre);
        setSelected(newList);

        // remove genre from notSelected array state
        var tempList = [];
        tempList = notSelected.filter((element) => element.id != genre_id);
        setNotSelected(tempList);
    }

    const handleGenreString = () => {
        var tempString = "";
        var tempList = selected;

        tempList.map((genre, index) => {
            if (tempString.length != 0) {
                tempString = tempString + "," + genre.id;
            }
            else {
                tempString = genre.id;
            }
        })
        setGenresString(tempString);
    }

    useEffect(() => {
        getMoviesRequest(API_GET_MOVIE_BY_GENRE + genresString)
    }, [genresString]);
    useEffect(() => {
        handleGenreString();
    }, [selected])

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

                <Routes>
                    <Route path='/' element={this} />
                    <Route path='/Favorites' element={<Favorites name={"PROPS"} />} />
                </Routes>

                <div className="nav">
                    <li>
                        <Link to="/"> Home </Link>
                    </li>
                    <li>
                        <Link to="/Favorites"> Favorites </Link>
                    </li>
                </div>

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

            <div className="genres">
                {selected.map((genre, index) => {
                    return (
                        <div
                            className="genre selected"
                            id={genre.id}
                            key={genre.id}
                            onClick={() => removeSelected(genre.id, genre.name)}
                        >
                            <span> {genre.name} </span>
                            <ClearIcon className="genreIcon" />
                        </div>
                    )
                })}
                {notSelected.map((genre, index) => {
                    return (
                        <div
                            className="genre"
                            id={genre.id}
                            key={genre.id}
                            onClick={() => addSelected(genre.id, genre.name)}
                        >
                            <span> {genre.name} </span>
                            <AddIcon className="genreIcon" />
                        </div>
                    )
                })}
            </div>

            <div className="movieList">
                {movies.map((movie, index) => {
                    return (
                        <Movie
                            key={index}
                            poster_path={movie.poster_path}
                            title={movie.original_title}
                            rating={movie.vote_average}
                            overview={movie.overview}
                            genres={movie.genre_ids}
                            release_date={movie.release_date}
                            movie_id={movie.id}
                        />
                    );
                })}
            </div>

        </div>
    );
}

export default App;

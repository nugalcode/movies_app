import '../css/Genres.css';
import '../css/Home.css';
import React, { useState, useEffect, useRef } from 'react';
import Movie from '../components/Movie';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { GENRES_LIST } from '../components/GenresList';
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';

const genres_list = GENRES_LIST;
const API_KEY = process.env.REACT_APP_API_KEY

const API_GET_GENRES_LIST = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`;
const API_GET_MOVIE_BY_GENRE = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=`;


const Home = ( {movies_} ) => {

    const [movies, setMovies] = useState(movies_);
    const [genresString, setGenresString] = useState("");
    const [selected, setSelected] = useState([]);
    const [notSelected, setNotSelected] = useState(genres_list);

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

    // setting movies everytime movies_ changes due to search and sort by feature in header
    useEffect(() => {
        setMovies(movies_);
    }, [movies_])
    return (
        <div className="home" key={movies_}>
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
                            <div className="genreInner selected">
                                <span> {genre.name} </span>
                                <ClearIcon className="genreIcon" />
                            </div>
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
                            <div className="genreInner">
                                <span> {genre.name} </span>
                                <AddIcon className="genreIcon" />
                            </div>
                        </div>
                    )
                })}
            </div>

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

export default Home;

import React, { useState, useEffect, useCallback }  from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import FavoriteIcon from '@mui/icons-material/Favorite';
import '../css/Movie.css'
import { GENRES_LIST } from './GenresList';

const API_KEY = process.env.REACT_APP_API_KEY;
const API_POSTER = "https://image.tmdb.org/t/p/w300"
const API_MOVIE_VIDEOS_1 = "https://api.themoviedb.org/3/movie/"
const API_MOVIE_VIDEOS_2 =  `/videos?api_key=${API_KEY}&language=en-US`
const genres_list = GENRES_LIST;
const TRAILER_START = "https://www.youtube.com/watch?v="
// changing background color of rating
const returnVoteClass = (vote) => {
    if (vote >= 8) {
        return "rating green";
    }
    else if (vote >= 6) {
        return "rating orange";
    }
    else {
        return "rating red";
    }
}


function getGenreName(id) {
    var name = "";
    for (let i = 0; i < genres_list.length; i++) {
        if (genres_list[i].id === id) {
            name = genres_list[i].name;
        }
    }
    return name;
}

const deleteMovieFromArray = (valToDelete, arr) => {
    if (arr.length === 0) {
        return [];
    }
    const result = arr.filter(element => valToDelete !== element.id);
    return result;
}

const arrIncludesVal = (val, arr) => {
    if (arr.length === 0) {
        return false;
    }
    for (let i = 0; i < arr.length; i++) {
        var movie = arr[i];
        if (movie.id === val) {
            return true;
        }
    }
    return false;
};

const Movie = ({ movie_ }) => {

    const [modalOpen, setModalOpen] = useState(false);
    const [videos, setVideos] = useState([]);
    const [trailerKey, setTrailerKey] = useState("");
    const [trailerFound, setTrailerFound] = useState(false);
    const [favorite, setFavorite] = useState(() => {
        const saved = localStorage.getItem("favoriteMovies");
        const initVal = JSON.parse(saved);
        const val = initVal || [];
        return arrIncludesVal(movie_.id, val);
    });

    const getVideos = async (API) => {
        const response = await fetch(API);
        const responseJson = await response.json();
        if (responseJson.results) {
            setVideos(responseJson.results);
        }
        else {
            setVideos([responseJson]);
        }
    }
    const findTrailerKey = useCallback(() => {
        var tempKey = "";
        for (let i = 0; i < videos.length; i++) {
            var video = videos[i];
            if (video.official === true && video.type === "Trailer" && video.site === "YouTube") {
                tempKey = tempKey + video.key;
                setTrailerFound(true);
                break;
            }
        };
        setTrailerKey(tempKey);
    },
        [setTrailerKey, setTrailerFound, videos]
    )
    
    useEffect(() => {
        getVideos(API_MOVIE_VIDEOS_1 + movie_.id + API_MOVIE_VIDEOS_2);
    }, [movie_]);
    //runs once videos is changed i.e. after useEffect on init render
    useEffect(() => {
        findTrailerKey();
    }, [videos, findTrailerKey])

    
    useEffect(() => {
        const initFavorite = () => {
            const saved = localStorage.getItem("favoriteMovies");
            var initVal = JSON.parse(saved);
            var val = initVal || [];
            if (arrIncludesVal(movie_.id, val)) {
                setFavorite(true);
            }
            else {
                setFavorite(false);
            }
        }
        initFavorite();
    }, [movie_]);

    /* prevents Modal from closing when clicking on the content */
    const handleContentOnClick = (e) => {
        e.stopPropagation();
    };

    /* close modal on Esc key press */
    const keyPress = useCallback(e => {
        if (e.key === 'Escape' && modalOpen) {
            setModalOpen(false);
        }
    },
        [setModalOpen, modalOpen]
    );

    useEffect(() => {
        document.addEventListener('keydown', keyPress);
        return () => document.removeEventListener('keydown', keyPress)
    });

    useEffect(() => {
        if (favorite) {
            const saved = localStorage.getItem("favoriteMovies");
            let initVal = JSON.parse(saved);
            let val = initVal || [];
            if (!arrIncludesVal(movie_.id, val)) {
                const valToStore = val.concat([movie_]);
                localStorage.setItem("favoriteMovies", JSON.stringify(valToStore));
            }
        }
        else {
            const saved = localStorage.getItem("favoriteMovies");
            let initVal = JSON.parse(saved);
            let val = initVal || [];
            const valToStore = deleteMovieFromArray(movie_.id, val);
            localStorage.setItem("favoriteMovies", JSON.stringify(valToStore));
        }
    }, [favorite, movie_]);


    return (
        <>
            <div className="movie">
                <img src={ API_POSTER + movie_.poster_path} alt="movie_pic" />
                <div className="titleAndRatingWrap">
                    <div className="title"> {movie_.title} </div>
                    
                    <div className={returnVoteClass(movie_.vote_average)}> {movie_.vote_average} </div>
                </div>
                <div className="detailsAndFavWrap">
                    <div className="details" onClick={() => setModalOpen(true)}>
                        <OpenInFullIcon className="openInFull" />
                    </div>
                    <FavoriteIcon
                        className={favorite ? "favoriteIcon pink" : "favoriteIcon"}
                            onClick={() => setFavorite(!favorite)} />
                </div>
            </div>

            {modalOpen
                &&
                <div className="modal" onClick={() => setModalOpen(!modalOpen)}>
                    <div className="contentWrap" onClick={(e) => handleContentOnClick(e)}>
                        <div className="movieModalWrap">
                            <div className="movieModal">
                                <div className="imgWrap">
                                    <img src={API_POSTER + movie_.poster_path} alt="movie_pic" />
                                </div>

                                <div className="titleAndRatingWrap">
                                    <div className="title"> {movie_.title} </div>

                                    <div className={returnVoteClass(movie_.vote_average)}> {movie_.vote_average} </div>
                                </div>

                                <div className="dateWrap">
                                    <div className="releaseDate"> Release: {movie_.release_date} </div>
                                    <div className="trailerWrap">
                                        {trailerFound ?
                                            <a
                                            className="trailerLink"
                                            href={TRAILER_START + trailerKey}
                                            target="_blank"
                                            rel="noreferrer nofollow"
                                        >
                                            Trailer
                                            <OpenInNewIcon className="openInNew"/>
                                            </a>
                                            :
                                            <span className="trailerLink"> no trailer </span>}
                                    </div>
                                </div>
                            </div>

                            <div className="overviewModal">
                                <h2> Overview </h2>
                                <p> {movie_.overview} </p>
                                <div className="genresModalWrap">
                                    {movie_.genre_ids.map((genre, index) => {
                                        return (
                                            <div
                                                className="genresModal"
                                                key={index}>
                                                {getGenreName(genre)}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                            <ClearIcon className="modalClose" onClick={() => setModalOpen(false)} />
                        </div>
                    </div>
                    
                </div>
                
            }
        </>
    );

}

export default Movie;
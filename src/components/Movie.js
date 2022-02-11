import React, { useState, useEffect, useCallback }  from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { GENRES_LIST } from './GenresList';

const API_POSTER = "https://image.tmdb.org/t/p/w300"
const API_MOVIE_VIDEOS_1 = "https://api.themoviedb.org/3/movie/"
const API_MOVIE_VIDEOS_2 =  "/videos?api_key=4bca7efadb757706ddd4616b4bf154d9&language=en-US"
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

const Movie = ({ title, poster_path, rating, overview, genres, release_date, movie_id }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [videos, setVideos] = useState([]);
    const [trailerKey, setTrailerKey] = useState("");
    const [trailerFound, setTrailerFound] = useState(false);
    const getVideos = async (API) => {
        const response = await fetch(API);
        const responseJson = await response.json();
        if (responseJson.results) {
            setVideos(responseJson.results);
        }
        else {
            setVideos([responseJson]);
        }
        //console.log(videos);
        //console.log(API_MOVIE_VIDEOS_1 + movie_id + API_MOVIE_VIDEOS_2);
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
    // only runs on initial render due to empty array argument
    useEffect(() => {
        getVideos(API_MOVIE_VIDEOS_1 + movie_id + API_MOVIE_VIDEOS_2);
        
    }, [movie_id]);

    //runs once videos is changed i.e. after useEffect on init render
    useEffect(() => {
        findTrailerKey();
    }, [videos, findTrailerKey])

    /* prevents Modal from closing when clicking on the content */
    const handleContentOnClick = (e) => {
        e.stopPropagation();
    };
    return (
        <>
            <div className="movie">
                <img src={ API_POSTER + poster_path} alt="movie_pic" />
                <div className="titleAndRatingWrap">
                    <div className="title"> {title} </div>
                    
                    <div className={returnVoteClass(rating)}> {rating} </div>
                </div>
                <div className="details" onClick={() => setModalOpen(true)}>
                    details
                    <OpenInFullIcon className="openInFull"/>
                </div>
            </div>

            {modalOpen
                &&
                <div className="modal" onClick={() => setModalOpen(!modalOpen)}>
                    <div className="contentWrap" onClick={(e) => handleContentOnClick(e)}>
                        <div className="movieModalWrap">
                            <div className="movieModal">
                                <img src={API_POSTER + poster_path} alt="movie_pic" />
                                <div className="titleAndRatingWrap">
                                    <div className="title"> {title} </div>

                                    <div className={returnVoteClass(rating)}> {rating} </div>
                                </div>
                            <div className="dateWrap">
                                <div className="releaseDate"> Release: {release_date} </div>
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
                                <div className="genresModalWrap">
                                    {genres.map((genre, index) => {
                                        return (
                                            <div
                                                className="genresModal"
                                                key={index}>
                                                {getGenreName(genre)}
                                            </div>
                                        );
                                    })}
                                </div>
                                <h2> Overview </h2>
                                <p> {overview} </p>
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
import React, { useState, useRef, useEffect } from 'react';
import { GENRES_LIST } from './GenresList';
import Genre from './Genre';
import '../css/Genres.css';

const genres_list = GENRES_LIST;

const Genres = () => {
    const [selectedGenres, setSelectedGenres] = useState([]);
    
    const handleAddAndRemoveGenre = (genre_id) => {
        var newList = [];
        if (selectedGenres.some((element) => {
            return element == genre_id
        })) {
            newList = selectedGenres.filter((element) => element != genre_id);
        }
        else {
            newList = selectedGenres.concat(genre_id);
        }
        setSelectedGenres(newList);
        
    }

    const testOnClick = () => {
        console.log("test");
    }
    return (
        <div className="genres" onClick={() => testOnClick()}>
            {genres_list.map((genre, index) => {
                return (
                    <Genre
                        genre_id={genre.id}
                        key={index}
                        genre_name={genre.name}
                       
                        >
                        
                    </Genre>
                )
            })}
        </div>
    );

};

export default Genres;
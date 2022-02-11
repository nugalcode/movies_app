import React from 'react';
import '../App.css'

const Favorites = ( { name } ) => {


    return (
        <div className="favorites">
            { name }
        </div>
    );
}

export default Favorites;
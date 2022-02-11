import React, { useRef, useEffect, useState } from 'react';

const Genre = ({ genre_id, genre_name }) => {

    
    const [selected, setSelected] = useState(false);
    const ref = useRef();

    /*useEffect(() => {
        if (selected_) {
            ref.current.style.backgroundColor = "black";
        }
        else {
            ref.current.style.backgroundColor = "";
        }
    });*/

    const handleOnClick = () => {
        setSelected(!selected);
        
    }
    return (
        <div
            className={selected ? "genre selected" : "genre"}
            id={genre_id}
            ref={ref}
            onClick={() =>handleOnClick()}
        >
            <span> {genre_name} </span>
        </div>
    )

}

export default Genre;
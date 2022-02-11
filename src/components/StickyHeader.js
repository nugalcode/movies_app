import React, { useState } from 'react';


const StickyHeader = () => {

    const [searchTerm, setSearchTerm] = useState("");

    const handleOnSubmit = (e) => {
        //prevents page reload
        e.preventDefault();

        
    }

    const handleOnChange = (e) => {
        setSearchTerm(e.target.value);
    }
    return (

        <div className="header">

            <div className="searchBarWrap">
                <form onSubmit={handleOnSubmit}>
                    <input 
                        type="search"
                        className="searchBar"
                        placeholder="Search Movie"
                        value={searchTerm}
                        onChange={handleOnChange}
                    />
                    
                </form>
            </div> 
        </div>
        
        
    );

}

export default StickyHeader;
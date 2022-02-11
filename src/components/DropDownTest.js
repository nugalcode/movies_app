import React, { useState } from 'react';

const DropTest = () => {

    const [drop, setDrop] = useState(false);

    return (
        <div className="dropTest">
            <div className="itemsWrapper">
                <div className="item">
                    ONE 
                </div>
                <div className="item"
                    onMouseEnter={() => setDrop(true)}
                    onMouseLeave={() => setDrop(false)}
                >
                    TWO
                    {drop && <ul className="dropDown">
                        <li> FOUR </li>
                        <li> FIVE </li>
                        <li> SIX </li>
                    </ul>}
                </div>
                <div className="item">
                    THREE
                </div>
            </div>
            
        </div>
    );


}

export default DropTest;
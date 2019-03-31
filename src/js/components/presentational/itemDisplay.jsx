/*
    Imports
*/

import React from "react"; // React
import "./../../../scss/itemDisplay.scss"; // SCSS

/*
    ItemDisplay Component
*/
const ItemDisplay = props => {
    const style = {
        // width: '150px',
        backgroundColor: '#F58B4C'
    }
    let testArr = [];
    for(let i = 0; i < props.count + 1; i++) {
        testArr.push("test");
    }
    return (
        <button 
            className="item-container"
            style={style}
        >
            <h6 className="item-name">{props.name}</h6>
            {testArr.map(i => <div className="block"></div>)}
        </button>
    );
}

export default ItemDisplay;
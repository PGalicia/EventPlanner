/*
    Imports
*/

import React from "react"; // React
import "./../../../scss/reviewCardItem.scss"; // SCSS

/*
    ReviewCardItem Component
*/
const ReviewCardItem = props => {
    return (
        <div className="review-card-items-container">
            {props.chosenItems.filter(item => item.isChosen)
                .map(item => {
                    const obj = props.items.find(i => i.rowid === item.itemId);
                    if(obj) {
                        return (
                            <div 
                                key={item.itemId} 
                                className="item-container"
                            >
                                <h6>{obj.name}</h6>
                            </div>
                        );
                    }
            })}
        </div>
    );
}

export default ReviewCardItem;
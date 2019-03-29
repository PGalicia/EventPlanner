/*
      convertNumToDays

      Description: Takes in a number that corresponds to the day
        of the week, and return the string equivalent
*/

import { DAYS } from "./../constants/dateFormat.js";

export function convertNumToDays(dayNum)  {
    for(let day of DAYS) {
        if(day.id === dayNum) {
            return day.day
        }
    }

    // If the 'dayNum' passed is invalid,
    //      Return Null
    return null;
}
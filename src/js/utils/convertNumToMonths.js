/*
      convertNumToDays

      Description: Takes in a number that corresponds to which month
        of the year, and return the string equivalent
      
*/

import { MONTHS } from "./../constants/dateFormat.js";

export function convertNumToMonths(monthNum)  {
    for(let month of MONTHS) {
        if(month.id === monthNum) {
            return month.month
        }
    }

    // If the 'monthNum' passed is invalid,
    //      Return Null
    return null;
}
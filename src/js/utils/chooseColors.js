/*
      chooseColors

      Description: choose which colors to use in the event
*/

import { COLORS } from "./../constants/color.js";

export function chooseColors(length) {
    // Slice the array of colors to match the 'length' given
    // return sliced array

    return COLORS.slice(0,length);

}

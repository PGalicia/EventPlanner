/*
      sortDate

      Description: Takes in an event array and return it sorted
        based on their event datetime
*/

export function sortDate(arr) {
    return arr.sort((a, b)=> new Date(b.datetime) - new Date(a.datetime));
}
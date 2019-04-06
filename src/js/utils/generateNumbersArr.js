/*
      generateNumbersArr

      Description: generate an array filled with numbers
*/

export function generateNumbersArr(start, end) {

    return Array.from({length: (end - start)}, (v, k) => k + start);

}
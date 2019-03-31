/*
      formatEventTitle

      Description: Takes in a string and make every first
        letter of the first word uppercase and the rest
        lowercase
*/

export function formatEventTitle(title)  {
    // Split the string with the space as the delimenter
    // Iterate through each one
        // Change the first letter uppercase
        // Change the rest to lowercase

    const words = title.split(' ');

    for(let word of words) {
        let firstLetter = word[0].toUpperCase()
        let restOfLetters = word.substring(1).toLowerCase();
        words[words.indexOf(word)] = firstLetter + restOfLetters;
    }

    return words.join(' ');
}
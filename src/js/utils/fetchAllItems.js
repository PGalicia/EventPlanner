/*
      fetchAllItems

      Description: retrieve the items

      Additional Notes:
        - Ensure that the return type is a PROMISE
*/

import { REST_API_BASE_PATH } from "./../constants/restAPIBasePath.js" // Constants
import items from "./../_database/items.js"; // Pseudo Database

export function fetchAllItems() {

    return Promise.resolve(items);

    // return fetch(`${REST_API_BASE_PATH}/items/`)
    //     .then(res => res.json())
    //     .then(items => items)

}
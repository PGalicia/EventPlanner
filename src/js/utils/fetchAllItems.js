/*
      fetchAllItems

      Description: retrieve the items

      Additional Notes:
        - Ensure that the return type is a PROMISE
*/

import { REST_API_BASE_PATH } from "./../constants/restAPIBasePath.js" // Constants

export function fetchAllItems() {

    return fetch(`${REST_API_BASE_PATH}/items/`)
        .then(res => res.json())
        .then(items => items)

}
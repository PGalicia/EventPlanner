/*
      getWholeDateString

      Description: Takes in the datetime and return
        a formatted string date.

      Conditions:
        - 'datetime' is a datetype instead of string
*/

import { convertNumToDays } from "./convertNumToDays";
import { convertNumToMonths } from "./convertNumToMonths";

export function getWholeDateString(datetime) {
    const day = convertNumToDays(datetime.getDay());
    const month = convertNumToMonths(datetime.getMonth()).substring(0, 3);
    const date = datetime.getDate();
    const year = datetime.getFullYear().toString().substring(2);
    const time = datetime.toLocaleTimeString('en-US', { timeZone: 'UTC', hour12: true, hour: '2-digit', minute:'2-digit' })

    return `${day}, ${month} ${date} '${year} @ ${time}`;
}
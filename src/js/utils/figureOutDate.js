import { 
    DAYS,
    MONTHS
} from "./../constants/dateFormat.js";

export function convertNumToDays(id)  {
    for(let day of DAYS) {
        if(day.id === id) {
            return day.day
        }
    }
    return "null";
}

export function convertNumToMonths(id)  {
    for(let month of MONTHS) {
        if(month.id === id) {
            return month.month
        }
    }
    return "null";
}
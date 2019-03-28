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

export function getWholeDateString(datetime) {
    const day = convertNumToDays(datetime.getDay());
    const month = convertNumToMonths(datetime.getMonth()).substring(0, 3);
    const date = datetime.getDate();
    const year = datetime.getFullYear().toString().substring(2);
    const time = datetime.toLocaleTimeString('en-US', { timeZone: 'UTC', hour12: true, hour: '2-digit', minute:'2-digit' })

    return `${day}, ${month} ${date} '${year} @ ${time}`;
}
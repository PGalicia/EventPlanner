import { getWholeDateString } from "./getWholeDateString.js";

/*
    Normal Cases
*/

test("change the ('2014-04-14T15:30:00Z') to formatted String", () => {
    expect(getWholeDateString(new Date("2014-04-14T15:30:00Z"))).toEqual("Monday, Apr 14 '14 @ 3:30 PM");
});
import { convertNumToDays } from "./convertNumToDays.js";

/*
    Edge Cases
*/

test("number passed is 0", () => {
    expect(convertNumToDays(0)).toEqual("Sunday");
});

test("number passed is 6", () => {
    expect(convertNumToDays(6)).toEqual("Saturday");
});

/*
    Invalid Arguments
*/

test("number passed is greater than 6", () => {
    expect(convertNumToDays(7)).toBeNull();
});

test("number passed is less than 0", () => {
    expect(convertNumToDays(-1)).toBeNull();
});

/*
    Other Cases
*/

test("number passed is 3", () => {
    expect(convertNumToDays(3)).toEqual("Wednesday");
});
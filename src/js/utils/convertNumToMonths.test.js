import { convertNumToMonths } from "./convertNumToMonths.js";

/*
    Edge Cases
*/

test("number passed is 0", () => {
    expect(convertNumToMonths(0)).toBe("January");
});

test("number passed is 11", () => {
    expect(convertNumToMonths(11)).toBe("December");
});

/*
    Invalid Arguments
*/

test("number passed is greater than 11", () => {
    expect(convertNumToMonths(15)).toBeNull();
});

test("number passed is less than 0", () => {
    expect(convertNumToMonths(-15)).toBeNull();
});

/*
    Other Cases
*/

test("number passed is less than 5", () => {
    expect(convertNumToMonths(5)).toBe("June");
})
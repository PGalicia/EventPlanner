import { findCurrentEvent } from "./findCurrentEvent";

const testEvents = [
    { datetime: "2020-05-07T09:14:00Z" },
    { datetime: "2019-11-17T18:33:00Z" },
    { datetime: "2018-11-28T20:45:00Z" },
    { datetime: "2014-04-14T15:30:00Z" },
    { datetime: "2009-07-22T17:01:00Z" },
    { datetime: "2004-12-25T00:00:00Z" },
    { datetime: "2002-02-10T15:00:00Z" },
    { datetime: "2000-03-06T13:55:00Z" },
    { datetime: "1998-03-03T00:12:00Z" },
    { datetime: "1995-12-17T03:24:00Z" }
];

/*
    Edge Cases
*/

test("events array passed has the current event on the first index",() => {
    const baseDate = "2020-01-01T00:00:00Z";
    expect(findCurrentEvent(testEvents, baseDate)).toMatchObject({ datetime: "2020-05-07T09:14:00Z" });
});

test("events array passes has the current event on the last index",() => {
    const baseDate = "1995-01-01T00:00:00Z";
    expect(findCurrentEvent(testEvents, baseDate)).toMatchObject({ datetime: "1995-12-17T03:24:00Z" });    
});

/*
    Invalid Arguments
*/

test("events array passed has no current event",() => {
    const baseDate = "2021-01-01T00:00:00Z";
    expect(findCurrentEvent(testEvents, baseDate)).toBeNull();    
});


/*
    Other Cases
*/

test("events array passed has the current event on the 5th index",() => {
    const baseDate = "2004-01-01T00:00:00Z";
    expect(findCurrentEvent(testEvents, baseDate)).toMatchObject({ datetime: "2004-12-25T00:00:00Z" });  
});

test("events array length is 1", () => {
    const baseDate = "2020-01-01T00:00:00Z";
    expect(findCurrentEvent(testEvents.slice(0,1), baseDate)).toMatchObject({ datetime: "2020-05-07T09:14:00Z" });  
});
test("events array length is 1 and there is no current event", () => {
    const baseDate = "2021-01-01T00:00:00Z";
    expect(findCurrentEvent(testEvents.slice(0,1), baseDate)).toBeNull();  
});
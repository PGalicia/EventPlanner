import { findFutureAndPastEvents } from "./findFutureAndPastEvents.js";

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
test("current event is at the beginning of the events array", () => {
    expect(findFutureAndPastEvents({ datetime: "2020-05-07T09:14:00Z" }, testEvents))
        .toMatchObject({
            futureEvents: [],
            pastEvents: [
                { datetime: "2019-11-17T18:33:00Z" },
                { datetime: "2018-11-28T20:45:00Z" },
                { datetime: "2014-04-14T15:30:00Z" },
                { datetime: "2009-07-22T17:01:00Z" },
                { datetime: "2004-12-25T00:00:00Z" },
                { datetime: "2002-02-10T15:00:00Z" },
                { datetime: "2000-03-06T13:55:00Z" },
                { datetime: "1998-03-03T00:12:00Z" },
                { datetime: "1995-12-17T03:24:00Z" }
            ]
        });
});
test("current event is at the end of the events array", () => {
    expect(findFutureAndPastEvents({ datetime: "1995-12-17T03:24:00Z" }, testEvents))
        .toMatchObject({
            futureEvents: [
                { datetime: "2020-05-07T09:14:00Z" },
                { datetime: "2019-11-17T18:33:00Z" },
                { datetime: "2018-11-28T20:45:00Z" },
                { datetime: "2014-04-14T15:30:00Z" },
                { datetime: "2009-07-22T17:01:00Z" },
                { datetime: "2004-12-25T00:00:00Z" },
                { datetime: "2002-02-10T15:00:00Z" },
                { datetime: "2000-03-06T13:55:00Z" },
                { datetime: "1998-03-03T00:12:00Z" },
            ],
            pastEvents: []
        });
});

/*
    Invalid Arguments
*/

test("there is no current event", () => {
    expect(findFutureAndPastEvents(null, testEvents))
        .toMatchObject({
            futureEvents: [],
            pastEvents: [
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
            ]
        });
});

/*
    Other Cases
*/

test("current event is at 5th index of the events array", () => {
    expect(findFutureAndPastEvents({ datetime: "2004-12-25T00:00:00Z" }, testEvents))
    .toMatchObject({
        futureEvents: [
            { datetime: "2020-05-07T09:14:00Z" },
            { datetime: "2019-11-17T18:33:00Z" },
            { datetime: "2018-11-28T20:45:00Z" },
            { datetime: "2014-04-14T15:30:00Z" },
            { datetime: "2009-07-22T17:01:00Z" }
        ],
        pastEvents: [
            { datetime: "2002-02-10T15:00:00Z" },
            { datetime: "2000-03-06T13:55:00Z" },
            { datetime: "1998-03-03T00:12:00Z" },
            { datetime: "1995-12-17T03:24:00Z" }
        ]
    });
});
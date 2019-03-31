import { formatEventTitle } from "./formatEventTitle";

/*
    Normal Cases
*/

test("formatting single word title", () => {
    expect(formatEventTitle("eVEnT")).toEqual("Event");
});
test("formatting multiple words title", () => {
    expect(formatEventTitle("tHIS nEw eVEnt")).toEqual("This New Event");
});
test("formatting single word title with symbols and numbers", () => {
    expect(formatEventTitle("eV3nt")).toEqual("Ev3nt");
});
test("formatting multiple words title with symbols and numbers", () => {
    expect(formatEventTitle("tH1S n3w eV3nt")).toEqual("Th1s N3w Ev3nt");
});

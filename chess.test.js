const { it, describe, expect } = require("@jest/globals");
const { square } = require("./square");

describe("builder", () => {
    it("should generate element with class", () => {
        const element = square();
        expect(element.classList.contains("square")).toBe(true);

        const classList = Array.from(element.classList);
        expect(classList).toEqual(["square"]);
    });
});
import square from "./src/square.js"; // ✅ Ora Jest può gestire gli import

describe("square", () => {
    it("should generate an element with a class", () => {
        const element = square();
        expect(element.classList.contains("square")).toBe(true);
    });
});

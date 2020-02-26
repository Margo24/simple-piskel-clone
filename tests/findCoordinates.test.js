const findCoordinatesValue = require('./findCoordinates');

describe("Test", function() {
    it("should return nearest value", function() {
        const XYCounts = [0, 5, 10, 15, 20];
        const value = 6;
        const result = 5;
        expect(findCoordinatesValue(XYCounts, value)).toBe(result);
    });

    it("should return nearest value", function() {
        const XYCounts = [0, 5, 10, 15, 20];
        const value = 15;
        const result = 15;
        expect(findCoordinatesValue(XYCounts, value)).toBe(result);
    });

    it("should return nearest value", function() {
        const XYCounts = [0, 5, 10, 15, 20];
        const value = 0;
        const result = 5;
        expect(findCoordinatesValue(XYCounts, value)).not.toBe(result);
    });
});

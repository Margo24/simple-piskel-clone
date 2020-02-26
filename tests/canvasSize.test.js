const canvasSizeParameters = require('./canvasSize');

describe('Check screens size void function', () => {
    it('Count screens virtual pixels', () => {
        expect(canvasSizeParameters(32).length).toBe(33);
    });

    it('Count screens virtual pixels', () => {
        expect(canvasSizeParameters(64).length).toBe(65);
    });

    it('Count screens virtual pixels', () => {
        expect(canvasSizeParameters(128).length).toBe(129);
    });
});

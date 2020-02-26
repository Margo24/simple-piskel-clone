function canvasSizeParameters(canvasVirtualSize) {
    let XYCounts = [];
    let canvasVirtualPixel = 512/canvasVirtualSize;
    for (let i = 0; i <= canvasVirtualSize; i++) {
        XYCounts.push(canvasVirtualPixel*i);
    }
    return XYCounts;
}

module.exports = canvasSizeParameters;

export default function canvasSizeParameters(canvasVirtualSize) {
    let XYCounts = [];
    const canvasVirtualPixel = 512/canvasVirtualSize;
    //canvasFillArea = canvasVirtualPixel*penSize; вынести в отдельную функцию
    //find XY counts values
    for (let i = 0; i <= canvasVirtualSize; i++) {
        XYCounts.push(canvasVirtualPixel*i);
    }
    return XYCounts;
}

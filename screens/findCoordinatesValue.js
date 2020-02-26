export default function findCoordinatesValue(XYCounts, value) {
    for (let a = 0; a < XYCounts.length - 1; a++) {
        if (value >= XYCounts[a] && value<XYCounts[a + 1]) {
            return XYCounts[a];
        }
    }
}

var startAndEndTimes = []

module.exports = function getArrayOfStartAndEndTimes(segments) {
  for (let i=0; i < segments.length; i++) {
    startAndEndTimes.push([segments[i].start,segments[i].end])
  }
  return startAndEndTimes
}

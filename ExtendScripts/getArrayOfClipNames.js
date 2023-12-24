let clipNameArray = []

function searchAssets(clipId, assets) {
  for (let i = 0; i < assets.length; i++) {
    if (assets[i]["id"].indexOf(clipId) == 0) {
      return assets[i].name
    }
  }
}

module.exports =  function getClipNames(segments, assets) {
  for (let i=0; i < segments.length; i++) {
    clipNameArray.push(segments[i].assetId)
  }
  for (let j=0; j < clipNameArray.length; j++) {
    var realName = searchAssets(clipNameArray[j], assets)
    clipNameArray[j] = realName
  }
  return clipNameArray
}
var project = app.project;

var activeSequence = project.activeSequence;

var numberOfVideoTracks = activeSequence.videoTracks.numTracks;

var numberOfClips = activeSequence.videoTracks[0].clips.numItems;

var proxyPathArray = [];

for (var i = 0; i < numberOfVideoTracks; i++) {
  var numberOfClips = activeSequence.videoTracks[i].clips.numItems;
  for (var j = 0; j < numberOfClips; j++) {
    var clip = activeSequence.videoTracks[i].clips[j];
    var clipPath = clip.projectItem.getMediaPath();
    if (clipPath.indexOf("Proxy") > -1) {
      proxyPathArray.push(clipPath);
    }
  }
}

var numberOfProxyClips = proxyPathArray.length;
numberOfProxyClips;

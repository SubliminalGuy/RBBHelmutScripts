var clipDuration1 = payload1.media.track[0].Duration;
var clipDuration2 = payload2.media.track[0].Duration;

var bitRate1 = payload1.media.track[1].BitRate;
var bitRate2 = payload2.media.track[1].BitRate;

var encodedDate1 = payload1.media.track[0].Encoded_Date;
var encodedDate2 = payload2.media.track[0].Encoded_Date;

var clipDurationIsEqual = false;

// check that neither is an empty string
if (clipDuration1 !== "" && clipDuration2 !== "") {
  clipDurationIsEqual = clipDuration1 === clipDuration2;
}

var bitRateIsEqual = false;

// check that neither is an empty string
if (bitRate1 !== "" && bitRate2 !== "") {
  bitRateIsEqual = bitRate1 === bitRate2;
}

var encodedDateIsEqual = false;
// check that neither is an empty string
if (encodedDate1 !== "" && encodedDate2 !== "") {
  encodedDateIsEqual = encodedDate1 === encodedDate2;
}

function checkEquality() {
  var isSameFile = false;
  if (clipDurationIsEqual && bitRateIsEqual && encodedDateIsEqual) {
    isSameFile = true;
    return isSameFile;
  } else {
    return isSameFile;
  }
}

checkEquality();

var kabObj = {"Kabine1":"true","Kabine2":"true","Kabine3":"false","Kabine4":"true","Kabine5":"false"}


var kabKeys = Object.keys(kabObj)
var kabList = ""

function createKabList() {
  for (i=0; i < kabKeys.length; i++) {
    if (kabObj[kabKeys[i]] == "true") {
      kabList+=kabKeys[i]
      kabList+=","
    }
  }
  kabList = kabList.slice(0,-1)
  return kabList
}

createKabList()
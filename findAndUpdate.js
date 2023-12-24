// Snippet FindAndUpdate ungewuenschte Characters in Projektnamen

var testWort = "Dilä'k Ücük"
var newWort = testWort
var ersatzArray = [["ä", "ae"], ["Ü", "Ue"], ["ü", "ue"], ["ö", "oe"], [" ", "_"]];

var whiteList = "_-0123456789qwertzuiopasdfghjklyxcvbnmQWERTZUIOPASDFGHJKLYXCVBNM"

module.exports = function change() {
    for (i=0; i < ersatzArray.length; i++) {
      newWort = newWort.split(ersatzArray[i][0]).join(ersatzArray[i][1])
    }

    var testWortArray = newWort.split("")
    
    for (k=0; k < testWortArray.length; k++) {
      if (whiteList.indexOf(testWortArray[k]) == -1) {
        testWortArray[k] = "X"
      }
    }
 
  return testWortArray.join("")
};


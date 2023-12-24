

var tmp = {"Kabine1":"false","Kabine2":"false","Kabine3":"false","Kabine4":"false","Kabine5":"false"}
var Keys = Object.keys(tmp)
var Output1 = "Ihre gewählte Kabine ist belegt. Folgende Kabinen stehen momentan zur Verfügung: "
var Output2 = "Ihre gewählte Kabine ist belegt. Folgende Kabine steht momentan zur Verfügung: "
var Output3 = "Momentan steht keine Kabine zur Verfügungg."

module.exports = function StatusCheckKabinen() {
  var freieKabine;
  var kabinenListe = "";
  var finalOutput = "";
  
    if (tmp.Kabine4=="true") {
      console.log("Frei")
      return true
      }
    else
    {
      for(i=0;i<Keys.length;i++)
        {
          if(tmp[Keys[i]]=="true") {
            freieKabine=i+1;
            kabinenListe+="Kabine"+freieKabine+", "
          }
        }
      
      if (kabinenListe.length < 6) {
        
        finalOutput = Output3;
      }
      else if (kabinenListe.length <= 9) {
        
        finalOutput = Output2 + kabinenListe
      }
      else {
        finalOutput = Output1 + kabinenListe
      }
      
      var outputLength = finalOutput.length
      finalOutput = finalOutput.slice(0, outputLength-2);
      finalOutput += "."
      console.log(finalOutput)
      return finalOutput
    }

}

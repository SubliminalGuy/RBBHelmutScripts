function spurTausch() {
  if (spur != null && spur != "null" && spur != "") {
    switch (spur) {
    case "3_4":
      var result = "[0:3][0:4]amerge=inputs=2[a]";
      break;
    case "5_6":
      var result = "[0:5][0:6]amerge=inputs=2[a]";
      break;
    case "7_8":
      var result = "[0:7][0:8]amerge=inputs=2[a]";
      break;
    case "1_2":
      var result = "[0:1][0:2]amerge=inputs=2[a]";


    }



    return result;
  }
}

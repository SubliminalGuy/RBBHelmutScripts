function changeRendernode() {
  if (userName != null && userName != "null" && userName != "") {
    switch (userName) {
    case "RendernodeProd01":
      var result = "fa671";
      break;
    case "RendernodeProd02":
      var result = "fa672";
      break;
    case "RendernodeProd03":
      var result = "fa673";
      break;
    case "RendernodeProd04":
      var result = "fa674";
      break;
    case "RendernodeProd05":
      var result = "fa675";
      break;
    case "fa661":
      var result = "fa661.AD";
      break;
    default:
      var result = userName;
    }



    return result;
  }
}

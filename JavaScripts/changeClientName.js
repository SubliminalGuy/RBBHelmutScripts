function changeClient() {
  if (hostname != null && hostname != "null" && hostname != "") {
    switch (hostname) {
      case "M9024S1":
        var result = "Suvi FFI";
        break;
      case "N0373S1":
        var result = "Suvi Rechner Buero links";
        break;
      case "P0129S1":
        var result = "Suvi Test Rechner";
        break;
      case "N0581S1":
        var result = "Fensterbankrechner SuVi Buero";
        break;
      case "N0254S1":
        var result = "Suvi Rechner Buero rechts";
        break;
      default:
        var result = "Unbekannter Rechner" + hostname;
    }

    var clientName = result;

    return clientName;
  }
}

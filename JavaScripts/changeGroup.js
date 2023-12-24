function changeGroup() {
  if (kategorie != null && kategorie != "null" && kategorie != "") {
    switch (kategorie) {
      case "Sport":
        var result = "Sport";
        break;
      case "CNC":
        var result = "Information";
        break;
      case "Fritz":
        var result = "Gesellschaft";
        break;
      case "Studio 3":
        var result = "Gesellschaft";
        break;
      default:
        var result = "Information";
    }

    var group = result;

    return group;
  }
}

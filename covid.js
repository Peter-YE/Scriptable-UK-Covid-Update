// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-gray; icon-glyph: user-md;
// Used in Scriptable
// After applying the widget: Edit Widget - When Interacting - Open URL - URL - Type: https://coronavirus.data.gov.uk
function createWidget(data) {
  let newCases = data[0].newCasesByPublishDate;
  let newCasesOld = data[1].newCasesByPublishDate;
  let cumCases = data[0].cumCasesByPublishDate;
  let diff = newCases - newCasesOld;
  let statsDate = data[0].date;

  let widget = new ListWidget();

  let title = widget.addText("UK COVID Update");
  title.font = Font.boldSystemFont(12);
  title.minimumScaleFactor = 0.5;
  title.lineLimit = 2;

  let subTitle = widget.addText(statsDate);
  subTitle.font = Font.regularSystemFont(12);
  subTitle.textColor = Color.gray();
  //
  widget.addSpacer();

  let cumCasesString = cumCases.toLocaleString("en-GB");
  let cumInfections = widget.addText("Total: " + cumCasesString);
  cumInfections.font = Font.regularSystemFont(12);
  cumInfections.textColor = Color.gray();

  //
  widget.addSpacer();

  let newCasesString = newCases.toLocaleString("en-GB");
  if (diff > 0) {
    newCasesString += " ⬆︎";
  } else if (diff < 0) {
    newCasesString += " ⬇︎";
  } else {
    newCasesString += " ⬌";
  }
  let infections = widget.addText("+" + newCasesString);
  infections.font = Font.boldSystemFont(24);
  if (diff > 0) {
    infections.textColor = Color.red();
  } else if (diff < 0) {
    infections.textColor = Color.green();
  } else {
    infections.textColor = Color.orange();
  }

  //
  widget.addSpacer();

  let footer = widget.addText(
    "Yesterday: +" +
    data[1].newCasesByPublishDate.toLocaleString("en-GB")
  );
  footer.font = Font.regularSystemFont(12);
  footer.minimumScaleFactor = 0.5;
  footer.lineLimit = 1;
  footer.textColor = Color.gray();

  return widget;
}

//
function copyIfNotNull(to, from, prop) {
  let fromProp = from[prop];
  if (fromProp != null) {
    to[prop] = fromProp;
  }
}

function getParameterByName(name, url = window.location.href) {
  name = name.replace(/[\[\]]/g, "\\$&");
  console.log(url);
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return "";
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}


async function getData() {
  let areaType = "overview";
  let req = new Request(
    `https://api.coronavirus.data.gov.uk/v2/data?areaType=${areaType}` +
    "&metric=newCasesByPublishDate" +
    "&metric=cumCasesByPublishDate" +
    "&format=json"
  );
  let response = await req.loadJSON();
  return response.body;
}
// Demo
if (config.runsInApp) {
  let data = await getData();
  let widget = createWidget(data);
  widget.presentSmall();
} else {
  let data = await getData();
  let widget = createWidget(data);
  Script.setWidget(widget);
}

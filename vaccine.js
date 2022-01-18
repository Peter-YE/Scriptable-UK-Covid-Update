// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-gray; icon-glyph: user-md;
// Used in Scriptable
// After applying the widget: Edit Widget - When Interacting - Open URL - URL - Type: https://coronavirus.data.gov.uk
function createWidget(data, data2) {
    let dose1Change = data[0].newPeopleVaccinatedFirstDoseByPublishDate;
    let dose1Total = data[0].cumPeopleVaccinatedFirstDoseByPublishDate;
    let dose2Change = data[0].newPeopleVaccinatedSecondDoseByPublishDate;
    let dose2Total = data[0].cumPeopleVaccinatedSecondDoseByPublishDate;
    let dose3Change = data2[0].newPeopleVaccinatedThirdInjectionByPublishDate;
    let dose3Total = data2[0].cumPeopleVaccinatedThirdInjectionByPublishDate;
    let statsDate = data[0].date;
  
    let widget = new ListWidget();
  
    let title = widget.addText("UK Vaccination");
    title.font = Font.boldSystemFont(12);
    title.minimumScaleFactor = 0.6;
    title.lineLimit = 2;
  
    let subTitle = widget.addText(statsDate);
    subTitle.font = Font.regularSystemFont(12);
    subTitle.textColor = Color.gray();
  
    //dose 1
  
    let dose1 = widget.addText("Dose 1: " + dose1Total.toLocaleString("en-GB"));
    dose1.font = Font.regularSystemFont(12);
    dose1.textColor = Color.gray();
  
    let dose1Delta = "";
    dose1Delta = dose1Change.toLocaleString("en-GB");
  
    let dose1DeltaText = widget.addText("+" + dose1Delta);
    dose1DeltaText.font = Font.boldSystemFont(15);
    dose1DeltaText.textColor = new Color("#7DBBAE");;
  
    //dose 2
  
    let dose2 = widget.addText("Dose 2: " + dose2Total.toLocaleString("en-GB"));
    dose2.font = Font.regularSystemFont(12);
    dose2.textColor = Color.gray();
  
    let dose2Delta = "";
    dose2Delta = dose2Change.toLocaleString("en-GB");
  
    let dose2DeltaText = widget.addText("+" + dose2Delta);
    dose2DeltaText.font = Font.boldSystemFont(15);
  
    dose2DeltaText.textColor = new Color("#7DBBAE");
  
    //dose 3
  
    let dose3 = widget.addText("Booster: " + dose3Total.toLocaleString("en-GB"));
    dose3.font = Font.regularSystemFont(12);
    dose3.textColor = Color.gray();
  
    let dose3Delta = "";
    dose3Delta = dose3Change.toLocaleString("en-GB");
  
    let dose3DeltaText = widget.addText("+" + dose3Delta);
    dose3DeltaText.font = Font.boldSystemFont(15);
  
    dose3DeltaText.textColor = new Color("#356EA7");
  
  
  
    return widget;
  }
  
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
  
  
  async function getData(config) {
    let areaType = "overview";
    let req = new Request(
      `https://api.coronavirus.data.gov.uk/v2/data?areaType=${areaType}` +
      "&metric=cumPeopleVaccinatedFirstDoseByPublishDate" +
      "&metric=newPeopleVaccinatedFirstDoseByPublishDate" +
      "&metric=cumPeopleVaccinatedSecondDoseByPublishDate" +
      "&metric=newPeopleVaccinatedSecondDoseByPublishDate" +
      "&format=json"
    );
    let response = await req.loadJSON();
    return response.body;
  }
  
  async function getData2(config) {
      let areaType = "overview";
      let req = new Request(
        `https://api.coronavirus.data.gov.uk/v2/data?areaType=${areaType}` +
        "&metric=cumPeopleVaccinatedThirdInjectionByPublishDate" +
        "&metric=newPeopleVaccinatedThirdInjectionByPublishDate" +
        "&format=json"
      );
      let response = await req.loadJSON();
      return response.body;
    }
  
  if (config.runsInApp) {
    // Demo
    let data = await getData();
    let data2 = await getData2();
    let widget = createWidget(data, data2);
    widget.presentSmall();
  } else {
    let data = await getData();
    let data2 = await getData2();
    let widget = createWidget(data, data2);
    Script.setWidget(widget);
  }
  
  
  

var allItems = {};

//SignalR Configuration
const connection = new signalR.HubConnectionBuilder()
    .withUrl("http://192.168.1.122:9999/demoHub")
    .withAutomaticReconnect()
    .configureLogging(signalR.LogLevel.Information)
    .build();

async function startHubConn(){
  try{
    await connection.start();
  }
  catch (err) {
    console.log(err);
    setTimeout(startHubConn, 5000);
  }
}

connection.onclose(async () => {
  await startHubConn();
});

connection.on("GetItemAll", (value) => {
  const resp = JSON.parse(value);
  for(var i = 0; i<resp.length; i++){
    allItems[resp[i].Name]=resp[i];
    // var idx = allItems.indexOf(resp[i]);
    // console.log(idx +": "+allItems[idx]);
    console.log(allItems[resp[i].Name]);
    itemChange(resp[i].Name, resp[i].Value);
  }

  connection.on("ReceiveValues", (value) => {
    const resp = JSON.parse(value);
    for(var i = 0; i<resp.length; i++){
      allItems[resp[i].Name]=resp[i];
      itemChange(resp[i].Name, resp[i].Value);
    }
  });
});

function startScada() {
  startHubConn();
}

//assigning the values from signalr
function itemChange(itemName, itemValue){
  const svg = document.getElementById("svg_obj").contentDocument;
  const layer1 = svg.getElementById("layer1");
  for (var i = 0; i < layer1.children.length; i++) {
    var aa = layer1.children;
    if(aa[i].hasAttribute("PlcTagName")){
      if (aa[i].getAttribute("PlcTagName") === itemName) {
        if (aa[i].getAttribute("tip") === "motor") {
            checkMotor(itemValue, aa[i]);
            changeMotorTag(aa[i],itemValue);
        }
        if (aa[i].getAttribute("tip") === "kapak") {
            checkKlepe(itemValue, aa[i]);
            changeKlepeTag(aa[i],itemValue);
        }
        if (aa[i].getAttribute("tip") === "elevator") {
            checkElevator(itemValue, aa[i]);
        }
      }
    }
    else if(aa[i].getAttribute("tip")==="line"){
      var condition = aa[i].getAttribute("condition");
      if(condition.indexOf(itemName) > -1)
      checkLine(aa[i], condition);
    }
  }
}

//binding values
function Bit(_val, index) {
  try {
    var bVal = Number(_val).toString(2);
    var c = [];
    var d = 0;
    for (var i = bVal.length - 1; i >= 0; i--) {
      c[d] = bVal[i];
      d = d + 1;
    }
    return (c[index] === '1');
  } catch (e) {
    return false;
  }
}

function ReadItemFromList(itemList, itemName) {
  if (itemList.hasOwnProperty(itemName)) {
    // console.log("here is "+itemList[itemName].Value);
    return itemList[itemName].Value;
  }
}

var results = [];
var string = "";

function get(string, sub1, sub2) {
  this.results = [];
  this.string = string;
  this.getAllResults(sub1, sub2);
  return this.results;
}

function getAllResults(sub1, sub2) {
  if (this.string.indexOf(sub1) < 0 || this.string.indexOf(sub2) < 0) return;
  var result = this.getFromBetween(sub1, sub2);
  this.results.push(result);
  this.removeFromBetween(sub1, sub2);
  if (this.string.indexOf(sub1) > -1 && this.string.indexOf(sub2) > -1) {
    this.getAllResults(sub1, sub2);
  }
  else return;
}

function getFromBetween(sub1, sub2) {
  if (this.string.indexOf(sub1) < 0 || this.string.indexOf(sub2) < 0) return false;
  var SP = this.string.indexOf(sub1) + sub1.length;
  var string1 = this.string.substr(0, SP);
  var string2 = this.string.substr(SP);
  var TP = string1.length + string2.indexOf(sub2);
  return this.string.substring(SP, TP);
}

function removeFromBetween(sub1, sub2) {
  if (this.string.indexOf(sub1) < 0 || this.string.indexOf(sub2) < 0) return false;
  var removal = sub1 + this.getFromBetween(sub1, sub2) + sub2;
  this.string = this.string.replace(removal, "");
}

//showing modals(popups)
var showPopUp = function () {
  popUpFlag = false;



  var popupHTML = "";
  var popupTabs = "";

  if (popUpType == "M") {
    popupHTML = getMotorPopUpHTML();
    popupTabs = getMotorPopUpAlarmInputOutputHTML();
  }
  else if (popUpType == "K") {
    popupHTML = getKlepePopUpHTML();
    popupTabs = getKlepePopUpAlarmInputOutputHTML();
  }
  else if (popUpType == "K3yon") {
    popupHTML = getKlepe3YonPopUpHTML();
    popupTabs = getKlepe3YonPopUpAlarmInputOutputHTML();
  }
  else if (popUpType == "K2yon") {
    popupHTML = getKlepe2YonPopUpHTML();
    popupTabs = getKlepe2YonPopUpAlarmInputOutputHTML();
  }


  modal = document.getElementById("myModal");
  mainDiv = document.getElementById("mainDiv");


  modal.style.display = "block";

  popupKonumHesapla(modal, MouseX, MouseY);

  document.getElementById('MotorPopupHeader').innerHTML = popUpRootTag.substring(6);
  document.getElementById('popupBody').innerHTML = popupHTML;
  document.getElementById('tdPopupTab').innerHTML = popupTabs;

  var butonList = document.getElementsByClassName("mostPopupButton");
  var popUpHeaderColor;
  if (popUpType == "M") {
    popUpHeaderColor = checkMotorPopupButton(butonList, ReadItem(popUpRootTag));
    checkMotorPopupAlarms(ReadItem(popUpRootTag.replace(".IO", ".ARZ")));
  }
  else if (popUpType == "K") {
    popUpHeaderColor = checkKlepePopupButton(butonList, ReadItem(popUpRootTag));
  }
  else if (popUpType == "K2yon") {
    popUpHeaderColor = checkKlepe2YonPopupButton(butonList, ReadItem(popUpRootTag));
  }
  else if (popUpType == "K3yon") {
    popUpHeaderColor = checkKlepe3YonPopupButton(butonList, ReadItem(popUpRootTag));
  }

  document.getElementById('modalHeader').style.backgroundColor = document.getElementById('MotorPopupHeader').style.backgroundColor = popUpHeaderColor;

  // When the user clicks anywhere outside of the modal, close it
  //mainDiv.onclick = function (event) {
  //    if (event.target == modal) {
  //        modal.style.display = "none";
  //        //document.getElementById('divPopUp').style.display = 'none';
  //    }
  //}


};
function btnAlarmClick() {
  //popUpFlag = false;
  var parametre = document.getElementById("tdParametre");
  var btnAlarm = document.getElementById("btnAlarm");
  if (parametre.style.display == "inherit") {
    document.getElementById("tdParametre").style.display = "none";
    btnAlarm.innerHTML = ">";
  }
  else {
    document.getElementById("tdParametre").style.display = "inherit";
    btnAlarm.innerHTML = "<";
  }


}

//changing components
function checkMotor(myVal, motor) {
  if (Bit(myVal, 13)) {
    return changeMotorColor("red",motor);
  }
  else if (Bit(myVal, 1)) {
    return changeMotorColor("limegreen",motor);
  }
  else if (Bit(myVal, 11)) {
    return changeMotorColor("orange",motor);
  }
  else
    return changeMotorColor("gray",motor);
}

function changeMotorColor(color, motor) {
  motor.addEventListener("click", event => {
    $('#myModal').modal('show');
    document.getElementById('modalheadertext').innerText = event.path[1].attributes[0].textContent;
    document.getElementById('modalbodytext').innerText = event.path[1].attributes[2].textContent;
  });
  for (var k = 0; k < motor.children.length; k++) {
    if (motor.children[k].hasAttribute("willChange")) {
      motor.children[k].setAttribute("style", `fill:${color};stroke:black;stroke-width:2`);
    }
    // if (motor.children[k].getAttribute("inkscape:label").startsWith("text1")) {
    //   motor.children[k].setAttribute("style", "font-size:70");
    //   var a = motor.children[k];
    //   console.log("burasi "+motor.children[k].getRootNode());
    //   motor.children[k].textContent = `${color}`;
    // }
  }
}

function changeMotorTag(tag, value) {
  if (Bit(value, 13)) {
    if (tag.children[tag.children.length-2].hasAttribute("willChange")) {
      tag.children[tag.children.length-2].setAttribute("style", "fill:red;stroke:black;stroke-width:14");
    }
  }
  else if (Bit(value, 11)) {
    if (tag.children[tag.children.length-2].hasAttribute("willChange")) {
      tag.children[tag.children.length-2].setAttribute("style", "fill:cornflowerblue;stroke:black;stroke-width:14");
    }
  }
  else if (Bit(value, 8)) {
    if (tag.children[tag.children.length-2].hasAttribute("willChange")) {
      tag.children[tag.children.length-2].setAttribute("style", "fill:yellow;stroke:black;stroke-width:14");
    }
  }
  else
  if (tag.children[tag.children.length-2].hasAttribute("willChange")) {
    tag.children[tag.children.length-2].setAttribute("style", "fill:grey;stroke:black;stroke-width:14");
  }
}

function checkElevator(myVal, elevator) {
  if (Bit(myVal, 1)) {
    return changeElevatorColor("limegreen", elevator);
  }
  else
    return changeElevatorColor("gray", elevator);
}

function changeElevatorColor(color, elevator) {
  for (var k = 0; k < elevator.children.length; k++) {
    var bb = elevator.children[k];
    if (bb.hasAttribute("willChange")) {
      bb.children[k].setAttribute("style", `fill:${color}`);
    }
    for (var j = 0; j < bb.children.length; j++) {
      var cc = bb.children[j];
      if (cc.hasAttribute("willChange")) {
        cc.setAttribute("style", `fill:${color}`);
      }
    }
  }
}

function checkKlepe(myVal, klepe) {
  if (Bit(myVal, 0)) {
    return changeKlepeColor("limegreen", klepe);
  }
  else {
    return changeKlepeColor("gray", klepe);
  }
}

function changeKlepeColor(color, klepe) {
  klepe.addEventListener("click", event => {
    $('#myModal').modal('show');
    document.getElementById('modalheadertext').innerText = event.path[1].attributes[0].textContent;
    document.getElementById('modalbodytext').innerText = event.path[1].attributes[2].textContent;
  });
  for (var k = 0; k < klepe.children.length; k++) {
    // if (aa.children[k].hasAttribute("anime")) {
    if (klepe.children[k].hasAttribute("willChange")) {
      klepe.children[k].setAttribute("style", `fill:${color}`);
    }
  }
}

function changeKlepeTag(tag, value) {
  if (Bit(value, 8) || Bit(value, 9) || Bit(value, 10) || Bit(value, 11)) {
    if (tag.children[tag.children.length-2].hasAttribute("willChange")) {
      tag.children[tag.children.length-2].setAttribute("style", "fill:red;stroke:black;stroke-width:3");
    }
  }
  else if (Bit(value, 5)) {
    if (tag.children[tag.children.length-2].hasAttribute("willChange")) {
      tag.children[tag.children.length-2].setAttribute("style", "fill:yellow;stroke:black;stroke-width:3");
    }
  }
  else
  if (tag.children[tag.children.length-2].hasAttribute("willChange")) {
    tag.children[tag.children.length-2].setAttribute("style", "fill:grey;stroke:black;stroke-width:3");
  }
}

function checkLine(line, condition) {
  var stat = false;
  var result = get(condition, "{", "}");
  var myDict = new Object();
  for (var i = 0; i < result.length; i++) {
    var tags = result[i].split(':');
    var tagObj = {
      bit: tags[0],
      value: Bit(ReadItemFromList(allItems, tags[0]), tags[1])
      // value: Bit(ReadItemFromList(line, tags[0]), tags[1])
    };
    myDict[result[i]] = tagObj;
  }

  for (var key in myDict) {
    var oldStr = "{" + key.toString() + "}";
    var newStr = myDict[key].value.toString();
    condition = condition.replace(oldStr, newStr);
  }

  stat = eval(condition);
  if (stat) {
    changeLineColor(line, "limegreen");
  }
  else {
    changeLineColor(line, "gray");
  }
}

function changeLineColor(line, color) {
    for (var k = 0; k < line.children.length; k++) {
      var bb = line.children[k];
      if (bb.hasAttribute("willChange")) {
        bb.setAttribute("style", `fill:${color}`);
      }
    }
}

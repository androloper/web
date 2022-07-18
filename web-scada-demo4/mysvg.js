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
  // InitEventHandlers();
}

//assigning the values from signalr
function itemChange(itemName, itemValue){
  const svg = document.getElementById("svg_obj").contentDocument;
  const layer1 = svg.getElementById("layer1");
  for (var i = 0; i < layer1.children.length; i++) {
    var aa = layer1.children;
    if(aa[i].hasAttribute("PlcTagName")){
      if (aa[i].getAttribute("PlcTagName") === itemName) {
        var popUpRootTag = aa[i].getAttribute("PlcTagName");
        if (aa[i].getAttribute("tip") === "motor") {
            checkMotor(itemValue, aa[i]);
            changeMotorTag(aa[i],itemValue);
            // aa[i].addEventListener('click', Motor_Click, false);
            aa[i].addEventListener("click", event => {
              Motor_Click(popUpRootTag);
              $('#popUpModal').modal('show');
          });
        }
        if (aa[i].getAttribute("tip") === "kapak") {
            checkKlepe(itemValue, aa[i]);
            changeKlepeTag(aa[i],itemValue);
            // aa[i].addEventListener('click', Klepe_Click, false);
            aa[i].addEventListener("click", event => {
              Klepe_Click(popUpRootTag);
              $('#popUpModal').modal('show');
            });
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
    if (popUpRootTag === itemName) {
      var butonList = document.getElementsByClassName("mostPopupButton");
      var popUpHeaderColor;
      if (popUpType === "M") {
        popUpHeaderColor = checkMotorPopupButton(butonList, itemValue);
      }
      else if (popUpType === "K") {
        popUpHeaderColor = checkKlepePopupButton(butonList, itemValue);
      }
      else if (popUpType === "K3yon") {
        popUpHeaderColor = checkKlepe3YonPopupButton(butonList, itemValue);
      }
      else if (popUpType === "K2yon") {
        popUpHeaderColor = checkKlepe2YonPopupButton(butonList, itemValue);
      }

      document.getElementById('modalHeader').style.backgroundColor = document.getElementById('MotorPopupHeader').style.backgroundColor = popUpHeaderColor;
    }
    if (typeof popUpRootTag !== 'undefined') {
      if (popUpRootTag.replace(".IO", ".ARZ") === itemName) {
        if (popUpType === "M") {
          checkMotorPopupAlarms(itemValue);
        }
      }
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
function btnAlarmClick() {
  //popUpFlag = false;
  var parametre = document.getElementById("tdParametre");
  var btnAlarm = document.getElementById("btnAlarm");
  if (parametre.style.display === "inherit") {
    document.getElementById("tdParametre").style.display = "none";
    // btnAlarm.setAttribute("style", "height:200px");
    btnAlarm.innerHTML = ">";
  }
  else {
    document.getElementById("tdParametre").style.display = "inherit";
    // btnAlarm.setAttribute("style", "height:200px");
    btnAlarm.innerHTML = "<";
  }


}

// function InitEventHandlers() {
//   const svg = document.getElementById("svg_obj").contentDocument;
//   const layer1 = svg.getElementById("layer1");
//   for (var i = 0; i < layer1.children.length; i++) {
//     var elements = layer1.children;
//     elements[i].addEventListener('click', Motor_Click, false);
//   }
//
//   var elements = document.getElementsByClassName("klepe");
//   for (var i = 0; i < elements.length; i++) {
//     elements[i].addEventListener('click', Klepe_Click, false);
//   }
//
//   var elements = document.getElementsByClassName("klepe3yon");
//   for (var i = 0; i < elements.length; i++) {
//     elements[i].addEventListener('click', Klepe3Yon_Click, false);
//   }
//
//   var elements = document.getElementsByClassName("klepe2yon");
//   for (var i = 0; i < elements.length; i++) {
//     elements[i].addEventListener('click', Klepe2Yon_Click, false);
//   }
// }

window.onclick = function (event) {
  
  ClosePopUp();
}

function ClosePopUp() {
  modal = document.getElementById("popUpModal");
  if (popUpFlag) {
    popUpFlag = false;
    modal.setAttribute("style","display: none");
    popUpRootTag = "";
    popUpType = "";
  }
  else
    popUpFlag = true;
}

function ReadItem(itemName) {
  if (allItems.hasOwnProperty(itemName)) {
    return allItems[itemName].Value;
  }
}

function Motor_Click(plcTag) {
  popUpType = "M";
  popUpRootTag = plcTag;
  ShowPopUp();
}

function Klepe_Click(plcTag) {
  popUpType = "K";//popup tipini vererek popup açılma ve butonların çalışması buna göre olacak
  popUpRootTag = plcTag;
  ShowPopUp();
}

function Klepe3Yon_Click(plcTag) {
  popUpType = "K3yon";//popup tipini vererek popup açılma ve butonların çalışması buna göre olacak
  popUpRootTag = plcTag;
  ShowPopUp();
}

function Klepe2Yon_Click(plcTag) {
  popUpType = "K2yon";//popup tipini vererek popup açılma ve butonların çalışması buna göre olacak
  popUpRootTag = plcTag;
  ShowPopUp();
}

// var MouseX;
// var MouseY;
var popUpType;
var popUpFlag = false;

// $("body").mousemove(function (e) {
//   MouseX = e.pageX;
//   MouseY = e.pageY;
// });

var ShowPopUp = function () {
  popUpFlag = false;
  var popupHTML = "";
  var popupTabs = "";

  if (popUpType === "M") {
    popupHTML = getMotorPopUpHTML();
    popupTabs = getMotorPopUpAlarmInputOutputHTML();
  }
  else if (popUpType === "K") {
    popupHTML = getKlepePopUpHTML();
    popupTabs = getKlepePopUpAlarmInputOutputHTML();
  }
  else if (popUpType === "K3yon") {
    popupHTML = getKlepe3YonPopUpHTML();
    popupTabs = getKlepe3YonPopUpAlarmInputOutputHTML();
  }
  else if (popUpType === "K2yon") {
    popupHTML = getKlepe2YonPopUpHTML();
    popupTabs = getKlepe2YonPopUpAlarmInputOutputHTML();
  }


  modal = document.getElementById("popUpModal");

  modal.setAttribute("style","display:block;");

  // popupKonumHesapla(modal, MouseX, MouseY);

  document.getElementById('MotorPopupHeader').innerHTML = popUpRootTag;
  document.getElementById('popupBody').innerHTML = popupHTML;
  document.getElementById('tdPopupTab').innerHTML = popupTabs;

  var butonList = document.getElementsByClassName("mostPopupButton");
  var popUpHeaderColor;
  if (popUpType === "M") {
    popUpHeaderColor = checkMotorPopupButton(butonList, ReadItem(popUpRootTag));
    checkMotorPopupAlarms(ReadItem(popUpRootTag.replace(".IO", ".ARZ")));
  }
  else if (popUpType === "K") {
    popUpHeaderColor = checkKlepePopupButton(butonList, ReadItem(popUpRootTag));
  }
  else if (popUpType === "K2yon") {
    popUpHeaderColor = checkKlepe2YonPopupButton(butonList, ReadItem(popUpRootTag));
  }
  else if (popUpType === "K3yon") {
    popUpHeaderColor = checkKlepe3YonPopupButton(butonList, ReadItem(popUpRootTag));
  }

  document.getElementById('modalHeader').style.backgroundColor = document.getElementById('MotorPopupHeader').style.backgroundColor = popUpHeaderColor;

};

function MotorButton_Click(myButton) {
  popUpFlag = false;//butonlara basınca flag falsse olmalı. yoksa popup kapanır.
  MotorButton_OnClick(myButton, chat, allItems, popUpRootTag);
}

function KlepeButton_Click(myButton) {
  popUpFlag = false;//butonlara basınca flag falsse olmalı. yoksa popup kapanır.
  KlepeButton_OnClick(myButton, chat, allItems, popUpRootTag);
}

function Klepe3YonButton_Click(myButton) {
  popUpFlag = false;//butonlara basınca flag falsse olmalı. yoksa popup kapanır.
  Klepe3YonButton_OnClick(myButton, chat, allItems, popUpRootTag);
}

function Klepe2YonButton_Click(myButton) {
  popUpFlag = false;//butonlara basınca flag falsse olmalı. yoksa popup kapanır.
  Klepe2YonButton_OnClick(myButton, chat, allItems, popUpRootTag);
}

function checkMotorPopupButton(buttonList, myVal) {
  var headerColor = "gray";

  for (var i = 0; i < buttonList.length; i++) {
    // buttonList[i].setAttribute("style", "width:150px;");
    if (buttonList[i].id === "btnMan") {
      if (Bit(myVal, 8)) {
        buttonList[i].setAttribute("style","background: lime; width:150px");
      }
      else
        buttonList[i].setAttribute("style","background: #EFEFEF; width:150px");
    }
    else if (buttonList[i].id === "btnStart") {
      if (Bit(myVal, 9)) {
        buttonList[i].setAttribute("style","background: lime; width:150px");
      }
      else {
        buttonList[i].setAttribute("style","background: #EFEFEF; width:150px");
      }
    }
    else if (buttonList[i].id === "btnStop") {
      if (Bit(myVal, 9)) {
        buttonList[i].setAttribute("style","background: #EFEFEF; width:150px");
      }
      else {
        buttonList[i].setAttribute("style","background: lime; width:150px");
      }
    }
    else if (buttonList[i].id === "btnBakim") {
      if (Bit(myVal, 11)) {
        buttonList[i].setAttribute("style","background: lime; width:150px");
      }
      else
        buttonList[i].setAttribute("style","background: #EFEFEF; width:150px");
    }
  }

  if (Bit(myVal, 13)) {
    headerColor = "red";
  } else if (Bit(myVal, 11)) {
    headerColor = "orange";
  } else if (Bit(myVal, 9)) {
    headerColor = "greenyellow";
  } else if (Bit(myVal, 8)) {
    headerColor = "yellow";
  }


  if (Bit(myVal, 0)) {
    document.getElementById("pnlTermik").setAttribute("style","background: lime");
  }
  else
    document.getElementById("pnlTermik").setAttribute("style","background: gray");


  if (Bit(myVal, 1)) {
    document.getElementById("pnlCalisti").setAttribute("style","background: lime");
  }
  else
    document.getElementById("pnlCalisti").setAttribute("style","background: gray");

  if (Bit(myVal, 2)) {
    document.getElementById("pnlTasmaSw").setAttribute("style","background: lime");
  }
  else
    document.getElementById("pnlTasmaSw").setAttribute("style","background: gray");

  if (Bit(myVal, 3)) {
    document.getElementById("pnlDevirBekcisi").setAttribute("style","background: lime");
  }
  else
    document.getElementById("pnlDevirBekcisi").setAttribute("style","background: gray");

  if (Bit(myVal, 4)) {
    document.getElementById("pnlBakimSalteri").setAttribute("style","background: lime");
  }
  else
    document.getElementById("pnlBakimSalteri").setAttribute("style","background: gray");

  if (Bit(myVal, 5)) {
    document.getElementById("pnlBantKaydi").setAttribute("style","background: lime");
  }
  else
    document.getElementById("pnlBantKaydi").setAttribute("style","background: gray");


  if (Bit(myVal, 6)) {
    document.getElementById("pnlEmniyetSw").setAttribute("style","background: lime");
  }
  else
    document.getElementById("pnlEmniyetSw").setAttribute("style","background: gray");


  if (Bit(myVal, 7)) {
    document.getElementById("pnlMotorStart1").setAttribute("style","background: lime");
  }
  else
    document.getElementById("pnlMotorStart1").setAttribute("style","background: gray");


  return headerColor;
}

function checkMotorPopupAlarms(myVal) {

  if (Bit(myVal, 0)) {
    document.getElementById("pnlArzTermik").setAttribute("style","background: red");
  }
  else
    document.getElementById("pnlArzTermik").setAttribute("style","background: gray");


  if (Bit(myVal, 1)) {
    document.getElementById("pnlArzKontaktor").setAttribute("style","background: red");
  }
  else
    document.getElementById("pnlArzKontaktor").setAttribute("style","background: gray");

  if (Bit(myVal, 2)) {
    document.getElementById("pnlArzTasma").setAttribute("style","background: red");
  }
  else
    document.getElementById("pnlArzTasma").setAttribute("style","background: gray");

  if (Bit(myVal, 3)) {
    document.getElementById("pnlArzDevirBekcisi").setAttribute("style","background: red");
  }
  else
    document.getElementById("pnlArzDevirBekcisi").setAttribute("style","background: gray");

  if (Bit(myVal, 4)) {
    document.getElementById("pnlArzBakimSalteri").setAttribute("style","background: red");
  }
  else
    document.getElementById("pnlArzBakimSalteri").setAttribute("style","background: gray");

  if (Bit(myVal, 5)) {
    document.getElementById("pnlArzBantKaydi").setAttribute("style","background: red");
  }
  else
    document.getElementById("pnlArzBantKaydi").setAttribute("style","background: gray");


  if (Bit(myVal, 6)) {
    document.getElementById("pnlArzEmniyet").setAttribute("style","background: red");
  }
  else
    document.getElementById("pnlArzEmniyet").setAttribute("style","background: gray");


  if (Bit(myVal, 7)) {
    document.getElementById("pnlArzAkim").setAttribute("style","background: red");
  }
  else
    document.getElementById("pnlArzAkim").setAttribute("style","background: gray");

  if (Bit(myVal, 8)) {
    document.getElementById("pnlArzDevir").setAttribute("style","background: red");
  }
  else
    document.getElementById("pnlArzDevir").setAttribute("style","background: gray");


  if (Bit(myVal, 9)) {
    document.getElementById("pnlArzBakimZamani").setAttribute("style","background: red");
  }
  else
    document.getElementById("pnlArzBakimZamani").setAttribute("style","background: gray");

}

function checkKlepePopupButton(buttonList, myVal) {
  var headerColor = "gray";

  for (var i = 0; i < buttonList.length; i++) {
    if (buttonList[i].id === "btnMan") {
      if (Bit(myVal, 5)) {
        buttonList[i].setAttribute("style","background: lime; width:150px");
      }
      else
        buttonList[i].setAttribute("style","background: #EFEFEF; width:150px");
    }
    else if (buttonList[i].id === "btnStart") {
      if (Bit(myVal, 6)) {
        buttonList[i].setAttribute("style","background: lime; width:150px");
      }
      else {
        buttonList[i].setAttribute("style","background: #EFEFEF; width:150px");
      }
    }
    else if (buttonList[i].id === "btnStop") {
      if (Bit(myVal, 7)) {
        buttonList[i].setAttribute("style","background: lime; width:150px");
      }
      else {
        buttonList[i].setAttribute("style","background: #EFEFEF; width:150px");
      }
    }
  }

  if (Bit(myVal, 0)) {
    document.getElementById("pnlSimAcik").setAttribute("style","background: lime");
  }
  else
    document.getElementById("pnlSimAcik").setAttribute("style","background: gray");


  if (Bit(myVal, 1)) {
    document.getElementById("pnlSimKapali").setAttribute("style","background: lime");
  }
  else
    document.getElementById("pnlSimKapali").setAttribute("style","background: gray");

  if (Bit(myVal, 8)) {
    document.getElementById("pnlArzAcma").setAttribute("style","background: red");
  }
  else
    document.getElementById("pnlArzAcma").setAttribute("style","background: gray");

  if (Bit(myVal, 9)) {
    document.getElementById("pnlArzKapama").setAttribute("style","background: red");
  }
  else
    document.getElementById("pnlArzKapama").setAttribute("style","background: gray");

  if (Bit(myVal, 10) | Bit(myVal, 15)) {
    document.getElementById("pnlArzSW").setAttribute("style","background: red");
  }
  else
    document.getElementById("pnlArzSW").setAttribute("style","background: gray");

  return headerColor;
}

function checkKlepe3YonPopupButton(buttonList, myVal) {
  var headerColor = "gray";

  for (var i = 0; i < buttonList.length; i++) {
    if (buttonList[i].id === "btnMan") {
      if (Bit(myVal, 5)) {
        buttonList[i].setAttribute("style","background: lime; width:150px");
      }
      else
        buttonList[i].setAttribute("style","background: #EFEFEF; width:150px");
    }
    else if (buttonList[i].id === "btnStart") {
      if (Bit(myVal, 6)) {
        buttonList[i].setAttribute("style","background: lime; width:150px");
      }
      else {
        buttonList[i].setAttribute("style","background: #EFEFEF; width:150px");
      }
    }
    else if (buttonList[i].id === "btnStop") {
      if (Bit(myVal, 7)) {
        buttonList[i].setAttribute("style","background: lime; width:150px");
      }
      else {
        buttonList[i].setAttribute("style","background: #EFEFEF; width:150px");
      }
    }
  }



  if (Bit(myVal, 0)) {
    document.getElementById("pnlSimAcik").setAttribute("style","background: lime");
  }
  else
    document.getElementById("pnlSimAcik").setAttribute("style","background: gray");


  if (Bit(myVal, 1)) {
    document.getElementById("pnlSimKapali").setAttribute("style","background: lime");
  }
  else
    document.getElementById("pnlSimKapali").setAttribute("style","background: gray");

  if (Bit(myVal, 8)) {
    document.getElementById("pnlArzAcma").setAttribute("style","background: red");
  }
  else
    document.getElementById("pnlArzAcma").setAttribute("style","background: gray");

  if (Bit(myVal, 9)) {
    document.getElementById("pnlArzKapama").setAttribute("style","background: red");
  }
  else
    document.getElementById("pnlArzKapama").setAttribute("style","background: gray");

  if (Bit(myVal, 10)) {
    document.getElementById("pnlArzSW").setAttribute("style","background: red");
  }
  else
    document.getElementById("pnlArzSW").setAttribute("style","background: gray");

  if (Bit(myVal, 15)) {
    document.getElementById("pnlArzOrta").setAttribute("style","background: red");
  }
  else
    document.getElementById("pnlArzOrta").setAttribute("style","background: gray");


  return headerColor;
}

function checkKlepe2YonPopupButton(buttonList, myVal) {
  var headerColor = "gray"; //pop içerisindeki butoon renkleri ayarlanır ve header rengi return edilir.
  var pasif = "#EFEFEF";
  var aktif = "lime";

  for (var i = 0; i < buttonList.length; i++) {
    if (buttonList[i].id === "btnMan") {
      if (Bit(myVal, 5)) {
        buttonList[i].setAttribute("style","background: lime; width:150px");
      }
      else
        buttonList[i].setAttribute("style","background: #EFEFEF; width:150px");
    }
    else if (buttonList[i].id === "btnStart") {
      if (Bit(myVal, 6)) {
        buttonList[i].setAttribute("style","background: lime; width:150px");
      }
      else {
        buttonList[i].setAttribute("style","background: #EFEFEF; width:150px");
      }
    }
    else if (buttonList[i].id === "btnStop") {
      if (Bit(myVal, 7)) {
        buttonList[i].setAttribute("style","background: lime; width:150px");
      }
      else {
        buttonList[i].setAttribute("style","background: #EFEFEF; width:150px");
      }
    }
  }



  if (Bit(myVal, 0)) {
    document.getElementById("pnlSimAcik").setAttribute("style","background: lime");
  }
  else
    document.getElementById("pnlSimAcik").setAttribute("style","background: gray");


  if (Bit(myVal, 1)) {
    document.getElementById("pnlSimKapali").setAttribute("style","background: lime");
  }
  else
    document.getElementById("pnlSimKapali").setAttribute("style","background: gray");

  if (Bit(myVal, 8)) {
    document.getElementById("pnlArzAcma").setAttribute("style","background: red");
  }
  else
    document.getElementById("pnlArzAcma").setAttribute("style","background: gray");

  if (Bit(myVal, 9)) {
    document.getElementById("pnlArzKapama").setAttribute("style","background: red");
  }
  else
    document.getElementById("pnlArzKapama").setAttribute("style","background: gray");

  if (Bit(myVal, 10)) {
    document.getElementById("pnlArzSW").setAttribute("style","background: red");
  }
  else
    document.getElementById("pnlArzSW").setAttribute("style","background: gray");


  return headerColor;
}

// function popupKonumHesapla(popup, mouseX, mouseY) {
//   var screenHeight = screen.height;
//   var screenWidth = screen.width;
//   var popupHeihgt = popup.offsetHeight;
//   var popupWidth = popup.offsetWidth;
//   if (mouseY < (screenHeight / 2)) {
//     popup.style.top = mouseY + 'px';
//   } else {
//     popup.style.top = (mouseY - popupHeihgt) + 'px';
//   }
//   if (mouseX < (screenWidth / 2)) {
//     popup.style.left = mouseX + 'px';
//   } else {
//     popup.style.left = (mouseX - popupWidth) + 'px';
//   }
// }

function getMotorPopUpHTML() {
  var a =

      '<table>'
      + '<tr><td style="text-align: center;width:150px;"><button style="width:100%;" id = "btnMan" onclick="MotorButton_Click(this)" type="button" class="mostPopupButton">MANUEL</button> </td></tr> '
      + '<tr><td style="text-align: center;width:150px;"><button style="width:100%;" id = "btnStart" onclick="MotorButton_Click(this)" type="button" class="mostPopupButton">START</button> </td></tr>'
      + '<tr><td style="text-align: center;width:150px;"><button style="width:100%;" id = "btnStop" onclick="MotorButton_Click(this)" type="button" class="mostPopupButton">STOP</button> </td></tr>'
      + '<tr><td style="text-align: center;width:150px;"><button style="width:100%;" id = "btnBakim" onclick="MotorButton_Click(this)" type="button" class="mostPopupButton">BAKIM</button> </td></tr>'
      + '<tr><td style="text-align: center;width:150px;"></td></tr>'
      + '<tr><td style="text-align: center;width:150px;"><button style="width:100%;" id = "btnReset" onclick="MotorButton_Click(this)" type="button" class="mostPopupButton">RESET</button> </td></tr>'
      + '<tr><td style="text-align: center;width:150px;"></td></tr>'
      + '<tr><td style="text-align: center;width:150px;"></td></tr>'
      + '<tr><td style="text-align: center;width:150px;"><button style="width:100%;" id = "btnDurusReset" onclick="MotorButton_Click(this)" type="button" class="mostPopupButton">DURUŞ RESET</button> </td></tr>'
      + '</table > ';
  return a;
}
function getMotorPopUpAlarmInputOutputHTML() {
  var a = '<table class="popupTabTable">'
      + '<tr>'
      + '<td colspan="4" style="text-align: center; background-color: lightgray;">ALARM</td>'
      + '</tr>'
      + '<tr>'
      + '<td style="background-color: whitesmoke; width: 35%;">'
      + 'Termik Alarm'
      + '</td>'
      + '<td id="pnlArzTermik" class="popUpPanel" style="background-color: lime; width: 15%; border: 1px solid black;">'
      + '</td>'
      + '<td style="background-color: whitesmoke; width: 35%;">'
      + 'Devir Bekçisi'
      + '</td>'
      + '<td id="pnlArzDevirBekcisi" class="popUpPanel" style="background-color: red; width: 15%; border: 1px solid black;"></td>'
      + '</tr>'
      + '<tr>'
      + '<td style="background-color: whitesmoke; width: 35%;">'
      + 'Kontaktör Arıza'
      + '</td>'
      + '<td id="pnlArzKontaktor" class="popUpPanel" style="background-color: lime; width: 15%; border: 1px solid black;">'

      + '</td>'
      + '<td style="background-color: whitesmoke; width: 35%;">'
      + 'Bakım Şalteri'
      + '</td>'
      + '<td id="pnlArzBakimSalteri" class="popUpPanel" style="background-color: red; width: 15%; border: 1px solid black;"></td>'
      + '</tr>'
      + '<tr>'
      + '<td style="background-color: whitesmoke; width: 35%;">'
      + 'Bakım Zamanı'
      + '</td>'
      + '<td id="pnlArzBakimZamani" class="popUpPanel" style="background-color: lime; width: 15%; border: 1px solid black;">'

      + '</td>'
      + '<td style="background-color: whitesmoke; width: 35%;">'
      + 'Bant Kaydı'
      + '</td>'
      + '<td id="pnlArzBantKaydi" class="popUpPanel" style="background-color: red; width: 15%; border: 1px solid black;"></td>'
      + '</tr>'
      + '<tr>'
      + '<td style="background-color: whitesmoke; width: 35%;">'
      + 'Taşma Arıza'
      + '</td>'
      + '<td id="pnlArzTasma" class="popUpPanel" style="background-color: lime; width: 15%; border: 1px solid black;">'

      + '</td>'
      + '<td style="background-color: whitesmoke; width: 35%;">'
      + 'Akım Arıza'
      + '</td>'
      + '<td id="pnlArzAkim" class="popUpPanel" style="background-color: red; width: 15%; border: 1px solid black;"></td>'
      + '</tr>'
      + '<tr>'
      + '<td style="background-color: whitesmoke; width: 35%;">'
      + 'Emniyet Arıza'
      + '</td>'
      + '<td id="pnlArzEmniyet" class="popUpPanel" style="background-color: lime; width: 15%; border: 1px solid black;">'

      + '</td>'
      + '<td style="background-color: whitesmoke; width: 35%;">'
      + 'Devir Arıza'
      + '</td>'
      + '<td id="pnlArzDevir" class="popUpPanel" style="background-color: red; width: 15%; border: 1px solid black;"></td>'
      + '</tr>'

      + '<tr>'
      + '<td colspan="4" style="text-align: center; background-color: lightgray;">Input/Output</td>'
      + '</tr>'
      + '<tr>'
      + '<td style="background-color: whitesmoke; width: 35%;">'
      + 'Termik Inp.'
      + '</td>'
      + '<td id="pnlTermik" class="popUpPanel" style="background-color: lime; width: 15%; border: 1px solid black;">'

      + '</td>'
      + '<td style="background-color: whitesmoke; width: 35%;">'
      + 'Taşma Sw.'
      + '</td>'
      + '<td id="pnlTasmaSw" class="popUpPanel" style="background-color: red; width: 15%; border: 1px solid black;"></td>'
      + '</tr>'
      + '<tr>'
      + '<td style="background-color: whitesmoke; width: 35%;">'
      + 'Çalıştı Inp.'
      + '</td>'
      + '<td id="pnlCalisti" class="popUpPanel" style="background-color: lime; width: 15%; border: 1px solid black;">'

      + '</td>'
      + '<td style="background-color: whitesmoke; width: 35%;">'
      + 'Devir Bekçisi'
      + '</td>'
      + '<td id="pnlDevirBekcisi" class="popUpPanel" style="background-color: red; width: 15%; border: 1px solid black;"></td>'
      + '</tr>'
      + '<tr>'
      + '<td style="background-color: whitesmoke; width: 35%;">'
      + 'Bakım Şalteri'
      + '</td>'
      + '<td id="pnlBakimSalteri" class="popUpPanel" style="background-color: lime; width: 15%; border: 1px solid black;">'

      + '</td>'
      + '<td style="background-color: whitesmoke; width: 35%;">'
      + 'Local Start'
      + '</td>'
      + '<td id="pnlLocalStart" class="popUpPanel" style="background-color: gray; width: 15%; border: 1px solid black;"></td>'
      + '</tr>'
      + '<tr>'
      + '<td style="background-color: whitesmoke; width: 35%;">'
      + 'Bant Kaydı'
      + '</td>'
      + '<td id="pnlBantKaydi" class="popUpPanel" style="background-color: lime; width: 15%; border: 1px solid black;">'

      + '</td>'
      + '<td style="background-color: whitesmoke; width: 35%;">'
      + 'Emniyet Sw.'
      + '</td>'
      + '<td id="pnlEmniyetSw" class="popUpPanel" style="background-color: red; width: 15%; border: 1px solid black;"></td>'
      + '</tr>'
      + '<tr>'
      + '<td style="background-color: whitesmoke; width: 35%;">'
      + 'Motor Start'
      + '</td>'
      + '<td id="pnlMotorStart1" class="popUpPanel" style="background-color: lime; width: 15%; border: 1px solid black;">'
      + '</td>'
      + '</tr>'
      + '</table>';
  return a;
}

function getKlepePopUpHTML() {
  var a =

      '<table>'
      + '<tr><td style="text-align: center;"><button style="width:100%;" id = "btnMan" onclick="KlepeButton_Click(this)" type="button" class="mostPopupButton">MANUEL</button> </td></tr> '
      + '<tr><td style="text-align: center;"><button style="width:100%;" id = "btnStart" onclick="KlepeButton_Click(this)" type="button" class="mostPopupButton">AÇ</button> </td></tr>'
      + '<tr><td style="text-align: center;"><button style="width:100%;" id = "btnStop" onclick="KlepeButton_Click(this)" type="button" class="mostPopupButton">KAPAT</button> </td></tr>'
      + '<tr><td style="text-align: center;"></td></tr>'
      + '<tr><td style="text-align: center;"><button style="width:100%;" id = "btnReset" onclick="KlepeButton_Click(this)" type="button" class="mostPopupButton">RESET</button> </td></tr>'
      + '</table > ';
  return a;
}
function getKlepePopUpAlarmInputOutputHTML() {
  var a = '<table class="popupTabTable">'
      + '<tr>'
      + '<td colspan="4" style="text-align: center; background-color: lightgray;">ALARM</td>'
      + '</tr>'
      + '<tr>'
      + '<td style="background-color: whitesmoke; width: 35%;">'
      + 'Açma Arıza'
      + '</td>'
      + '<td id="pnlArzAcma" class="popUpPanel" style="background-color: lime; width: 15%; border: 1px solid black;">'
      + '</td>'
      + '<td style="background-color: whitesmoke; width: 35%;">'
      + 'Kapama Arıza'
      + '</td>'
      + '<td id="pnlArzKapama" class="popUpPanel" style="background-color: red; width: 15%; border: 1px solid black;"></td>'
      + '</tr>'
      + '<tr>'
      + '<td style="background-color: whitesmoke; width: 35%;">'
      + 'Switch Arıza'
      + '</td>'
      + '<td id="pnlArzSW" class="popUpPanel" style="background-color: lime; width: 15%; border: 1px solid black;">'
      + '</td></tr>'


      + '<tr>'
      + '<td colspan="4" style="text-align: center; background-color: lightgray;">Input/Output</td>'
      + '</tr>'
      + '<tr>'
      + '<td style="background-color: whitesmoke; width: 35%;">'
      + 'Açık Sensör'
      + '</td>'
      + '<td id="pnlSimAcik" class="popUpPanel" style="background-color: lime; width: 15%; border: 1px solid black;">'

      + '</td>'
      + '<td style="background-color: whitesmoke; width: 35%;">'
      + 'Kapalı Sensör'
      + '</td>'
      + '<td id="pnlSimKapali" class="popUpPanel" style="background-color: red; width: 15%; border: 1px solid black;"></td>'
      + '</tr>'

      + '</table>';
  return a;
}

function getKlepe2YonPopUpHTML() {
  var a =

      '<table>'
      + '<tr><td><button style="width:100%;" id = "btnMan" onclick="Klepe2YonButton_Click(this)" type="button" class="mostPopupButton">MANUEL</button> </td></tr> '
      + '<tr><td><button style="width:100%;" id = "btnStart" onclick="Klepe2YonButton_Click(this)" type="button" class="mostPopupButton">Sağ Yön Start</button> </td></tr>'
      + '<tr><td><button style="width:100%;" id = "btnStop" onclick="Klepe2YonButton_Click(this)" type="button" class="mostPopupButton">Sol Yön Start</button> </td></tr>'
      + '<tr><td></td></tr>'
      + '<tr><td><button style="width:100%;" id = "btnReset" onclick="Klepe2YonButton_Click(this)" type="button" class="mostPopupButton">RESET</button> </td></tr>'
      + '</table > ';
  return a;
}
function getKlepe2YonPopUpAlarmInputOutputHTML() {
  var a = '<table class="popupTabTable">'
      + '<tr>'
      + '<td colspan="4" style="text-align: center; background-color: lightgray;">ALARM</td>'
      + '</tr>'
      + '<tr>'
      + '<td style="background-color: whitesmoke; width: 35%;">'
      + 'Açma Arıza'
      + '</td>'
      + '<td id="pnlArzAcma" class="popUpPanel" style="background-color: lime; width: 15%; border: 1px solid black;">'
      + '</td>'
      + '<td style="background-color: whitesmoke; width: 35%;">'
      + 'Kapama Arıza'
      + '</td>'
      + '<td id="pnlArzKapama" class="popUpPanel" style="background-color: red; width: 15%; border: 1px solid black;"></td>'
      + '</tr>'
      + '<tr>'
      + '<td style="background-color: whitesmoke; width: 35%;">'
      + 'Switch Arıza'
      + '</td>'
      + '<td id="pnlArzSW" class="popUpPanel" style="background-color: lime; width: 15%; border: 1px solid black;">'
      + '</td>'
      + '</tr > '


      + '<tr>'
      + '<td colspan="4" style="text-align: center; background-color: lightgray;">Input/Output</td>'
      + '</tr>'
      + '<tr>'
      + '<td style="background-color: whitesmoke; width: 35%;">'
      + 'Açık Sensör'
      + '</td>'
      + '<td id="pnlSimAcik" class="popUpPanel" style="background-color: lime; width: 15%; border: 1px solid black;">'

      + '</td>'
      + '<td style="background-color: whitesmoke; width: 35%;">'
      + 'Kapalı Sensör'
      + '</td>'
      + '<td id="pnlSimKapali" class="popUpPanel" style="background-color: red; width: 15%; border: 1px solid black;"></td>'
      + '</tr>'

      + '</table>';
  return a;
}

function getKlepe3YonPopUpHTML() {
  var a =

      '<table>'
      + '<tr><td><button style="width:100%;" id = "btnMan" onclick="Klepe3YonButton_Click(this)" type="button" class="mostPopupButton">MANUEL</button> </td></tr> '
      + '<tr><td><button style="width:100%;" id = "btnStart" onclick="Klepe3YonButton_Click(this)" type="button" class="mostPopupButton">Sağ Yön Start</button> </td></tr>'
      + '<tr><td><button style="width:100%;" id = "btnStop" onclick="Klepe3YonButton_Click(this)" type="button" class="mostPopupButton">Sol Yön Start</button> </td></tr>'
      + '<tr><td></td></tr>'
      + '<tr><td><button style="width:100%;" id = "btnReset" onclick="Klepe3YonButton_Click(this)" type="button" class="mostPopupButton">RESET</button> </td></tr>'
      + '</table > ';
  return a;
}
function getKlepe3YonPopUpAlarmInputOutputHTML() {
  var a = '<table class="popupTabTable">'
      + '<tr>'
      + '<td colspan="4" style="text-align: center; background-color: lightgray;">ALARM</td>'
      + '</tr>'
      + '<tr>'
      + '<td style="background-color: whitesmoke; width: 35%;">'
      + 'Açma Arıza'
      + '</td>'
      + '<td id="pnlArzAcma" class="popUpPanel" style="background-color: lime; width: 15%; border: 1px solid black;">'
      + '</td>'
      + '<td style="background-color: whitesmoke; width: 35%;">'
      + 'Kapama Arıza'
      + '</td>'
      + '<td id="pnlArzKapama" class="popUpPanel" style="background-color: red; width: 15%; border: 1px solid black;"></td>'
      + '</tr>'
      + '<tr>'
      + '<td style="background-color: whitesmoke; width: 35%;">'
      + 'Switch Arıza'
      + '</td>'
      + '<td id="pnlArzSW" class="popUpPanel" style="background-color: lime; width: 15%; border: 1px solid black;">'
      + '</td>'
      + '<td style="background-color: whitesmoke; width: 35%;">'
      + 'Orta Arıza'
      + '</td>'
      + '<td id="pnlArzOrta" class="popUpPanel" style="background-color: lime; width: 15%; border: 1px solid black;">'
      + '</td>'
      + '</tr > '


      + '<tr>'
      + '<td colspan="4" style="text-align: center; background-color: lightgray;">Input/Output</td>'
      + '</tr>'
      + '<tr>'
      + '<td style="background-color: whitesmoke; width: 35%;">'
      + 'Açık Sensör'
      + '</td>'
      + '<td id="pnlSimAcik" class="popUpPanel" style="background-color: lime; width: 15%; border: 1px solid black;">'

      + '</td>'
      + '<td style="background-color: whitesmoke; width: 35%;">'
      + 'Kapalı Sensör'
      + '</td>'
      + '<td id="pnlSimKapali" class="popUpPanel" style="background-color: red; width: 15%; border: 1px solid black;"></td>'
      + '</tr>'

      + '</table>';
  return a;
}

function MotorButton_OnClick(myButton, chat, AllItems, rootTag) {
  var aa = rootTag.replace(".IO", ".CNT");
  if (myButton.id === "btnMan") {
    if (Bit(ReadItemFromList(AllItems, rootTag), 8)) {
      chat.server.writeTag(aa, "21");
    }
    else
      chat.server.writeTag(aa, "1");
  }
  else if (myButton.id === "btnStart") {
    chat.server.writeTag(aa, "2");
  }
  else if (myButton.id === "btnStop") {
    chat.server.writeTag(aa, "22");
  }
  else if (myButton.id === "btnBakim") {
    if (Bit(ReadItemFromList(AllItems, rootTag), 11)) {
      chat.server.writeTag(aa, "24");
    }
    else
      chat.server.writeTag(aa, "4");
  }
  else if (myButton.id === "btnReset") {
    chat.server.writeTag(aa, "12");
  }
  else if (myButton.id === "btnDurusReset") {
    chat.server.writeTag(aa, "9");
  }
}

function KlepeButton_OnClick(myButton, chat, AllItems, rootTag) {
  var aa = rootTag.replace(".IO", ".CNT");
  if (myButton.id === "btnMan") {
    if (Bit(ReadItemFromList(AllItems, rootTag), 5)) {
      chat.server.writeTag(aa, "21");
    }
    else
      chat.server.writeTag(aa, "1");
  }
  else if (myButton.id === "btnStart") {
    chat.server.writeTag(aa, "2");
  }
  else if (myButton.id === "btnStop") {
    chat.server.writeTag(aa, "3");
  }
  else if (myButton.id === "btnReset") {
    chat.server.writeTag(aa, "12");
  }
}

function Klepe3YonButton_OnClick(myButton, chat, AllItems, rootTag) {
  var aa = rootTag.replace(".IO", ".CNT");
  if (myButton.id === "btnMan") {
    if (Bit(ReadItemFromList(AllItems, rootTag), 5)) {
      chat.server.writeTag(aa, "21");
    }
    else
      chat.server.writeTag(aa, "1");
  }
  else if (myButton.id === "btnStart") {
    if (Bit(ReadItemFromList(AllItems, rootTag), 6)) {
      chat.server.writeTag(aa, "22");
    }
    else
      chat.server.writeTag(aa, "2");
  }
  else if (myButton.id === "btnStop") {
    if (Bit(ReadItemFromList(AllItems, rootTag), 7)) {
      chat.server.writeTag(aa, "23");
    }
    else
      chat.server.writeTag(aa, "3");
  }
  else if (myButton.id === "btnReset") {
    chat.server.writeTag(aa, "12");
  }
}

function Klepe2YonButton_OnClick(myButton, chat, AllItems, rootTag) {
  var aa = rootTag.replace(".IO", ".CNT");
  if (myButton.id === "btnMan") {
    if (Bit(ReadItemFromList(AllItems, rootTag), 5)) {
      chat.server.writeTag(aa, "21");
    }
    else
      chat.server.writeTag(aa, "1");
  }
  else if (myButton.id === "btnStart") {

    chat.server.writeTag(aa, "2");
  }
  else if (myButton.id === "btnStop") {

    chat.server.writeTag(aa, "3");
  }
  else if (myButton.id === "btnReset") {
    chat.server.writeTag(aa, "12");
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
  // motor.addEventListener("click", event => {
  //   $('#myModal').modal('show');
  //   document.getElementById('modalheadertext').innerText = event.path[1].attributes[0].textContent;
  //   document.getElementById('modalbodytext').innerText = event.path[1].attributes[2].textContent;
  // });
  // motor.addEventListener('click', Motor_Click, false);
  for (var k = 0; k < motor.children.length; k++) {
    if (motor.children[k].hasAttribute("willChange")) {
      motor.children[k].setAttribute("style", `fill:${color};stroke:black;stroke-width:2`);
    }
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
  // klepe.addEventListener("click", event => {
  //   $('#myModal').modal('show');
  //   document.getElementById('modalheadertext').innerText = event.path[1].attributes[0].textContent;
  //   document.getElementById('modalbodytext').innerText = event.path[1].attributes[2].textContent;
  // });
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

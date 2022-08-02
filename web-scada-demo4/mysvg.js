window.onload = function () {
  startHubConn();
  // jQuery(document).ready(function(){
  //   jQuery(function() {
  //         jQuery(this).bind("contextmenu", function(event) {
  //           alert('12');
  //           event.preventDefault();
  //         });
  //     });
  // });
}

modal = document.getElementById("popUpModal");
var swaggerData;
var allItems = {};

//SignalR Configuration
const connection = new signalR.HubConnectionBuilder()
    .withUrl("http://192.168.1.163:9999/demoHub")
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
    // initEventHandler(resp[i].Name);
  }

  connection.on("ReceiveValues", (value) => {
    const resp = JSON.parse(value);
    for(var i = 0; i<resp.length; i++){
      allItems[resp[i].Name]=resp[i];
      itemChange(resp[i].Name, resp[i].Value);
    }
  });
});

connection.on("WriteToPlc", (val)=>{
  //console log'da hata vermemesi için eklendi dokunma
});

async function WriteToPlc(value) {
  var b = {
    Name : value.Name,
    Value : value.Value,
    CustomCode : ""
  };
  const strVal = JSON.stringify(b);
  connection.invoke('WriteValues', strVal).then(() => {
      // document.getElementById('demo').innerText = `${value}`;
      // console.log("WriteValues");
      // console.log(strVal);
      }).catch(err => console.log(err));
}

// function startScada() {
//   startHubConn();
// }

// function initEventHandler(itemName) {
//   const svg = document.getElementById("svg_obj").contentDocument;
//   const layer1 = svg.getElementById("layer1");
//   for (var i = 0; i < layer1.children.length; i++) {
//     var aa = layer1.children;
//     if(aa[i].hasAttribute("PlcTagName")){
//       if (aa[i].getAttribute("PlcTagName") === itemName) {
//         var popUpRootTag = aa[i].getAttribute("PlcTagName");
//         if (aa[i].getAttribute("tip") === "motor") {
//           aa[i].addEventListener("click", event => {
//             console.log("1");
//             Motor_Click(popUpRootTag);
//             $('#popUpModal').modal('show');
//         });
//         }
//       }
//     }
//   }
// }

//modal placement
function modalPositioning(modal, event) {
  // if(event.x< modal.style.left){
  if(event.x<(screen.width/1.6)){
    modal.style.left = event.x-(screen.width/4);
  } else {
    // modal.style.right = event.x-screen.width;
    modal.style.left = event.x/6;
  }
  if(event.y< (screen.height/2)){
    modal.style.top = event.y;
  } else {
    // modal.style.bottom = event.y-screen.height;
    modal.style.top = event.y-(screen.height/3);
  }
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
            aa[i].setAttribute("style","cursor: pointer");
            aa[i].addEventListener("click", event => {
              modal = document.getElementById("popUpModal");
              modalPositioning(modal, event);
              Motor_Click(popUpRootTag);
              $('#popUpModal').modal('show');
          });
        }
        if (aa[i].getAttribute("tip") === "kapak") {
          if(aa[i].getAttribute("class") === "klepe"){
            checkKlepe(itemValue, aa[i]);
            changeKlepeTag(aa[i],itemValue);
            aa[i].setAttribute("style","cursor: pointer");
            aa[i].addEventListener("click", event => {
              modal = document.getElementById("popUpModal");
              modalPositioning(modal, event);
              Klepe_Click(popUpRootTag);
              $('#popUpModal').modal('show');
            });
          }
          if(aa[i].getAttribute("class")==="klepe2"){
            checkKlepe2Yon(itemValue, aa[i]);
            changeKlepe2YonTag(aa[i],itemValue);
            aa[i].setAttribute("style","cursor: pointer");
            aa[i].addEventListener("click", event => {
              modal = document.getElementById("popUpModal");
              modalPositioning(modal,event);
              Klepe2Yon_Click(popUpRootTag);
              $('#popUpModal').modal('show');
            });
          }
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
    if(aa[i].hasAttribute("PlcGroupName")){
      for (var j = 0; j < aa[i].children.length; j++) {
        var flag=false;
          var bb = aa[i].children;
          if(bb[j].hasAttribute('PlcTagName')){
            if(bb[j].getAttribute('PlcTagName')===itemName){
            changeRelatedPlace(itemValue, bb[j]);
            flag=true;
           }
            for(var k=0; k<bb[j].children.length;k++){
              var cc = bb[j].children;
              if(cc[k].getAttribute('PlcTagName')===itemName){
                  changeRelatedPlace(itemValue, cc[k]);
                  flag=true;
                }            
            }
          }
           else {
            if(aa[i].getAttribute("PlcGroupName")==="hm1"){
              // console.log(aa[i].children[0].children[0].id)
              var list = aa[i].children[0].children;
              for(let i = 0;i<list.length; i++){
                if(list[i].id==='txtHM1IsEmriNo'){
                  isEmriNo = list[i].textContent;
                }
                // console.log(list[i].id==='txtHM1IsEmriNo');
                // var isEmriNo = (list[i].id==='txtHM1IsEmriNo').textContent;
                  // console.log(list[i].id);
                  // console.log(swaggerData.stokNo);
                  if(!list[i].hasAttribute('PlcTagName')){
                    if(isEmriNo==='0') {
                      list[i].textContent = ""
                    }
                    else {
                      getHammaddeGrupVeri(isEmriNo, list[i]);
                    }
                  }
                  // if(list[i].id==='txtHM1HammaddeKodu'){
                  //   if(isEmriNo==='0'){
                  //     list[i].textContent = ""
                  //     // list[i].textContent = 
                  //   }
                  //   else {
                  //     getHammaddeGrupVeri(isEmriNo, list[i]);
                  //   }
                  // } else if(list[i].id==='txtHM1HammaddeAdi'){
                  //   if(isEmriNo==='0'){
                  //     list[i].textContent = ""
                  //     // list[i].textContent = 
                  //   }
                  //   else {
                  //     getHammaddeGrupVeri(isEmriNo, list[i]);
                  //   }
                  // } else if(list[i].id==='txtHM1BaslamaZamani'){
                  //   if(isEmriNo==='0'){
                  //     list[i].textContent = ""
                  //     // list[i].textContent = 
                  //   }
                  //   else {
                  //     getHammaddeGrupVeri(isEmriNo, list[i]);
                  //   }
                  // } 
              }
            }
            else if(aa[i].getAttribute("PlcGroupName")==="hm2"){
              var list = aa[i].children[0].children;
              for(let i = 0;i<list.length; i++){
                if(list[i].id==='txtHM2IsEmriNo'){
                  isEmriNo = list[i].textContent;
                }
                if(!list[i].hasAttribute('PlcTagName')){
                  if(isEmriNo==='0') {
                    list[i].textContent = ""
                  }
                  else {
                    getHammaddeGrupVeri(isEmriNo, list[i]);
                  }
                }
              }
            }
          }      
      }   
    }
  }
}

function formatDate(date) {
  let x = new Date(Date.parse(date));
  dateFormatted = x.toLocaleString('tr-TR', {hour:'2-digit', minute:'2-digit', second: '2-digit', day:'2-digit', month:'2-digit', year:'numeric' });
  return dateFormatted;
}

function getHammaddeGrupVeri(isEmriNo, list) {
  let xhr = new XMLHttpRequest();
  // xhr.open("GET","http://192.168.1.163:9999/api/Values/GetHammaddeGrupVeri?isEmriNo="+isEmriNo, true);
  // xhr.send(null);
  xhr.open("GET","http://192.168.1.163:9999/api/Values/GetHammaddeGrupVeri?isEmriNo="+isEmriNo,true);
  xhr.send();
  xhr.onload = function () {
    if(xhr.status === 200) {
      swaggerData = JSON.parse(xhr.responseText);
      if(list.id==='txtHM1HammaddeKodu'){
        list.textContent = swaggerData.stokNo;
      } else if (list.id==='txtHM1HammaddeAdi'){
        list.textContent = swaggerData.stokAd;
      } else if (list.id==='txtHM1BaslamaZamani'){
        list.textContent = formatDate(swaggerData.tarihBaslangic);
      } else if(list.id==='txtHM2HammaddeKodu'){
        list.textContent = swaggerData.stokNo;
      } else if (list.id==='txtHM2HammaddeAdi'){
        list.textContent = swaggerData.stokAd;
      } else if (list.id==='txtHM2BaslamaZamani'){
        list.textContent = formatDate(swaggerData.tarihBaslangic);
      }
    }
  }
}


function changeRelatedPlace(itemValue, item){
  if(item.getAttribute('PlcTagName').includes('.STAT')){
    // console.log('burasi11', cc[k], itemValue);
    changeTextDurum(itemValue, item);
  }
  else if (item.getAttribute('PlcTagName').includes('.ARZ')){
    // console.log('burasi12', cc[k], Bit(itemValue,1));
      changeHataStatus(itemValue, item);
  }
  else if (item.getAttribute('PlcTagName').includes('.DNOSCD')){
    // console.log('burasi13', item, itemValue);
    changeTextDolum(itemValue, item);
  }
  else if (item.getAttribute('PlcTagName').includes('.ANOSCD')){
    // console.log('burasi14', cc[k], itemValue);
    changeText(itemValue, item);
  }
  else if (item.getAttribute('PlcTagName').includes('.LINKNO')){
    // console.log('burasi15', item, itemValue);
      changeText(itemValue, item);
  }
  else if (item.getAttribute('PlcTagName').includes('.AKTIFRST')){
    // console.log('burasi16', cc[k], itemValue);
    // btnResetSendValues(itemValue, cc[k]);
    item.setAttribute("style","cursor: pointer");
    item.addEventListener("click", event => {
      plcVal = {
        Name : item.attributes[2].value,
        Value : "1"
      };
      // console.log(plcVal);
      WriteToPlc(plcVal);
      alert('Resetlendi');
    });
  }
  else if (item.getAttribute('PlcTagName').includes('.START')){
    // console.log('burasi17', cc[k], itemValue);
    // btnBaslatSendValues(itemValue, cc[k]);
    item.setAttribute("style","cursor: pointer");
    item.addEventListener("click", event => {
      plcVal = {
        Name : item.attributes[2].value,
        Value : "1"
      };
      // console.log(plcVal);
      WriteToPlc(plcVal);
      alert('Başlatıldı')
    });
  }
  else if (item.getAttribute('PlcTagName').includes('.STOP')){
    // console.log('burasi18', cc[k], itemValue);
    // btnDurdurSendValues(itemValue, cc[k]);
    item.setAttribute("style","cursor: pointer");
    item.addEventListener("click", event => {
      plcVal = {
        Name : item.attributes[2].value,
        Value : "1"
      };
      // console.log(plcVal);
      WriteToPlc(plcVal);
      alert('Durduruldu')
    });
  }
}

function btnArizaReset() {
  plcVal = {
    Name: 'PLC02!HM_ARZ_RST',
    Value : "1"
  };
  WriteToPlc(plcVal);
}

//alttaki durum yazısı ve üstteki menü(max-aktif-hata-hazır)
function changeTextDurum(val, durum) {
  if(Bit(val, 0)){
    if(durum.id.includes('Hata'))
      changeHataStatus(Bit(val, 0), durum);
    if(durum.id.includes('Durum'))
      durum.innerHTML='GRUP ARIZADA';
  } else if(Bit(val, 5)){
    if(durum.id.includes('Hazir'))
      changeHazirStatus(Bit(val, 5), durum);
    if(durum.id.includes('Durum')){
      durum.innerHTML='START BEKLİYOR';
      durum.setAttribute('x','1435');
      durum.setAttribute('style', 'fill: #FFC1C0C0');
    }
  } else if(Bit(val, 1)){
    if(durum.id.includes('Max'))
      changeMaxStatus(Bit(val, 1), durum);
    if(durum.id.includes('Durum')){
      durum.innerHTML='SİLO MAX';
      durum.setAttribute('x','1460');
      durum.setAttribute('style', 'fill: red');
    }
  } else if(Bit(val, 2)){
    if(durum.id.includes('Durum')){
      durum.innerHTML='TRANSFER HAZIR';
      durum.setAttribute('x','1435');
      durum.setAttribute('style', 'fill: #FF92C792');
    }
  } else if(Bit(val, 3)){
    if(durum.id.includes('Aktif'))
      changeAktifStatus(Bit(val, 3), durum);
    if(durum.id.includes('Durum')){
      durum.innerHTML='TRANSFER DEVREDE';
      durum.setAttribute('x','1425');
      durum.setAttribute('style', 'fill: gray');
    }
  } else if(Bit(val, 4)){
    if(durum.id.includes('Durum')){
      durum.innerHTML='TRANSFER DURDURULUYOR';
      durum.setAttribute('x','1400');
      durum.setAttribute('style', 'fill: #FFDEC078');
    }
  } else if(Bit(val, 6)){
    if(durum.id.includes('Durum')){
      durum.innerHTML='SİLO DEĞİŞTİRİLİYOR';
      durum.setAttribute('x','1420');
      durum.setAttribute('style', 'fill: #FFDEC078');
    }
  } else if(Bit(val, 7)){
    if(durum.id.includes('Hata'))
      changeHataStatus(Bit(val, 7), durum);
    if(durum.id.includes('Durum')){
      durum.innerHTML='SİLO MAX ARIZADA';
      durum.setAttribute('x','1430');
      durum.setAttribute('style', 'fill: #FFDB9292');
    }
  }
}

//alım ve iş emri no
function changeText(val, durum) {
  // console.log(val, id);
  durum.innerHTML=val;
}

//dolumlar
function changeTextDolum(val, durum) {
  // console.log(id.substring(11), val.length);
  if(durum.id.substring(11)<=val.length){
    for (let i=0; i<=val.length; i++){
      if(durum.id.substring(11)===(i+1).toString()){
        durum.innerHTML = val[i];
        // console.log(val[i]);
      }
    }
  } else {
    durum.innerHTML = "-";
  }
}

//aktif
function changeAktifStatus(val, durum){
  if(val) {
    durum.style.fill = 'limegreen';
  } else {
    durum.style.fill = 'white';
  }
}

//hazır
function changeHazirStatus(val, durum){
  if(val) {
    durum.style.fill = 'limegreen';
  } else {
    durum.style.fill = 'white';
    //    durum.setAttribute('style', 'color: yellow');
  }
}

//max
function changeMaxStatus(val, durum){
  if(val) {
    durum.style.fill = 'red';
  } else {
    durum.style.fill = 'white';
  }
}

//hata
function changeHataStatus(val, durum){
  if(val) {
    durum.style.fill = 'red';
  } else {
    durum.style.fill = 'white';
  }
}


// function btnBaslatSendValues(val, button){
//   if(val){
//     plcVal = {
//       Name : aa,
//       Value : "21"
//     };
//     WriteToPlc(plcVal);
//   } else {
//     // send signalr request
//   }
// }
// function btnDurdurSendValues(val, button){
//   if(val){
//     // send signalr request
//   } else {
//     // send signalr request
//   }
// }
// function btnResetSendValues(val, button){
//   if(val){
//     // send signalr request
//   } else {
//     // send signalr request
//   }
// }


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
  var parametre = document.getElementById("tdParametre");
  var btnAlarm = document.getElementById("btnAlarm");
  var modal = document.getElementById("modalDialog");
  if (parametre.style.display === "inherit") {
    document.getElementById("tdParametre").style.display = "none";
    modal.style.width = "250px";
    btnAlarm.innerHTML = ">";
  }
  else {
    document.getElementById("tdParametre").style.display = "inherit";
    modal.style.width = "420px";
    btnAlarm.innerHTML = "<";
  }


}

window.onclick = function (event) {
  ClosePopUp();
}

function ClosePopUp() {
  if(popUpFlag) {
    popUpFlag = false;
    $('#popUpModal').on('hidden.bs.modal', function () {
      // $('#popUpModal').hide();
      // $('#popUpModal .modal-dialog').html('');
      // $(".modal-dialog").hide();
    });
    // $(".modal-backdrop").hide();
    popUpRootTag = "";
    popUpType = "";
 }
 else popUpFlag=true;
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
  popUpType = "K";
  popUpRootTag = plcTag;
  ShowPopUp();
}

function Klepe3Yon_Click(plcTag) {
  popUpType = "K3yon";
  popUpRootTag = plcTag;
  ShowPopUp();
}

function Klepe2Yon_Click(plcTag) {
  popUpType = "K2yon";
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

// function popupKonumHesapla(popup, mouseX, mouseY) {
//   var screenHeight = screen.height;
//   var screenWidth = screen.width;
//   if (mouseY < (screenHeight / 2)) {
//     popup.style.top = mouseY + 'px';
//   } else {
//     console.log(popup);
//     popup.getAttribute("style", "top") = mouseY + 'px';
//   }
//   if (mouseX < (screenWidth / 2)) {
//     popup.style.left = mouseX + 'px';
//   } else {
//     popup.style.left = mouseX + 'px';
//   }
// }

// var modal = document.getElementById("popUpModal");

// popupKonumHesapla(modal, MouseX, MouseY);


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

  var modalAd = popUpRootTag.substring(6);
  var cihazAd = modalAd.split('.');
  document.getElementById('MotorPopupHeader').innerHTML = cihazAd[0];
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
  popUpFlag = false;
  MotorButton_OnClick(myButton, allItems, popUpRootTag);
}

function KlepeButton_Click(myButton) {
  popUpFlag = false;
  KlepeButton_OnClick(myButton, allItems, popUpRootTag);
}

function Klepe3YonButton_Click(myButton) {
  popUpFlag = false;
  Klepe3YonButton_OnClick(myButton, allItems, popUpRootTag);
}

function Klepe2YonButton_Click(myButton) {
  popUpFlag = false;
  Klepe2YonButton_OnClick(myButton,  allItems, popUpRootTag);
}

function checkMotorPopupButton(buttonList, myVal) {
  var headerColor = "gray";
  for (var i = 0; i < buttonList.length; i++) {
    if (buttonList[i].id === "btnMan") {
      if (Bit(myVal, 8)) {
        buttonList[i].setAttribute("style","background: lime; width:150px");
      }
      else
        buttonList[i].setAttribute("style","background: #EFEFEF; width:150px;");
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
    else if (buttonList[i].id === "btnReset") {
        buttonList[i].setAttribute("style","width:150px; background: salmon");
    }
    else if (buttonList[i].id === "btnDurusReset") {
        buttonList[i].setAttribute("style","width:150px; background: plum");
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
    document.getElementById("pnlTermik").setAttribute("style","background: lime; border:1px solid black;");
  }
  else
    document.getElementById("pnlTermik").setAttribute("style","background: gray; border:1px solid black;");


  if (Bit(myVal, 1)) {
    document.getElementById("pnlCalisti").setAttribute("style","background: lime; border:1px solid black;");
  }
  else
    document.getElementById("pnlCalisti").setAttribute("style","background: gray; border:1px solid black;");

  if (Bit(myVal, 2)) {
    document.getElementById("pnlTasmaSw").setAttribute("style","background: lime; border:1px solid black;");
  }
  else
    document.getElementById("pnlTasmaSw").setAttribute("style","background: gray; border:1px solid black;");

  if (Bit(myVal, 3)) {
    document.getElementById("pnlDevirBekcisi").setAttribute("style","background: lime; border:1px solid black;");
  }
  else
    document.getElementById("pnlDevirBekcisi").setAttribute("style","background: gray; border:1px solid black;");

  if (Bit(myVal, 4)) {
    document.getElementById("pnlBakimSalteri").setAttribute("style","background: lime; border:1px solid black;");
  }
  else
    document.getElementById("pnlBakimSalteri").setAttribute("style","background: gray; border:1px solid black;");

  if (Bit(myVal, 5)) {
    document.getElementById("pnlBantKaydi").setAttribute("style","background: lime; border:1px solid black;");
  }
  else
    document.getElementById("pnlBantKaydi").setAttribute("style","background: gray; border:1px solid black;");


  if (Bit(myVal, 6)) {
    document.getElementById("pnlEmniyetSw").setAttribute("style","background: lime; border:1px solid black;");
  }
  else
    document.getElementById("pnlEmniyetSw").setAttribute("style","background: gray; border:1px solid black;");


  if (Bit(myVal, 7)) {
    document.getElementById("pnlMotorStart1").setAttribute("style","background: lime; border:1px solid black;");
  }
  else
    document.getElementById("pnlMotorStart1").setAttribute("style","background: gray; border:1px solid black;");


  return headerColor;
}

function checkMotorPopupAlarms(myVal) {
  if (Bit(myVal, 0)) {
    document.getElementById("pnlArzTermik").setAttribute("style","background: red; border:1px solid black;");
  }
  else
    document.getElementById("pnlArzTermik").setAttribute("style","background: gray; border:1px solid black;");


  if (Bit(myVal, 1)) {
    document.getElementById("pnlArzKontaktor").setAttribute("style","background: red; border:1px solid black;");
  }
  else
    document.getElementById("pnlArzKontaktor").setAttribute("style","background: gray; border:1px solid black;");

  if (Bit(myVal, 2)) {
    document.getElementById("pnlArzTasma").setAttribute("style","background: red; border:1px solid black;");
  }
  else
    document.getElementById("pnlArzTasma").setAttribute("style","background: gray; border:1px solid black;");

  if (Bit(myVal, 3)) {
    document.getElementById("pnlArzDevirBekcisi").setAttribute("style","background: red; border:1px solid black;");
  }
  else
    document.getElementById("pnlArzDevirBekcisi").setAttribute("style","background: gray; border:1px solid black;");

  if (Bit(myVal, 4)) {
    document.getElementById("pnlArzBakimSalteri").setAttribute("style","background: red; border:1px solid black;");
  }
  else
    document.getElementById("pnlArzBakimSalteri").setAttribute("style","background: gray; border:1px solid black;");

  if (Bit(myVal, 5)) {
    document.getElementById("pnlArzBantKaydi").setAttribute("style","background: red; border:1px solid black;");
  }
  else
    document.getElementById("pnlArzBantKaydi").setAttribute("style","background: gray; border:1px solid black;");


  if (Bit(myVal, 6)) {
    document.getElementById("pnlArzEmniyet").setAttribute("style","background: red; border:1px solid black;");
  }
  else
    document.getElementById("pnlArzEmniyet").setAttribute("style","background: gray; border:1px solid black;");


  if (Bit(myVal, 7)) {
    document.getElementById("pnlArzAkim").setAttribute("style","background: red; border:1px solid black;");
  }
  else
    document.getElementById("pnlArzAkim").setAttribute("style","background: gray; border:1px solid black;");

  if (Bit(myVal, 8)) {
    document.getElementById("pnlArzDevir").setAttribute("style","background: red; border:1px solid black;");
  }
  else
    document.getElementById("pnlArzDevir").setAttribute("style","background: gray; border:1px solid black;");


  if (Bit(myVal, 9)) {
    document.getElementById("pnlArzBakimZamani").setAttribute("style","background: red; border:1px solid black;");
  }
  else
    document.getElementById("pnlArzBakimZamani").setAttribute("style","background: gray; border:1px solid black;");

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
    else if (buttonList[i].id === "btnReset") {
        buttonList[i].setAttribute("style","width:150px; background: salmon");
    }
  }

  if (Bit(myVal, 0)) {
    document.getElementById("pnlSimAcik").setAttribute("style","background: lime; border:1px solid black;");
  }
  else
    document.getElementById("pnlSimAcik").setAttribute("style","background: gray; border:1px solid black;");


  if (Bit(myVal, 1)) {
    document.getElementById("pnlSimKapali").setAttribute("style","background: lime; border:1px solid black;");
  }
  else
    document.getElementById("pnlSimKapali").setAttribute("style","background: gray; border:1px solid black;");

  if (Bit(myVal, 8)) {
    document.getElementById("pnlArzAcma").setAttribute("style","background: red; border:1px solid black;");
  }
  else
    document.getElementById("pnlArzAcma").setAttribute("style","background: gray; border:1px solid black;");

  if (Bit(myVal, 9)) {
    document.getElementById("pnlArzKapama").setAttribute("style","background: red; border:1px solid black;");
  }
  else
    document.getElementById("pnlArzKapama").setAttribute("style","background: gray; border:1px solid black;");

  if (Bit(myVal, 10) | Bit(myVal, 15)) {
    document.getElementById("pnlArzSW").setAttribute("style","background: red; border:1px solid black;");
  }
  else
    document.getElementById("pnlArzSW").setAttribute("style","background: gray; border:1px solid black;");

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
    else if (buttonList[i].id === "btnReset") {
        buttonList[i].setAttribute("style","width:150px; background: salmon");
    }
  }



  if (Bit(myVal, 0)) {
    document.getElementById("pnlSimAcik").setAttribute("style","background: lime; border:1px solid black;");
  }
  else
    document.getElementById("pnlSimAcik").setAttribute("style","background: gray; border:1px solid black;");


  if (Bit(myVal, 1)) {
    document.getElementById("pnlSimKapali").setAttribute("style","background: lime; border:1px solid black;");
  }
  else
    document.getElementById("pnlSimKapali").setAttribute("style","background: gray; border:1px solid black;");

  if (Bit(myVal, 8)) {
    document.getElementById("pnlArzAcma").setAttribute("style","background: red; border:1px solid black;");
  }
  else
    document.getElementById("pnlArzAcma").setAttribute("style","background: gray; border:1px solid black;");

  if (Bit(myVal, 9)) {
    document.getElementById("pnlArzKapama").setAttribute("style","background: red; border:1px solid black;");
  }
  else
    document.getElementById("pnlArzKapama").setAttribute("style","background: gray; border:1px solid black;");

  if (Bit(myVal, 10)) {
    document.getElementById("pnlArzSW").setAttribute("style","background: red; border:1px solid black;");
  }
  else
    document.getElementById("pnlArzSW").setAttribute("style","background: gray; border:1px solid black;");

  if (Bit(myVal, 15)) {
    document.getElementById("pnlArzOrta").setAttribute("style","background: red; border:1px solid black;");
  }
  else
    document.getElementById("pnlArzOrta").setAttribute("style","background: gray; border:1px solid black;");


  return headerColor;
}

function checkKlepe2YonPopupButton(buttonList, myVal) {
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
    else if (buttonList[i].id === "btnReset") {
        buttonList[i].setAttribute("style","width:150px; background: salmon");
    }
  }



  if (Bit(myVal, 0)) {
    document.getElementById("pnlSimAcik").setAttribute("style","background: lime; border:1px solid black;");
  }
  else
    document.getElementById("pnlSimAcik").setAttribute("style","background: gray; border:1px solid black;");


  if (Bit(myVal, 1)) {
    document.getElementById("pnlSimKapali").setAttribute("style","background: lime; border:1px solid black;");
  }
  else
    document.getElementById("pnlSimKapali").setAttribute("style","background: gray; border:1px solid black;");

  if (Bit(myVal, 8)) {
    document.getElementById("pnlArzAcma").setAttribute("style","background: red; border:1px solid black;");
  }
  else
    document.getElementById("pnlArzAcma").setAttribute("style","background: gray; border:1px solid black;");

  if (Bit(myVal, 9)) {
    document.getElementById("pnlArzKapama").setAttribute("style","background: red; border:1px solid black;");
  }
  else
    document.getElementById("pnlArzKapama").setAttribute("style","background: gray; border:1px solid black;");

  if (Bit(myVal, 10)) {
    document.getElementById("pnlArzSW").setAttribute("style","background: red; border:1px solid black;");
  }
  else
    document.getElementById("pnlArzSW").setAttribute("style","background: gray; border:1px solid black;");


  return headerColor;
}

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
  var a = '<table class="popupTabTable" style="margin:2px">'
      + '<tr style="border: 2px solid black;">'
      + '<td colspan="4" style="text-align: center; background-color: lightgray;">ALARM</td>'
      + '</tr>'
      + '<tr style="border: 1px solid black;">'
      + '<td style="background-color: whitesmoke; width: 35%; font-size: 10px;">'
      + 'Termik Alarm'
      + '</td>'
      + '<td id="pnlArzTermik" class="popUpPanel" style="background-color: lime; width: 15%; border: 1px solid black;">'
      + '</td>'
      + '<td style="background-color: whitesmoke; width: 35%; font-size: 10px;">'
      + 'Devir Bekçisi'
      + '</td>'
      + '<td id="pnlArzDevirBekcisi" class="popUpPanel" style="background-color: red; width: 15%; border: 1px solid black;"></td>'
      + '</tr>'
      + '<tr style="border: 1px solid black;">'
      + '<td style="background-color: whitesmoke; width: 35%; font-size: 10px;">'
      + 'Kontaktör Arıza'
      + '</td>'
      + '<td id="pnlArzKontaktor" class="popUpPanel" style="background-color: lime; width: 15%; border: 1px solid black;">'

      + '</td>'
      + '<td style="background-color: whitesmoke; width: 35%; font-size: 10px;">'
      + 'Bakım Şalteri'
      + '</td>'
      + '<td id="pnlArzBakimSalteri" class="popUpPanel" style="background-color: red; width: 15%; border: 1px solid black;"></td>'
      + '</tr>'
      + '<tr style="border: 1px solid black;">'
      + '<td style="background-color: whitesmoke; width: 35%; font-size: 10px;">'
      + 'Bakım Zamanı'
      + '</td>'
      + '<td id="pnlArzBakimZamani" class="popUpPanel" style="background-color: lime; width: 15%; border: 1px solid black;">'

      + '</td>'
      + '<td style="background-color: whitesmoke; width: 35%; font-size: 10px;">'
      + 'Bant Kaydı'
      + '</td>'
      + '<td id="pnlArzBantKaydi" class="popUpPanel" style="background-color: red; width: 15%; border: 1px solid black;"></td>'
      + '</tr>'
      + '<tr style="border: 1px solid black;">'
      + '<td style="background-color: whitesmoke; width: 35%; font-size: 10px;">'
      + 'Taşma Arıza'
      + '</td>'
      + '<td id="pnlArzTasma" class="popUpPanel" style="background-color: lime; width: 15%; border: 1px solid black;">'

      + '</td>'
      + '<td style="background-color: whitesmoke; width: 35%; font-size: 10px;">'
      + 'Akım Arıza'
      + '</td>'
      + '<td id="pnlArzAkim" class="popUpPanel" style="background-color: red; width: 15%; border: 1px solid black;"></td>'
      + '</tr>'
      + '<tr style="border: 1px solid black;">'
      + '<td style="background-color: whitesmoke; width: 35%; font-size: 10px;">'
      + 'Emniyet Arıza'
      + '</td>'
      + '<td id="pnlArzEmniyet" class="popUpPanel" style="background-color: lime; width: 15%; border: 1px solid black;">'

      + '</td>'
      + '<td style="background-color: whitesmoke; width: 35%; font-size: 10px;">'
      + 'Devir Arıza'
      + '</td>'
      + '<td id="pnlArzDevir" class="popUpPanel" style="background-color: red; width: 15%; border: 1px solid black;"></td>'
      + '</tr>'

      + '<tr style="border: 2px solid black;">'
      + '<td colspan="4" style="text-align: center; background-color: lightgray;">Input/Output</td>'
      + '</tr>'
      + '<tr style="border: 1px solid black;">'
      + '<td style="background-color: whitesmoke; width: 35%; font-size: 10px;">'
      + 'Termik'
      + '</td>'
      + '<td id="pnlTermik" class="popUpPanel" style="background-color: lime; width: 15%; border: 1px solid black;">'

      + '</td>'
      + '<td style="background-color: whitesmoke; width: 35%; font-size: 10px;">'
      + 'Taşma Switch'
      + '</td>'
      + '<td id="pnlTasmaSw" class="popUpPanel" style="background-color: red; width: 15%; border: 1px solid black;"></td>'
      + '</tr>'
      + '<tr style="border: 1px solid black;">'
      + '<td style="background-color: whitesmoke; width: 35%; font-size: 10px;">'
      + 'Çalıştı'
      + '</td>'
      + '<td id="pnlCalisti" class="popUpPanel" style="background-color: lime; width: 15%; border: 1px solid black;">'

      + '</td>'
      + '<td style="background-color: whitesmoke; width: 35%; font-size: 10px;">'
      + 'Devir Bekçisi'
      + '</td>'
      + '<td id="pnlDevirBekcisi" class="popUpPanel" style="background-color: red; width: 15%; border: 1px solid black;"></td>'
      + '</tr>'
      + '<tr style="border: 1px solid black;">'
      + '<td style="background-color: whitesmoke; width: 35%; font-size: 10px;">'
      + 'Bakım Şalteri'
      + '</td>'
      + '<td id="pnlBakimSalteri" class="popUpPanel" style="background-color: lime; width: 15%; border: 1px solid black;">'

      + '</td>'
      + '<td style="background-color: whitesmoke; width: 35%; font-size: 10px;">'
      + 'Local Start'
      + '</td>'
      + '<td id="pnlLocalStart" class="popUpPanel" style="background-color: gray; width: 15%; border: 1px solid black;"></td>'
      + '</tr>'
      + '<tr style="border: 1px solid black;">'
      + '<td style="background-color: whitesmoke; width: 35%; font-size: 10px;">'
      + 'Bant Kaydı'
      + '</td>'
      + '<td id="pnlBantKaydi" class="popUpPanel" style="background-color: lime; width: 15%; border: 1px solid black;">'

      + '</td>'
      + '<td style="background-color: whitesmoke; width: 35%; font-size: 10px;">'
      + 'Emniyet Switch'
      + '</td>'
      + '<td id="pnlEmniyetSw" class="popUpPanel" style="background-color: red; width: 15%; border: 1px solid black;"></td>'
      + '</tr>'
      + '<tr style="border: 1px solid black;">'
      + '<td style="background-color: whitesmoke; width: 35%; font-size: 10px;">'
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
  var a = '<table class="popupTabTable" style="margin:2px">'
      + '<tr style="border: 2px solid black;">'
      + '<td colspan="4" style="text-align: center; background-color: lightgray;">ALARM</td>'
      + '</tr>'
      + '<tr style="border: 1px solid black;">'
      + '<td style="background-color: whitesmoke; width: 35%; font-size: 10px;">'
      + 'Açma Arıza'
      + '</td>'
      + '<td id="pnlArzAcma" class="popUpPanel" style="background-color: lime; width: 15%; border: 1px solid black;">'
      + '</td>'
      + '<td style="background-color: whitesmoke; width: 35%; font-size: 10px;">'
      + 'Kapama Arıza'
      + '</td>'
      + '<td id="pnlArzKapama" class="popUpPanel" style="background-color: red; width: 15%; border: 1px solid black;"></td>'
      + '</tr>'
      + '<tr style="border: 1px solid black;">'
      + '<td style="background-color: whitesmoke; width: 35%; font-size: 10px;">'
      + 'Switch Arıza'
      + '</td>'
      + '<td id="pnlArzSW" class="popUpPanel" style="background-color: lime; width: 15%; border: 1px solid black;">'
      + '</td></tr>'


      + '<tr style="border: 2px solid black;">'
      + '<td colspan="4" style="text-align: center; background-color: lightgray;">Input/Output</td>'
      + '</tr>'
      + '<tr style="border: 1px solid black;">'
      + '<td style="background-color: whitesmoke; width: 35%; font-size: 10px;">'
      + 'Açık Sensör'
      + '</td>'
      + '<td id="pnlSimAcik" class="popUpPanel" style="background-color: lime; width: 15%; border: 1px solid black;">'

      + '</td>'
      + '<td style="background-color: whitesmoke; width: 35%; font-size: 10px;">'
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
  var a = '<table class="popupTabTable" style="margin:2px">'
      + '<tr style="border: 2px solid black;">'
      + '<td colspan="4" style="text-align: center; background-color: lightgray;">ALARM</td>'
      + '</tr>'
      + '<tr style="border: 1px solid black;">'
      + '<td style="background-color: whitesmoke; width: 35%; font-size: 10px;">'
      + 'Açma Arıza'
      + '</td>'
      + '<td id="pnlArzAcma" class="popUpPanel" style="background-color: lime; width: 15%; border: 1px solid black;">'
      + '</td>'
      + '<td style="background-color: whitesmoke; width: 35%; font-size: 10px;">'
      + 'Kapama Arıza'
      + '</td>'
      + '<td id="pnlArzKapama" class="popUpPanel" style="background-color: red; width: 15%; border: 1px solid black;"></td>'
      + '</tr>'
      + '<tr style="border: 1px solid black;">'
      + '<td style="background-color: whitesmoke; width: 35%; font-size: 10px;">'
      + 'Switch Arıza'
      + '</td>'
      + '<td id="pnlArzSW" class="popUpPanel" style="background-color: lime; width: 15%; border: 1px solid black;">'
      + '</td>'
      + '</tr > '
      + '<tr style="border: 2px solid black;">'
      + '<td colspan="4" style="text-align: center; background-color: lightgray;">Input/Output</td>'
      + '</tr>'
      + '<tr style="border: 1px solid black;">'
      + '<td style="background-color: whitesmoke; width: 35%; font-size: 10px;">'
      + 'Açık Sensör'
      + '</td>'
      + '<td id="pnlSimAcik" class="popUpPanel" style="background-color: lime; width: 15%; border: 1px solid black;">'
      + '</td>'
      + '<td style="background-color: whitesmoke; width: 35%; font-size: 10px;">'
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
  var a = '<table class="popupTabTable" style="margin:2px">'
      + '<tr style="border: 1px solid black;">'
      + '<td colspan="4" style="text-align: center; background-color: lightgray;">ALARM</td>'
      + '</tr>'
      + '<tr style="border: 1px solid black;">'
      + '<td style="background-color: whitesmoke; width: 35%; font-size: 10px;">'
      + 'Açma Arıza'
      + '</td>'
      + '<td id="pnlArzAcma" class="popUpPanel" style="background-color: lime; width: 15%; border: 1px solid black;">'
      + '</td>'
      + '<td style="background-color: whitesmoke; width: 35%; font-size: 10px;">'
      + 'Kapama Arıza'
      + '</td>'
      + '<td id="pnlArzKapama" class="popUpPanel" style="background-color: red; width: 15%; border: 1px solid black;"></td>'
      + '</tr>'
      + '<tr style="border: 1px solid black;">'
      + '<td style="background-color: whitesmoke; width: 35%; font-size: 10px;">'
      + 'Switch Arıza'
      + '</td>'
      + '<td id="pnlArzSW" class="popUpPanel" style="background-color: lime; width: 15%; border: 1px solid black;">'
      + '</td>'
      + '<td style="background-color: whitesmoke; width: 35%; font-size: 10px;">'
      + 'Orta Arıza'
      + '</td>'
      + '<td id="pnlArzOrta" class="popUpPanel" style="background-color: lime; width: 15%; border: 1px solid black;">'
      + '</td>'
      + '</tr > '
      + '<tr style="border: 2px solid black;">'
      + '<td colspan="4" style="text-align: center; background-color: lightgray; ">Input/Output</td>'
      + '</tr>'
      + '<tr style="border: 1px solid black;">'
      + '<td style="background-color: whitesmoke; width: 35%; font-size: 10px;">'
      + 'Açık Sensör'
      + '</td>'
      + '<td id="pnlSimAcik" class="popUpPanel" style="background-color: lime; width: 15%; border: 1px solid black;">'
      + '</td>'
      + '<td style="background-color: whitesmoke; width: 35%; font-size: 10px;">'
      + 'Kapalı Sensör'
      + '</td>'
      + '<td id="pnlSimKapali" class="popUpPanel" style="background-color: red; width: 15%; border: 1px solid black;"></td>'
      + '</tr>'

      + '</table>';
  return a;
}

function MotorButton_OnClick(myButton, AllItems, rootTag) {
  var aa = rootTag.replace(".IO", ".CNT");
  var plcVal;
  if (myButton.id === "btnMan") {
    if (Bit(ReadItemFromList(AllItems, rootTag), 8)) {
      plcVal = {
        Name : aa,
        Value : "21"
      };
      WriteToPlc(plcVal);
    }
    else{
      plcVal = {
        Name : aa,
        Value : "1"
      };
      WriteToPlc(plcVal);
    }
  }
  else if (myButton.id === "btnStart") {
      plcVal = {
        Name : aa,
        Value : "2"
      };
      WriteToPlc(plcVal);
  }
  else if (myButton.id === "btnStop") {
      plcVal = {
        Name : aa,
        Value : "22"
      };
      WriteToPlc(plcVal);
  }
  else if (myButton.id === "btnBakim") {
    if (Bit(ReadItemFromList(AllItems, rootTag), 11)) {
      plcVal = {
        Name : aa,
        Value : "24"
      };
      WriteToPlc(plcVal);
    }
    else {
      plcVal = {
        Name : aa,
        Value : "4"
      };
      WriteToPlc(plcVal);
    }
  }
  else if (myButton.id === "btnReset") {
    plcVal = {
      Name : aa,
      Value : "12"
    };
      WriteToPlc(plcVal);
  }
  else if (myButton.id === "btnDurusReset") {
    plcVal = {
      Name : aa,
      Value : "9"
    };
    WriteToPlc(plcVal);
    // chat.server.writeTag(aa, "9");
  }
}

function KlepeButton_OnClick(myButton, AllItems, rootTag) {
  var aa = rootTag.replace(".IO", ".CNT");
  var plcVal;
  if (myButton.id === "btnMan") {
    if (Bit(ReadItemFromList(AllItems, rootTag), 5)) {
      plcVal = {
        Name : aa,
        Value : "21"
      };
      WriteToPlc(plcVal);
    }
    else{
      plcVal = {
        Name : aa,
        Value : "1"
      };
      WriteToPlc(plcVal);
    }
  }
  else if (myButton.id === "btnStart") {
    plcVal = {
      Name : aa,
      Value : "2"
    };
    WriteToPlc(plcVal);
  }
  else if (myButton.id === "btnStop") {
    plcVal = {
      Name : aa,
      Value : "3"
    };
    WriteToPlc(plcVal);
  }
  else if (myButton.id === "btnReset") {
    plcVal = {
      Name : aa,
      Value : "12"
    };
    WriteToPlc(plcVal);
  }
}

function Klepe3YonButton_OnClick(myButton, AllItems, rootTag) {
  var aa = rootTag.replace(".IO", ".CNT");
  var plcVal;
  if (myButton.id === "btnMan") {
    if (Bit(ReadItemFromList(AllItems, rootTag), 5)) {
      plcVal = {
        Name : aa,
        Value : "21"
      };
      WriteToPlc(plcVal);
    }
    else {
      plcVal = {
        Name : aa,
        Value : "1"
      };
      WriteToPlc(plcVal);
    }
  }
  else if (myButton.id === "btnStart") {
    if (Bit(ReadItemFromList(AllItems, rootTag), 6)) {
      plcVal = {
        Name : aa,
        Value : "22"
      };
      WriteToPlc(plcVal);
    }
    else {
      plcVal = {
        Name : aa,
        Value : "2"
      };
      WriteToPlc(plcVal);
    }
  }
  else if (myButton.id === "btnStop") {
    if (Bit(ReadItemFromList(AllItems, rootTag), 7)) {
      plcVal = {
        Name : aa,
        Value : "23"
      };
      WriteToPlc(plcVal);
    }
    else {
      plcVal = {
        Name : aa,
        Value : "3"
      };
      WriteToPlc(plcVal);
    }
  }
  else if (myButton.id === "btnReset") {
    plcVal = {
      Name : aa,
      Value : "12"
    };
    WriteToPlc(plcVal);
  }
}

function Klepe2YonButton_OnClick(myButton, AllItems, rootTag) {
  var aa = rootTag.replace(".IO", ".CNT");
  if (myButton.id === "btnMan") {
    if (Bit(ReadItemFromList(AllItems, rootTag), 5)) {
      plcVal = {
        Name : aa,
        Value : "21"
      };
      WriteToPlc(plcVal);
    }
    else {
      plcVal = {
        Name : aa,
        Value : "1"
      };
      WriteToPlc(plcVal);
    }
  }
  else if (myButton.id === "btnStart") {
    plcVal = {
      Name : aa,
      Value : "2"
    };
    WriteToPlc(plcVal);
  }
  else if (myButton.id === "btnStop") {
    plcVal = {
      Name : aa,
      Value : "3"
    };
    WriteToPlc(plcVal);
  }
  else if (myButton.id === "btnReset") {
    plcVal = {
      Name : aa,
      Value : "12"
    };
    WriteToPlc(plcVal);
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
      console.log(bb.children[k]);
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
  for (var k = 0; k < klepe.children.length; k++) {
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

function checkKlepe2Yon(myVal, klepe) {
  if (Bit(myVal, 0)) {
    return changeKlepe2YonColor("limegreen", klepe, "sag");
  }
  else if(Bit(myVal, 1)){
    return changeKlepe2YonColor("limegreen", klepe, "sol");
  }
  else {
    return changeKlepe2YonColor("gray", klepe, "bos");
  }
}

function changeKlepe2YonColor(color, klepe, yon) {
  for (var k = 0; k < klepe.children.length; k++) {
    if (klepe.children[k].hasAttribute("willChange")) {
      if(yon==="sag" && klepe.children[k].getAttribute("id")==="klepesag"){
        klepe.children[k].setAttribute("style", `fill:${color}`);
      }
      else if(yon==="sol" && klepe.children[k].getAttribute("id")==="klepesol"){
        klepe.children[k].setAttribute("style", `fill:${color}`);
      }
      else {
        klepe.children[k].setAttribute("style", `fill:gray`);
      }
    }
  }
}

function changeKlepe2YonTag(tag, value) {
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

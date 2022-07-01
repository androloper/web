// let connection2 = new signalR.HubConnectionBuilder()
//     .withUrl("/signalr")
//     .build();
//
// function setCurrentValue(id, value) {
//   document.getElementById(id).textContent = value;
// }
//
// window.addEventListener("load", async function () {
//   await connection.start();
//   connection.stream(
//       "SubscribeNodeValueChanges",
//       "ns=2;s=Channel1.Device1.PLC01.K100.IO")
//       .subscribe({
//         next: (e) => {
//           setCurrentValue("value02", e);
//         },
//         complete: () => {
//           setCurrentValue("value02", "Subscription has been completed.");
//         },
//         error: (err) => {
//             console.log(err);
//         }
//       });
// });

//SignalR Configuration
const connection = new signalR.HubConnectionBuilder()
    .withUrl("http://192.168.1.122:9999/demoHub")
    .withAutomaticReconnect()
    .configureLogging(signalR.LogLevel.Information)
    .build();

async function startHubConn(){
  try{
    await connection.start();
    // connection.stream(
    //     "SubscribeNodeValueChanges",
    //     "ns=2;s=Channel1.Device1.PLC01.K114.IO")
    //     .subscribe({
    //       next: (e) => {
    //         const resp = JSON.parse(e);
    //         for(var i = 0; i<resp.length; i++){
    //           itemChange(resp[i].Name, resp[i].Value);
    //         }
    //         console.log(resp);
    //       },
    //       complete: () => {
    //         console.log("Completed");
    //       },
    //       error: (err) => {
    //         console.log(err);
    //       }
    //     });
  }
  catch (err) {
    console.log(err);
    setTimeout(startHubConn, 5000);
  }
}

connection.onclose(async () => {
  await startHubConn();
});

connection.on("ReceiveValues", (value) => {
  const resp = JSON.parse(value);
  for(var i = 0; i<resp.length; i++){
    itemChange(resp[i].Name, resp[i].Value);
  }
    //   if(values.length!=null || values.length===0) {
    //     values.push(resp);
    //   } else if(resp[i].Name === values[i].Name) {
    //     values[i].Value = resp[i].Value;
    //   }
    // }
  console.log(resp);
});


function startScada() {
  startHubConn();
  // changeMotorColors(color);
  // changeElevatorColor();
  // changeLineColor();
  // changeKlepeColor();
  // changeNumbers(10);
  // setInterval(itemChange, 300);
}

// var motorList = [];
// var kapakList = [];
// var elevatorList = [];

function itemChange(itemName, itemValue){
  const svg = document.getElementById("svg_obj").contentDocument;
  const layer1 = svg.getElementById("layer1");
  for (var i = 0; i < layer1.children.length; i++) {
    var aa = layer1.children;
    if(aa[i].hasAttribute("PlcTagName")){
      if (aa[i].getAttribute("PlcTagName") === itemName) {
        if (aa[i].getAttribute("tip") === "motor") {
            checkMotor(itemValue, aa[i]);
            checkMotorTag(aa[i],itemValue);
        }
        if (aa[i].getAttribute("tip") === "kapak") {
            checkKlepe(itemValue, aa[i]);
            checkKlepeTag(aa[i],itemValue);
        }
        if (aa[i].getAttribute("tip") === "elevator") {
            checkElevator(itemValue, aa[i]);
        }
      }
    }
  }
}

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

function checkMotor(myVal, motor) {
  if (Bit(myVal, 13)) {
    return changeMotorColor("red",motor);
  }
  else if (Bit(myVal, 1)) {
    return changeMotorColor("green",motor);
  }
  else if (Bit(myVal, 11)) {
    return changeMotorColor("orange",motor);
  }
  else
    return changeMotorColor("grey",motor);
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

function checkElevator(myVal, elevator) {
  if (Bit(myVal, 1)) {
    return changeElevatorColor("green", elevator);
  }
  else
    return changeElevatorColor("grey", elevator);
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
    return changeKlepeColor("green", klepe);
  }
  else {
    return changeKlepeColor("grey", klepe);
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

function checkLine(condition1, condition2) {

}

function changeLineColor() {
  const svg = document.getElementById("svg_obj").contentDocument;
  const layer1 = svg.getElementById("layer1");
  for (var i = 0; i < layer1.children.length; i++) {
    if (layer1.children[i].getAttribute("tip") === "line") {
      var aa = layer1.children[i];
      // aa.addEventListener("click", event => {
      //   $('#myModal').modal('show');
      //   console.log(event);
      //   document.getElementById('modalheadertext').innerText = event.path[1].attributes[0].textContent;
      //   document.getElementById('modalbodytext').innerText = event.path[1].children[1].attributes[2].textContent;
      // });
      for (var k = 0; k < aa.children.length; k++) {
        var bb = aa.children[k];
        if (bb.hasAttribute("willChange")) {
          bb.setAttribute("style", "fill:green");
        }
      }
    }
  }
}

function checkMotorTag(tag, value) {
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

function checkKlepeTag(tag, value) {
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

// function changeTagColor(color, myTag){
//   console.log(myTag.children.length-2);
//   if (myTag.children[myTag.children.length-2].hasAttribute("willChange")) {
//     myTag.children[myTag.children.length-2].setAttribute("style", `fill:${color};stroke:black;stroke-width:3`);
//   }
// }

// function changeMotorColors(color) {
//   const svg = document.getElementById("svg_obj").contentDocument;
//   const layer1 = svg.getElementById("layer1");
//   for (var i = 0; i < layer1.children.length; i++) {
//     // if (layer1.children[i].getAttribute("tagName") === "PLC01!M999.IO") {
//     // if (layer1.children[i].getAttribute("PlcTagName") === plctag) {
//       if (layer1.children[i].getAttribute("tip") === "motor") {
//         var aa = layer1.children[i];
//         aa.addEventListener("click", event => {
//           $('#myModal').modal('show');
//           document.getElementById('modalheadertext').innerText = event.path[1].attributes[0].textContent;
//           document.getElementById('modalbodytext').innerText = event.path[1].attributes[2].textContent;
//           // openModal(event);
//           console.log(event);
//           // alert('That worked');
//         });
//         for (var k = 0; k < aa.children.length; k++) {
//           // if (aa.children[k].hasAttribute("anime")) {
//           if (aa.children[k].hasAttribute("willChange")) {
//             aa.children[k].setAttribute("style", `fill:${color};stroke:black;stroke-width:2`);
//           }
//         }
//       }
//     // }
//   }
// }
//
// function changeNumbers(number) {
//   const svg = document.getElementById("svg_obj").contentDocument;
//   const layer1 = svg.getElementById("layer1");
//   for (var i = 0; i < layer1.children.length; i++) {
//     // if (layer1.children[i].getAttribute("tagName") === "PLC01!M999.IO") {
//     if (layer1.children[i].getAttribute("PlcTagName") !== "PLC01!M999.IO") {
//       var aa = layer1.children[i];
//       // aa.addEventListener("click", event => {
//       //   $('#myModal').modal('show');
//       //   document.getElementById('modalheadertext').innerText=event.path[1].attributes[0].textContent;
//       //   document.getElementById('modalbodytext').innerText=event.path[1].attributes[2].textContent;
//       //   // openModal(event);
//       //   console.log(event.path[1].attributes[2].textContent);
//       //   console.log(event);
//       //   // alert('That worked');
//       // });
//       for (var k = 0; k < aa.children.length; k++) {
//         if (aa.children[k].getAttribute("inkscape:label").startsWith("text1")) {
//           aa.children[k].setAttribute("style", "font-size:100");
//           aa.children[k].textContent = `${number}`;
//         }
//       }
//       // aa.children[i].setAttribute("onclick","openModal(layer1, i)");
//     }
//   }
// }
//
// function setColor() {
//   const randomColor = Math.floor(Math.random() * 16777215).toString(16);
//   changeMotorColor("#" + randomColor);
// }

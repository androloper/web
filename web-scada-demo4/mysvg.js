function changeColorful(color,number) {
  changeColors(color);
  changeElevatorColor();
  // changeNumbers(10);
  setInterval(setColor, 300);
}

function changeColors(color) {
  const svg = document.getElementById("svg_obj").contentDocument;
  const layer1 = svg.getElementById("layer1");
  for (var i = 0; i < layer1.children.length; i++) {
    // if (layer1.children[i].getAttribute("tagName") === "PLC01!M999.IO") {
    if (layer1.children[i].getAttribute("PlcTagName") !== "PLC01!M999.IO") {
      var aa = layer1.children[i];
      aa.addEventListener("click", event => {
        $('#myModal').modal('show');
        document.getElementById('modalheadertext').innerText=event.path[1].attributes[0].textContent;
        document.getElementById('modalbodytext').innerText=event.path[1].attributes[2].textContent;
        // openModal(event);
        console.log(event);
        // alert('That worked');
      });
      for (var k = 0; k < aa.children.length; k++) {
        // if (aa.children[k].hasAttribute("anime")) {
        if (aa.children[k].hasAttribute("willChange")) {
          aa.children[k].setAttribute("style", `fill:${color};stroke:black;stroke-width:2`);
        }
      }
    }
  }
}

function changeNumbers(number) {
  const svg = document.getElementById("svg_obj").contentDocument;
  const layer1 = svg.getElementById("layer1");
  for (var i = 0; i < layer1.children.length; i++) {
    // if (layer1.children[i].getAttribute("tagName") === "PLC01!M999.IO") {
    if (layer1.children[i].getAttribute("PlcTagName") !== "PLC01!M999.IO") {
      var aa = layer1.children[i];
      // aa.addEventListener("click", event => {
      //   $('#myModal').modal('show');
      //   document.getElementById('modalheadertext').innerText=event.path[1].attributes[0].textContent;
      //   document.getElementById('modalbodytext').innerText=event.path[1].attributes[2].textContent;
      //   // openModal(event);
      //   console.log(event.path[1].attributes[2].textContent);
      //   console.log(event);
      //   // alert('That worked');
      // });
      for (var k = 0; k < aa.children.length; k++) {
        if (aa.children[k].getAttribute("inkscape:label").startsWith("text1")) {
          aa.children[k].setAttribute("style", "font-size:100");
          aa.children[k].textContent = `${number}`;
        }
      }
      // aa.children[i].setAttribute("onclick","openModal(layer1, i)");
    }
  }
}

function setColor() {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  changeColors("#" + randomColor);
}

function changeElevatorColor() {
  const svg = document.getElementById("svg_obj").contentDocument;
  const layer1 = svg.getElementById("layer1");
  for (var i = 0; i < layer1.children.length; i++) {
    if (layer1.children[i].getAttribute("tip") === "elevator") {
      var aa = layer1.children[i];
      aa.addEventListener("click", event => {
        $('#myModal').modal('show');
        console.log(event);
        document.getElementById('modalheadertext').innerText = event.path[1].attributes[0].textContent;
        document.getElementById('modalbodytext').innerText = event.path[1].children[1].attributes[2].textContent;
      });
      for (var k = 0; k < aa.children.length; k++) {
        var bb=aa.children[k];
        bb.children[k].setAttribute("style", "fill:green");
        for(var j=0;j < bb.children.length; j++){
          var cc=bb.children[j];
          if (cc.hasAttribute("willChange")) {
            cc.setAttribute("style", "fill:green");
          }
        }

      }
    }
  }
}

function changeLineColor() {

}
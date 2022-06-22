const xlmns = "http://www.w3.org/2000/svg";
// const mysvg = document.getElementById("mysvg");
// function btnClick(color) {
//   // rect.setAttribute("x", "0");
//   // rect.setAttribute("y", "0");
//   // rect.setAttribute("width", "150");
//   // rect.setAttribute("height", "150");
//   rect.setAttribute("style", `fill:${color};stroke:black;stroke-width:2;opacity:0.7`);
//   mysvg.appendChild(rect);
// }
function changeColor(color) {
  const svg = document.getElementById("svg_obj").contentDocument;
  // document.getElementById("svg_obj").setAttribute("height", "95%");
  const ellipse205 = svg.getElementById("ellipse205");
  const path209 = svg.getElementById("path209");
  ellipse205.setAttribute("style",`fill:${color};stroke:green;stroke-width:2`);
  path209.setAttribute("style",`fill:${color};stroke:${color};stroke-width:2`);

}

function changeColorful(color) {
  changeColors(color);
  setInterval(setColor, 30);
  // document.getElementById("svg_obj").setAttribute("height", "90%");
}

function changeColors(color) {
  const svg = document.getElementById("svg_obj").contentDocument;
  const layer1 = svg.getElementById("layer1");
  for (var i = 0; i < layer1.children.length; i++) {
    // if (layer1.children[i].getAttribute("tagName") === "PLC01!M999.IO") {
    if (layer1.children[i].getAttribute("tagName") !== "PLC01!M999.IO") {
      var aa = layer1.children[i];
      for (var k = 0; k < aa.children.length; k++) {
        // if (aa.children[k].hasAttribute("anime")) {
        if (!aa.children[k].hasAttribute("anime")) {
          aa.children[k].setAttribute("style", `fill:${color};stroke:black;stroke-width:2`);
        }
        if(aa.children[k].getAttribute("id").startsWith("path199")){
          aa.children[k].setAttribute("style", "fill:black;stroke:black;stroke-width:2")
        }
        if(aa.children[k].getAttribute("id").startsWith("path201")){
          aa.children[k].setAttribute("style", "fill:white;stroke:black;stroke-width:2")
        }
        if(aa.children[k].getAttribute("id").startsWith("ellipse203")){
          aa.children[k].setAttribute("style", "fill:white;stroke:black;stroke-width:2")
        }
        if(aa.children[k].getAttribute("id").startsWith("ellipse205")){
          aa.children[k].setAttribute("style", "fill:green;stroke:black;stroke-width:2")
        }
        if(aa.children[k].getAttribute("id").startsWith("path207")){
          aa.children[k].setAttribute("style", "fill:white;stroke:black;stroke-width:2")
        }
        if(aa.children[k].getAttribute("id").startsWith("path209")){
          aa.children[k].setAttribute("style", "fill:green;stroke:black;stroke-width:2")
        }
        if(aa.children[k].getAttribute("id").startsWith("path213")){
          aa.children[k].setAttribute("style", "fill:green;stroke:black;stroke-width:2")
        }
        if(aa.children[k].getAttribute("id").startsWith("path215")){
          aa.children[k].setAttribute("style", "fill:blue;stroke:black;stroke-width:2")
        }
        if(aa.children[k].getAttribute("id").startsWith("path217")){
          aa.children[k].setAttribute("style", "fill:purple;stroke:black;stroke-width:2")
        }
        if(aa.children[k].getAttribute("id").startsWith("path219")){
          aa.children[k].setAttribute("style", "fill:pink;stroke:black;stroke-width:2")
        }
        if(aa.children[k].getAttribute("id").startsWith("ellipse221")){
          aa.children[k].setAttribute("style", "fill:white;stroke:black;stroke-width:2")
        }
        if(aa.children[k].getAttribute("id").startsWith("path223")){
          aa.children[k].setAttribute("style", "fill:black;stroke:black;stroke-width:2")
        }
        if(aa.children[k].getAttribute("id").startsWith("path225")){
          aa.children[k].setAttribute("style", "fill:black;stroke:black;stroke-width:2")
        }
        if(aa.children[k].getAttribute("id").startsWith("path227")){
          aa.children[k].setAttribute("style", "fill:black;stroke:black;stroke-width:2")
        }
        if(aa.children[k].getAttribute("id").startsWith("ellipse229")){
          aa.children[k].setAttribute("style", "fill:black;stroke:black;stroke-width:2")
        }
        if(aa.children[k].getAttribute("id").startsWith("ellipse231")){
          aa.children[k].setAttribute("style", "fill:white;stroke:black;stroke-width:2")
        }
        if(aa.children[k].getAttribute("id").startsWith("path233")){
          aa.children[k].setAttribute("style", "fill:black;stroke:black;stroke-width:2")
        }
        if(aa.children[k].getAttribute("id").startsWith("path235")){
          aa.children[k].setAttribute("style", "fill:black;stroke:black;stroke-width:2")
        }
        if(aa.children[k].getAttribute("id").startsWith("path237")){
          aa.children[k].setAttribute("style", "fill:black;stroke:black;stroke-width:2")
        }
        if(aa.children[k].getAttribute("id").startsWith("path239")){
          aa.children[k].setAttribute("style", "fill:white;stroke:black;stroke-width:2")
        }
        if(aa.children[k].getAttribute("id").startsWith("path243")){
          aa.children[k].setAttribute("style", "fill:black;stroke:black;stroke-width:2")
        }
        if(aa.children[k].getAttribute("id").startsWith("path245")){
          aa.children[k].setAttribute("style", "fill:black;stroke:black;stroke-width:2")
        }
        if(aa.children[k].getAttribute("id").startsWith("path247")){
          aa.children[k].setAttribute("style", "fill:black;stroke:black;stroke-width:2")
        }
        if(aa.children[k].getAttribute("id").startsWith("path249")){
          aa.children[k].setAttribute("style", "fill:black;stroke:black;stroke-width:2")
        }
      }
    }
  }
}

function setColor() {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  changeColors("#" + randomColor);
}

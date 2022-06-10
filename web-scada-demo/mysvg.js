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
  const ellipse205 = svg.getElementById("ellipse205");
  const path209 = svg.getElementById("path209");
  ellipse205.setAttribute("style",`fill:${color};stroke:green;stroke-width:2`);
  path209.setAttribute("style",`fill:${color};stroke:${color};stroke-width:2`);
}
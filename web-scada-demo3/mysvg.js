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
//
// function changeColor(color) {
//   const svg = document.getElementById("svg_obj").contentDocument;
//   // document.getElementById("svg_obj").setAttribute("height", "95%");
//   const ellipse205 = svg.getElementById("ellipse205");
//   const path209 = svg.getElementById("path209");
//   ellipse205.setAttribute("style",`fill:${color};stroke:green;stroke-width:2`);
//   path209.setAttribute("style",`fill:${color};stroke:${color};stroke-width:2`);
// }

function changeColorful(color,number) {
  changeColors(color);
  // changeNumbers(10);
  setInterval(setColor, 300);
  // setInterval(getRequest, 600);
  // document.getElementById("svg_obj").setAttribute("height", "90%");
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
        console.log(event.path[1].attributes[2].textContent);
        console.log(event);
        // alert('That worked');
      });
      for (var k = 0; k < aa.children.length; k++) {
        // if (aa.children[k].hasAttribute("anime")) {
        if (aa.children[k].hasAttribute("willChange")) {
          aa.children[k].setAttribute("style", `fill:${color};stroke:black;stroke-width:2`);
        }
        // for(var j=0; j<aa.children[k].children.length;j++) {
        //   if (aa.children[k].children[j].hasAttribute("willChange")) {
        //     aa.children[k].children[j].setAttribute("style", `fill:${color}`);
        //   }
        // }
        // if(aa.children[k].getAttribute("inkscape:label").startsWith("path197")){
        //   //motorun solundaki aktiflik alanının orta yüzeyi
        //   aa.children[k].setAttribute("style", "fill:black;stroke:black;stroke-width:2");
        // }
        // if(aa.children[k].getAttribute("inkscape:label").startsWith("path199")){
        //   //motorun solundaki aktiflik alanının en altı
        //   aa.children[k].setAttribute("style", "fill:black;stroke:black;stroke-width:2");
        // }
        // if(aa.children[k].getAttribute("inkscape:label").startsWith("path201")){
        //   //motorun solundaki aktiflik yuvarlağının üstündeki beyaz kısım
        //   aa.children[k].setAttribute("style", "fill:white;stroke:black;stroke-width:2");
        // }
        // //motorun solundaki aktiflik durumunu gösteren yuvarlak
        // if(aa.children[k].getAttribute("inkscape:label").startsWith("ellipse203")){
        //   //beyaz yüzey
        //   aa.children[k].setAttribute("style", "fill:white;stroke:black;stroke-width:2");
        // }
        // if(aa.children[k].getAttribute("inkscape:label").startsWith("ellipse205")){
        //   //renginin değişmesi gereken yer
        //   aa.children[k].setAttribute("style", "fill:green;stroke:black;stroke-width:2");
        // }
        // if(aa.children[k].getAttribute("inkscape:label").startsWith("path207")){
        //   //ortadaki beyaz kısım
        //   aa.children[k].setAttribute("style", "fill:white;stroke:black;stroke-width:2");
        // }
        // if(aa.children[k].getAttribute("inkscape:label").startsWith("path209")){
        //   //sağ tarafında birleşen yer
        //   aa.children[k].setAttribute("style", "fill:green;stroke:black;stroke-width:2");
        // }
        // // if(aa.children[k].getAttribute("inkscape:label").startsWith("path211")){
        // //   //motor yüzeyi
        // //   aa.children[k].setAttribute("style", `fill:${color};stroke:black;stroke-width:2`);
        // // }
        // //motor üstündeki 4 tane yamuk
        // if(aa.children[k].getAttribute("inkscape:label").startsWith("path213")){
        //   //en üstteki
        //   aa.children[k].setAttribute("style", "fill:green;stroke:black;stroke-width:2");
        // }
        // if(aa.children[k].getAttribute("inkscape:label").startsWith("path215")){
        //   //üstten ikinci
        //   aa.children[k].setAttribute("style", "fill:blue;stroke:black;stroke-width:2");
        // }
        // if(aa.children[k].getAttribute("inkscape:label").startsWith("path217")){
        //   //üstten üçüncü
        //   aa.children[k].setAttribute("style", "fill:purple;stroke:black;stroke-width:2");
        // }
        // if(aa.children[k].getAttribute("inkscape:label").startsWith("path219")){
        //   //en alttaki
        //   aa.children[k].setAttribute("style", "fill:pink;stroke:black;stroke-width:2");
        // }
        // if(aa.children[k].getAttribute("inkscape:label").startsWith("ellipse221")){
        //   //motor üstünde sağdaki beyaz yuvarlak
        //   aa.children[k].setAttribute("style", "fill:white;stroke:black;stroke-width:2");
        // }
        // if(aa.children[k].getAttribute("inkscape:label").startsWith("path223")){
        //   //motor üstünde sağdaki beyaz yuvarlak üzerindeki orta kalın çizgi
        //   aa.children[k].setAttribute("style", "fill:black;stroke:black;stroke-width:2");
        // }
        // if(aa.children[k].getAttribute("inkscape:label").startsWith("path225")){
        //   //motor üstünde sağdaki beyaz yuvarlak üzerindeki orta kalın çizginin üstündeki çizgi
        //   aa.children[k].setAttribute("style", "fill:black;stroke:black;stroke-width:2");
        // }
        // if(aa.children[k].getAttribute("inkscape:label").startsWith("path227")){
        //   //motor üstünde sağdaki beyaz yuvarlak üzerindeki çizgiler
        //   aa.children[k].setAttribute("style", "fill:black;stroke:black;stroke-width:2");
        // }
        // if(aa.children[k].getAttribute("inkscape:label").startsWith("ellipse229")){
        //   //üstteki yuvarlağın dışı
        //   aa.children[k].setAttribute("style", "fill:black;stroke:black;stroke-width:2");
        // }
        // if(aa.children[k].getAttribute("inkscape:label").startsWith("ellipse231")){
        //   //üstteki yuvarlağın içi
        //   aa.children[k].setAttribute("style", "fill:white;stroke:black;stroke-width:2");
        // }
        // if(aa.children[k].getAttribute("inkscape:label").startsWith("path233")){
        //   //üstteki yuvarlağın tutunduğu kısım
        //   aa.children[k].setAttribute("style", "fill:black;stroke:black;stroke-width:2");
        // }
        // if(aa.children[k].getAttribute("inkscape:label").startsWith("path235")){
        //   //alttaki siyah kısım
        //   aa.children[k].setAttribute("style", "fill:black;stroke:black;stroke-width:2");
        // }
        // if(aa.children[k].getAttribute("inkscape:label").startsWith("path237")){
        //   //alt sağdaki siyah uzun yer
        //   aa.children[k].setAttribute("style", "fill:black;stroke:black;stroke-width:2");
        // }
        // if(aa.children[k].getAttribute("inkscape:label").startsWith("path239")){
        //   //motorun sağında kalan beyaz kısım
        //   aa.children[k].setAttribute("style", "fill:white;stroke:black;stroke-width:2");
        // }
        // // if(aa.children[k].getAttribute("inkscape:label").startsWith("path241")){
        // //   //motorun sağında kalan renkli kısım
        // //   aa.children[k].setAttribute("style", `fill:${color};stroke:black;stroke-width:2`);
        // // }
        // // pivotu tutan kısım
        // if(aa.children[k].getAttribute("inkscape:label").startsWith("path243")){
        //   //en alt kısmı
        //   aa.children[k].setAttribute("style", "fill:black;stroke:black;stroke-width:2");
        // }
        // if(aa.children[k].getAttribute("inkscape:label").startsWith("path245")){
        //   //bir üst kısmı
        //   aa.children[k].setAttribute("style", "fill:black;stroke:black;stroke-width:2");
        // }
        // if(aa.children[k].getAttribute("inkscape:label").startsWith("path247")){
        //   //bir üstün ortası
        //   aa.children[k].setAttribute("style", "fill:black;stroke:black;stroke-width:2");
        // }
        // if(aa.children[k].getAttribute("inkscape:label").startsWith("path249")){
        //   //en üst kısmı geniş yüzeyli kısım
        //   aa.children[k].setAttribute("style", "fill:white;stroke:black;stroke-width:2");
        // }
        // //yüzey üzerindeki çizgiler
        // if(aa.children[k].getAttribute("inkscape:label").startsWith("path251")){
        //   aa.children[k].setAttribute("style", "fill:black;stroke:black;stroke-width:2");
        // }
        // if(aa.children[k].getAttribute("inkscape:label").startsWith("path253")){
        //   aa.children[k].setAttribute("style","fill:black;stroke:black;stroke-width:2");
        // }
        // if(aa.children[k].getAttribute("inkscape:label").startsWith("path255")){
        //   aa.children[k].setAttribute("style","fill:black;stroke:black;stroke-width:2");
        // }
        // if(aa.children[k].getAttribute("inkscape:label").startsWith("path257")){
        //   aa.children[k].setAttribute("style","fill:black;stroke:black;stroke-width:2");
        // }
        // if(aa.children[k].getAttribute("inkscape:label").startsWith("path259")){
        //   aa.children[k].setAttribute("style","fill:black;stroke:black;stroke-width:2");
        // }
        // if(aa.children[k].getAttribute("inkscape:label").startsWith("path261")){
        //   aa.children[k].setAttribute("style","fill:black;stroke:black;stroke-width:2");
        // }
        // if(aa.children[k].getAttribute("inkscape:label").startsWith("path263")){
        //   aa.children[k].setAttribute("style","fill:black;stroke:black;stroke-width:2");
        // }
        // if(aa.children[k].getAttribute("inkscape:label").startsWith("path265")){
        //   aa.children[k].setAttribute("style","fill:black;stroke:black;stroke-width:2");
        // }
        // if(aa.children[k].getAttribute("inkscape:label").startsWith("path267")){
        //   aa.children[k].setAttribute("style","fill:black;stroke:black;stroke-width:2");
        // }
        // if(aa.children[k].getAttribute("inkscape:label").startsWith("path269")){
        //   aa.children[k].setAttribute("style","fill:black;stroke:black;stroke-width:2");
        // }
        // if(aa.children[k].getAttribute("inkscape:label").startsWith("path271")){
        //   aa.children[k].setAttribute("style","fill:black;stroke:black;stroke-width:2");
        // }
        // if(aa.children[k].getAttribute("inkscape:label").startsWith("path273")){
        //   aa.children[k].setAttribute("style","fill:black;stroke:black;stroke-width:2");
        // }
        // if (aa.children[k].getAttribute("inkscape:label").startsWith("text1")) {
        //   aa.children[k].setAttribute("style","font-size:100");
        //   aa.children[k].textContent=`${randomNumberGenerator()}`;
        //   // aa.children[k].textContent=`${setInterval(randomNumberGenerator(), 600)}`;
        //   // document.getElementById(`${resp[i].Name}`).innerHTML=`${Number.parseFloat(resp[i].Value.replace(',', '.')).toFixed(2)}°C`;
        //   // document.getElementById(`${resp[i].Name}t`).innerText=`${formatDate(Date.now(),'dd/MM/yyyy HH:mm:ss', 'en', 'tr')}`;
        // }
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

function openModal(event){
  // $('#myModal').on('show.bs.modal', function (e) {
  //   $('#myModal.show').each(function (index) {
  //     $(this).css('z-index', 1101 + index * 2);
  //     $('.modal-body').textContent = event.path[1].attributes[2].textContent;
  //   });
  //   $('.modal-backdrop').each(function (index) {
  //     $(this).css('z-index', 1101 + index * 2 - 1);
  //   });
  // });
  // var cCc = event.srcElement;
  alert("That worked!");
}

function randomNumberGenerator() {
  const rand =  Math.floor(Math.random()*100).toString();
  changeNumbers(rand);
}

function setColor() {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  changeColors("#" + randomColor);
}

function getRequest() {
  const xhr = new XMLHttpRequest();
  xhr.open("GET","https://raw.githubusercontent.com/androloper/jsons/main/olympic-winners.json")
  xhr.send();
  xhr.onload = function () {
    if(xhr.status === 200) {
      var data = JSON.parse(xhr.responseText);
      // console.log('burasi '+data[0].age);
      var i=Math.floor(Math.random()*100).toString();
      var res = data[i].age;
      changeNumbers(res);
    } else
      console.log("No records found");
  }

  // // var connection = new ActiveXObject("ADODB.Connection");
  // var connection = new ActiveXObject("SQLOLEDB.Connection"); //alternative
  // // var connectionString="Data Source=.;Initial Catalog=MASTER_DB;User ID=sa;Password=123456;Trusted_Connection=False;TrustServerCertificate=True";
  // var connectionString="Data Source=.;Initial Catalog=MASTER_DB;User ID=sa;Password=123456;Trusted_Connection=False;TrustServerCertificate=True;Provider=SQLOLEDB"; //alternative
  // connection.open(connectionString);
  // // var rs = new ActiveXObject("ADODB.Recordset");
  // var rs = new ActiveXObject("SQLOLEDB.Recordset"); //alternative
  // var query = "SELECT * FROM Tbl1";
  // rs.open(query, connection);
  // rs.moveFirst;
  // rs.close;
  // connection.close;

}

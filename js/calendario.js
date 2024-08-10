var homeText = document.getElementById("homeText");
if (homeText) {
  homeText.addEventListener("click", function (e) {
    window.location.href = "./index.html";
  });
}

var frameContainer1 = document.getElementById("frameContainer1");
if (frameContainer1) {
  frameContainer1.addEventListener("click", function (e) {
    window.location.href = "./calendario.html";
  });
}
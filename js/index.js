var frameContainer1 = document.getElementById("frameContainer1");
if (frameContainer1) {
  frameContainer1.addEventListener("click", function (e) {
    window.location.href = "./calendario.html";
  });
}

var logOutText = document.getElementById("logOutText");
if (logOutText) {
  logOutText.addEventListener("click", function (e) {
    window.location.href = "./log-in.html";
  });
}

var frameContainer2 = document.getElementById("frameContainer2");
if (frameContainer2) {
  frameContainer2.addEventListener("click", function (e) {
    window.location.href = "./log-in.html";
  });
}
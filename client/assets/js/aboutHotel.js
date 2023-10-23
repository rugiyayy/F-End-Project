
// ! scroll


window.addEventListener("scroll", function () {
    var header = document.getElementById("header");
    var navA = document.querySelectorAll(".nav-a");
    var notSuper = document.querySelector(".notSuper");
    var gradient = document.getElementById("paint0_linear_1_1292");
  
    if (window.scrollY >= 200) {
      header.style.backgroundColor = "#15436e";
      notSuper.style.color = "white";
      gradient.children[0].setAttribute("stop-color", "white");
      gradient.children[1].setAttribute("stop-color", "white");
      navA.forEach(function (link) {
        link.style.color = "white";
      });
    } else {
      header.style.backgroundColor = "white";
      notSuper.style.color = "#1262af";
  
      gradient.children[0].setAttribute("stop-color", "#299BD8");
      gradient.children[1].setAttribute("stop-color", "#1262AF");
      navA.forEach(function (link) {
        link.style.color = "#1262af";
      });
    }
  });

// ! nav 

let respMenu = document.querySelector(".menu-responsiv");
let nav = document.querySelector(".nav");

respMenu.addEventListener("click", function() {
  if (nav.style.display === "block") {
    nav.style.display = "none";
    console.log(nav);
} else {
    nav.style.display = "block";
    console.log(nav);

}
});
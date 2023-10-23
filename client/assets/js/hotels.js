let hotelsContainer = document.querySelector(".hotel-row");

let recommendedFilt = document.querySelector(".recommended-filt");
let ratingFilt = document.querySelector(".rating-filt");
let priceFilt = document.querySelector(".price-filt");

let resultQuantity = document.querySelector(".result-quantity");

document.addEventListener("DOMContentLoaded", function () {
  ListHotels();
  setup();
  // ! //////////////
});

let myPort = 4000;

async function ListHotels() {
  try {
    let responce = await fetch(`http://localhost:${myPort}/hotels`);

    if (!responce.ok) {
      throw new Error("There is no hotel");
    }
    let data = await responce.json();

    if (Array.isArray(data) && data) {
      // ! //

      hotelsContainer.innerHTML = "";
      data.forEach((hotels) => {
        Show(hotels);
        resultQuantity.innerHTML = data.length;
      });

      // ! //

      let activeButton = null; //dla proverki av=ctive classa

      let isFiltered = false;
      recommendedFilt.addEventListener("click", function () {
        toggleActiveClass(recommendedFilt);
        if (isFiltered) {
          hotelsContainer.innerHTML = "";
          data.forEach((hotels) => {
            Show(hotels);
          });
          resultQuantity.innerHTML = data.length;
          isFiltered = false;
          recommendedFilt.classList.remove("active");
        } else {
          let filteredData = [...data].sort((x, y) => {
            return y.review.comments - x.review.comments;
          });
          hotelsContainer.innerHTML = "";
          filteredData.forEach((hotels) => {
            Show(hotels);
          });
          resultQuantity.innerHTML = filteredData.length;
          isFiltered = true;
        }
      });

      // ! //

      let isSortedByRate = false;
      ratingFilt.addEventListener("click", function () {
        toggleActiveClass(ratingFilt);
        if (isSortedByRate) {
          hotelsContainer.innerHTML = "";
          data.forEach((hotels) => {
            Show(hotels);
          });
          resultQuantity.innerHTML = data.length;
          isSortedByRate = false;
          ratingFilt.classList.remove("active");
        } else {
          let filteredData = [...data].sort((x, y) => {
            return y.review.stars - x.review.stars;
          });
          hotelsContainer.innerHTML = "";
          filteredData.forEach((hotels) => {
            Show(hotels);
          });
          resultQuantity.innerHTML = filteredData.length;
          isSortedByRate = true;
        }
      });

      // ! //
      let isSortedByPrice = false;
      priceFilt.addEventListener("click", function () {
        toggleActiveClass(priceFilt);
        if (isSortedByPrice) {
          hotelsContainer.innerHTML = "";
          data.forEach((hotels) => {
            Show(hotels);
          });
          resultQuantity.innerHTML = data.length;
          isSortedByPrice = false;
          priceFilt.classList.remove("active");
        } else {
          let filteredData = [...data].sort((x, y) => {
            // created the copy =[...data]
            return y.price.amount - x.price.amount;
          });
          hotelsContainer.innerHTML = "";
          filteredData.forEach((hotels) => {
            Show(hotels);
          });
          resultQuantity.innerHTML = filteredData.length;
          isSortedByPrice = true;
        }
      });
    }
  } catch (error) {
    // alert(error);
  }
}

function Show(hotels) {
  hotelsContainer.innerHTML += `<div id="hotel${hotels.id}" class="hotel-card">
        <img src="${hotels.img}" alt="" />
        <div class="hotel-card-details">
          <span class="room-type">${hotels.type}</span>
          <h4 class="hotel-name">${hotels.title}...</h4>
          <p class="reviews">
            <i class="fa-solid fa-star"></i
            ><span class="review-overall">${hotels.review.stars}</span>(${hotels.review.comments} reviews)
          </p>
  
          <p class="room-price">${hotels.price.currency} ${hotels.price.amount}<span>/night</span></p>
          <p class="iconAndMore" ><i  id="${hotels.id}" class="fa-solid fa-heart"></i> <a href="./aboutHotel.html">View Details</a></p>
        </div>
      </div>`;
}

function toggleActiveClass(button) {
  let activeButton = document.querySelector(".active");
  if (activeButton) {
    activeButton.classList.remove("active");
  }
  button.classList.add("active");
}


// ! //////// WISHLIST

let wishlist = [];
let notifIcon = document.querySelector(".notification .fa-heart");
let wishlistFixed = document.querySelector("#wishlist");

let notificationCount = document.querySelector(".notSuper");

function setup() {
  let heartIcon = document.querySelectorAll(".hotel-card-details .fa-heart");
  for (let i = 0; i < heartIcon.length; i++) {
    heartIcon[i].addEventListener("click", function (e) {
      let hotelId = e.target.getAttribute("id");
      if (wishlist.includes(hotelId)) {
        removeItem(hotelId);
        e.target.style.color = "red";
      } else {
        addItem(e);
        e.target.style.color = "rgb(160, 23, 23)";
      }
    });
  }
}

function addItem(e) {
  let hotelId = e.target.getAttribute("id");
  if (!wishlist.find((element) => element === hotelId)) {
    let hotelDiv = document.getElementById("hotel" + hotelId);

    let wishDiv = document.createElement("div");
    wishDiv.setAttribute("id", "wish" + hotelId);
    wishDiv.setAttribute("class", "hotell");
    let clonedContent = hotelDiv.cloneNode(true);

    let heartIcon = clonedContent.querySelector(".fa-heart");
    if (heartIcon) {
      heartIcon.remove();
    }

    wishDiv.appendChild(clonedContent);

    let removeBtn = document.createElement("input");
    removeBtn.setAttribute("id", "remove" + hotelId);
    removeBtn.setAttribute("type", "button");
    removeBtn.setAttribute("value", "Remove");
    removeBtn.addEventListener("click", () => removeItem(hotelId));
    wishDiv.appendChild(removeBtn);

    let aside = document.getElementById("wishlist");
    aside.appendChild(wishDiv);

    wishlist.push(hotelId);

    if (wishlist.length !== 0) {
      let emptyMessage = document.getElementById("emptyMessage");
      emptyMessage.style.display = "none";
    }

    let count = 0;
    count = wishlist.length;
    console.log(count);
    notificationCount.innerHTML = count;
    // console.log(notificationCount);
  }
}
function removeItem(hotelId) {
  let wishDiv = document.getElementById("wish" + hotelId);
  if (wishDiv) {
    wishDiv.remove();
    wishlist = wishlist.filter((element) => element !== hotelId);

    if (wishlist.length === 0) {
      // Если не осталось, отображаем параграф "EMPTY"
      let emptyMessage = document.getElementById("emptyMessage");
      emptyMessage.style.display = "block";
    }

    let count;
    count = wishlist.length;
    notificationCount.innerHTML = count;
    console.log(notificationCount);

    let heartIcons = document.querySelectorAll(".hotel-card-details .fa-heart");
    for (let i = 0; i < heartIcons.length; i++) {
      let heartIconId = heartIcons[i].getAttribute("id");
      if (!wishlist.includes(heartIconId)) {
        heartIcons[i].style.color = "red";
      }
    }
  }
}

window.addEventListener("load", setup);



notifIcon.addEventListener("click", function () {
  if (wishlistFixed.style.display === "block") {
    wishlistFixed.style.display = "none";
  } else {
    wishlistFixed.style.display = "block";
  }
});

let closeWlist = document.querySelector("#wishlist .fa-xmark");

closeWlist.addEventListener("click", function () {
  if (wishlistFixed.style.display === "block") {
    wishlistFixed.style.display = "none";
  } else {
    wishlistFixed.style.display = "block";
  }
});


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
} else {
    nav.style.display = "block";
}
});
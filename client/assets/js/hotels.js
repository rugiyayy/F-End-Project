let hotelsContainer = document.querySelector(".hotel-row");

let recommendedFilt = document.querySelector(".recommended-filt");
let ratingFilt = document.querySelector(".rating-filt");
let priceFilt = document.querySelector(".price-filt");

let resultQuantity = document.querySelector(".result-quantity");

document.addEventListener("DOMContentLoaded", function () {
  ListHotels();
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
    alert(error);
  }
}

function Show(hotels) {
  hotelsContainer.innerHTML += `<div class="hotel-card">
        <img src="${hotels.img}" alt="" />
        <div class="hotel-card-details">
          <span class="room-type">${hotels.type}</span>
          <h4 class="hotel-name">${hotels.title}...</h4>
          <i class="fa-solid fa-heart"></i>
          <p class="reviews">
            <i class="fa-solid fa-star"></i
            ><span class="review-overall">${hotels.review.stars}</span>(${hotels.review.comments} reviews)
          </p>
  
          <p class="room-price">${hotels.price.currency} ${hotels.price.amount}<span>/night</span></p>
          <a href="">View Details</a>
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

let cityContainer = document.querySelector(".destinations-row");

let holidaysContainer = document.querySelector(".holidays-row");

let hotelsPopContainer = document.querySelector(".hotels-row");

document.addEventListener("DOMContentLoaded", function () {
  ListCities();

  ListHolidays();

  ListHotelsPop();
});

let myUrl = "http://localhost:4000";

async function ListCities() {
  try {
    // fetch - sending request
    // data -atilan requestden responce gelir ve hemin responce-ni cheviririk JSONA -ibo eto promise
    let responce = await fetch(`${myUrl}/cities`);
    let data = await responce.json();

    if (!responce.ok) {
      throw new Error("There is no city");
    }
    if (Array.isArray(data) && data) {
      cityContainer.innerHTML = "";
      data.forEach((city) => {
        cityContainer.innerHTML += `<div class="destination-box">
        <div class="destionation-details">
        <span class="city">${city.title}</span>
        <span class="span_from" >FROM</span>
        <span class="price">$${city.price}</span>
        </div>
        <img src="${city.img}" alt="">
    </div>`;
      });
    }
  } catch (error) {
    alert(error);
  }
}

//cors- yuklemesek 5502den icaze verilmeyyeck ( s 5502 mi posilaem request na 4000 port , nujno dt razreshenie)

async function ListHolidays() {
  try {
    let responce = await fetch(`${myUrl}/holidays`);
    let data = await responce.json();

    if (!responce.ok) {
      throw new Error("There is no place");
    }
    if (Array.isArray(data) && data) {
      holidaysContainer.innerHTML = "";
      data.forEach((holidays) => {
        holidaysContainer.innerHTML += ` <div class="holiday-box">
            <img src="${holidays.img}" alt="">
            <div class="holiday-details">
           <div class="holiday-city-dateils">
            <span class="city">${holidays.title}</span>
            <span class="span_code" >${holidays.code}</span>
           </div>
            <span class="price">$${holidays.price}</span>
            </div>
        </div>`;
      });
    }
  } catch (error) {
    alert(error);
  }
}

async function ListHotelsPop() {
  try {
    let responce = await fetch(`${myUrl}/hotels/popular`);
    let data = await responce.json();

    if (!responce.ok) {
      throw new Error("There is no hotel");
    }
    if (Array.isArray(data) && data) {
      hotelsPopContainer.innerHTML = "";
      data.forEach((hotels) => {
        hotelsPopContainer.innerHTML += ` <div class="hotels-card">
          <img src="${hotels.img}" alt="">

          <div class="stay-details">

              <div class="hotel-details">
                  <span class="room-type">${hotels.type}</span>
                  <span class="suite" >${hotels.title}</span>
                  <span class="price">${hotels.price.currency}${hotels.price.amount}/night</span>
                </div>

          <div class="rating-details">
              <span class="rating"><i class="fa-solid fa-star"></i>${hotels.review.stars}</span>
              <span class="review">(${hotels.review.comments} reviews)</span>
          </div>
          <button class="btn-hotel-dtl">MORE DETAILS</button>
          </div>
      </div>`;
      });
    }
  } catch (error) {
    alert(error);
  }
}

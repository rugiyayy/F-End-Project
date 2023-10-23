let searchForm = document.querySelector(".search-details-form");

let flightRow = document.querySelector(".flight-res");

document.addEventListener("DOMContentLoaded", async function () {
  let urlParams = new URLSearchParams(window.location.search);
  let depInp = urlParams.get("departure");
  let arrivalInp = urlParams.get("arrival");
  let dateInp = urlParams.get("date");
  console.log(urlParams.get("arrival"));

  let from= searchForm.elements["departure"]
  from.value = depInp;
  let to=searchForm.elements["arrival"]
  to.value = arrivalInp;
  searchForm.elements["date"].value = dateInp;



  

  //   !   \\ api

  //   fetch("http://localhost:4000/flights")
  //     .then((x) => x.json())
  //     .then((data) => console.log(data.OTA_AirDetailsRS));
  //  from = "TR";
  //  to = "AZ";

  
  // yoxladigim olkeler 
 /* let from = "TR";
  let to = "AZ";
  20231125



 let from = "TR";
  let to = "GE";
  20231025
  
  
  */



  fetch("http://localhost:4000/codes")
    .then((x) => x.json())
    .then((data) => {
      let fromCode = data.Airports.Airport.find((x) => x.$.Country === from.value).$
        .IATACode;
      let toCode = data.Airports.Airport.find((x) => x.$.Country === to.value).$
        .IATACode;
      return { fromCode, toCode };
    })
    .then(({ fromCode, toCode }) =>
      fetch(`http://localhost:4000/flights?from=${fromCode}&to=${toCode}`)
        .then((x) => x.json())
        .then((data) => {
          data.OTA_AirDetailsRS.FlightDetails.forEach((flight, i) => {
            // let flightCard = document.createElement("div");
            // let flightResRow = document.querySelector(".flight-res")

            // flightCard.classList.add("flight-card-row");
            flightRow.innerHTML += `
      <div class="flight-row">
            <div class="flight-card-row">
            <div class="airport-details">
              <svg
                class="a-logo"
                width="35"
                height="46"
                viewBox="0 0 35 46"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M17.3841 8.0842C8.77562 8.0842 1.73065 15.2875 1.73065 24.2577C1.73065 33.2272 8.77625 40.4299 17.3841 40.4299C25.9912 40.4299 33.0362 33.2273 33.0362 24.2577C33.0362 15.2875 25.9905 8.0842 17.3841 8.0842ZM0.17688 24.2577C0.17688 14.5245 7.84162 6.5647 17.3841 6.5647C26.9245 6.5647 34.5899 14.5245 34.5899 24.2577C34.5899 33.9903 26.9252 41.9494 17.3841 41.9494C7.84241 41.9494 0.17688 33.9904 0.17688 24.2577Z"
                  fill="#CF4037"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M22.3444 20.545C21.5874 15.2975 17.164 12.7065 14.4009 11.1543C11.8366 9.71468 9.54073 9.06049 9.48534 9.22924C12.4019 11.5745 14.2745 15.2281 14.2745 19.3331C14.2745 26.0646 9.23537 31.5836 2.83353 32.0989L3.23831 32.7239C11.434 31.4475 33.3664 27.3758 33.3664 27.3758L33.4246 26.8973L20.1182 26.4417C21.5867 24.8896 22.5923 22.2547 22.3444 20.545Z"
                  fill="#CF4037"
                />
              </svg>
              <span class="airport"> Turkish Airlines </span>
            </div>

            <div class="flight-details">
              <div class="deparutre-details">
                <span class="dep-time">${data.OTA_AirDetailsRS.FlightDetails[
                  i
                ].$.FLSDepartureDateTime.slice(11, 16)}</span>
                <p class="dep-country">${
                  data.OTA_AirDetailsRS.FlightDetails[i].$.FLSDepartureName.replace("Airport", "")
                }</p>
              </div>
            </div>

            <div class="flight-duration">
              <div class="destination-icons">
                <svg
                  class="circle left"
                  width="11"
                  height="11"
                  viewBox="0 0 11 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    id="Ellipse 18"
                    cx="5.30197"
                    cy="5.33154"
                    r="4"
                    fill="white"
                    stroke="#1262AE"
                    stroke-width="2"
                  />
                </svg>

                <svg
                  class="line"
                  width="104"
                  height="2"
                  viewBox="0 0 104 2"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line
                    x1="0.0431824"
                    y1="0.831543"
                    x2="103.595"
                    y2="0.831552"
                    stroke="#CCCCCC"
                    stroke-dasharray="3 3"
                  />
                </svg>

                <svg
                  class="plane"
                  xmlns="http://www.w3.org/2000/svg"
                  width="27"
                  height="24"
                  viewBox="0 0 27 24"
                  fill="none"
                >
                  <g clip-path="url(#clip0_1_1373)">
                    <path
                      d="M9.62342 21.75H8.25799C8.12079 21.75 7.98579 21.7185 7.86534 21.6585C7.74488 21.5984 7.64282 21.5118 7.56848 21.4064C7.49414 21.301 7.44989 21.1803 7.43979 21.0552C7.42968 20.9302 7.45404 20.8048 7.51064 20.6906L10.817 14.0227L5.85231 13.9219L4.04165 15.9267C3.69644 16.3233 3.42099 16.5 2.71827 16.5H1.79909C1.65355 16.5043 1.50903 16.4764 1.37777 16.4188C1.24652 16.3612 1.13239 16.2755 1.04507 16.1691C0.922989 16.0186 0.802962 15.7636 0.919912 15.3998L1.93655 12.0717C1.94425 12.0469 1.95348 12.022 1.96374 11.9977C1.96425 11.9953 1.96425 11.9929 1.96374 11.9906C1.95315 11.9663 1.94407 11.9414 1.93655 11.9161L0.918886 8.56687C0.808605 8.21016 0.929145 7.96078 1.0502 7.81406C1.13149 7.71549 1.23695 7.63573 1.35811 7.58118C1.47926 7.52664 1.61274 7.49883 1.74779 7.5H2.71827C3.243 7.5 3.75235 7.71516 4.0519 8.0625L5.82513 10.0336L10.817 9.96609L7.51166 3.30984C7.45499 3.19568 7.43054 3.07036 7.44054 2.94533C7.45054 2.8203 7.49467 2.69956 7.56891 2.59414C7.64314 2.48872 7.74511 2.40198 7.86548 2.34186C7.98586 2.28175 8.12081 2.25016 8.25799 2.25H9.6383C9.83087 2.25354 10.0201 2.29667 10.1919 2.3762C10.3637 2.45572 10.5138 2.5696 10.6308 2.70937L17.0451 9.83438L20.0083 9.76312C20.2253 9.75234 20.8265 9.74859 20.9655 9.74859C23.8 9.75 25.4927 10.5909 25.4927 12C25.4927 12.4434 25.2988 13.2656 24.0016 13.7887C23.2357 14.0981 22.214 14.2547 20.9645 14.2547C20.827 14.2547 20.2274 14.2509 20.0073 14.2402L17.0446 14.168L10.6144 21.293C10.4973 21.4321 10.3474 21.5454 10.1758 21.6246C10.0043 21.7037 9.81552 21.7465 9.62342 21.75Z"
                      fill="#1262AE"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1_1373">
                      <rect
                        width="26.2624"
                        height="24"
                        fill="white"
                        transform="translate(0.0509949)"
                      />
                    </clipPath>
                  </defs>
                </svg>

                <svg
                  class="circle right"
                  width="11"
                  height="11"
                  viewBox="0 0 11 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    id="Ellipse 18"
                    cx="5.30197"
                    cy="5.33154"
                    r="4"
                    fill="white"
                    stroke="#1262AE"
                    stroke-width="2"
                  />
                </svg>
              </div>
              <div class="duration">
                <p><span>${
                  data.OTA_AirDetailsRS.FlightDetails[i].$.TotalTripTime.replace("PT", "")
                },</span><span>${
              data.OTA_AirDetailsRS.FlightDetails[i].$.FLSFlightLegs
            } stop</span></p>
              </div>
            </div>

            <div class="arrival-details">
              <span class="arrival-time">${data.OTA_AirDetailsRS.FlightDetails[
                i
              ].$.FLSArrivalDateTime.slice(11, 16)}</span>
              <p class="arrival-country">${
                data.OTA_AirDetailsRS.FlightDetails[i].$.FLSArrivalName.replace("Airport", "")
              }</p>
            </div>
          </div>

          <span class="price">$723</span>
          </div>

      `;
            // flightResRow.appendChild(flightRow);

            //bular resultin ustundekilerdiler
            let numOfRes = document.querySelector(".number_of_results-center");
            let allRes = document.querySelector(".all-res");

            numOfRes.innerHTML = "";
            allRes.innerHTML = "";
            let allresults = (allRes.innerHTML +=
              data.OTA_AirDetailsRS.FlightDetails.length);
            numOfRes.innerHTML += `${data.OTA_AirDetailsRS.FlightDetails.length} out  ${allresults}`;


            // bular filtersin usutndekiler uchun
          });

          console.log(
            "Departure CITY " +
              data.OTA_AirDetailsRS.FlightDetails[0].$.FLSDepartureName
          );
          console.log(
            "Arrival CITY " +
              data.OTA_AirDetailsRS.FlightDetails[0].$.FLSArrivalName
          );
          console.log(
            "Departure TIME " +
              data.OTA_AirDetailsRS.FlightDetails[0].$.FLSDepartureDateTime
          );
          console.log(
            "Arrival TIME " +
              data.OTA_AirDetailsRS.FlightDetails[0].$.FLSArrivalDateTime
          );

          console.log(
            "Trip duration TIME " +
              data.OTA_AirDetailsRS.FlightDetails[0].$.TotalTripTime
          );
          console.log(
            "stop: " + data.OTA_AirDetailsRS.FlightDetails[0].$.FLSFlightLegs
          );
          console.log(data.OTA_AirDetailsRS);
        })
    );
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
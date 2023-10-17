import express from "express";
import cors from "cors";

import { DHotels, DHotelsPopular } from "./data/hotels.js";
import { DHolidays } from "./data/holidays.js";
import { DCities } from "./data/cities.js";
/// for using express we need to call it :

let app = express();
//  cors-i middleware kimi elave edirik ( frontdan requesti bir basha backend-e gondermirik , ortada middleware , front ora gedir , uje ordan backend-e kechir...DCities. use edib corsdan icaze alib get edir)
app.use(cors(["http://localhost:5502"]));

app.get("/hotels", function (_, resp) {
  //request - frontdan aldigimiz , biz request istifade etmeyeceik deye _ yaziriq
  // responce- fronta gonderdiyimizdir

  // responce.send("<h1>helloo</h1>") -like an example, no mi ne xotim text potomu i napishem json ibo xotim object otpravit

  resp.json(DHotels).status(200);
});

app.get("/hotels/popular", function (_, resp) {
  resp.json(DHotelsPopular).status(200); // dva endPonits - ibo v odnom 4 budet a v druqom (show more) pobolshe
});

app.get("/holidays", function (_, resp) {
  resp.json(DHolidays);
});

app.get("/cities", function (_, resp) {
  resp.json(DCities);
});

/// listen() app-in hhansi portda ishlemesini temin edir : port ve callback gonderirik

let port = 4000;
app.listen(port, function () {
  console.log(`Mock server is running in http://localhost:4000`);
});

//mock server browserde run olunmur , we need nodemon

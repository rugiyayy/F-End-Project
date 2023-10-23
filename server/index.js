import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import xml2js from "xml2js"; //parsing exml 2 js

import { DHotels, DHotelsPopular } from "./data/hotels.js";
import { DHolidays } from "./data/holidays.js";
import { DCities } from "./data/cities.js";
/// for using express we need to call it :

let app = express();
//  cors-i middleware kimi elave edirik ( frontdan requesti bir basha backend-e gondermirik , ortada middleware , front ora gedir , uje ordan backend-e kechir...DCities. use edib corsdan icaze alib get edir)
app.use(cors(["http://localhost:5502"]));
app.use(express.urlencoded({ extended: true }));

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

// ! /

app.get("/flights", async function (req, res) {
  const params = req.query;
  let from = params.from;
  let to = params.to;
  // let date = params.date;np
  // let stops = params.stops;

  const url = `https://timetable-lookup.p.rapidapi.com/TimeTable/${from}/${to}/20231125/`;

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "9d16f3c06fmsh497f7c85b2c3672p17a0f3jsn680cd33c09eb",
      "X-RapidAPI-Host": "timetable-lookup.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const xmlData = (await response.text()).trim();

    xml2js.parseString(xmlData, (err, result) => {
      if (err) {
        console.error("Error parsing XML:", err);
      } else {
        // Convert the parsed XML to JSON
        const jsonData = JSON.stringify(result, null, 2);
        // var flights = result.FLSResponseFields;
        res.send(jsonData).status(200);
      }
    });
  } catch (error) {
    console.error(error);
  }
});

app.get("/codes", async function (_, res) {
  const url = "https://timetable-lookup.p.rapidapi.com/airports/";
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "9d16f3c06fmsh497f7c85b2c3672p17a0f3jsn680cd33c09eb",
      "X-RapidAPI-Host": "timetable-lookup.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const xmlData = await response.text();

    if (xmlData) {
      xml2js.parseString(xmlData, (err, result) => {
        if (err) {
          console.error("Error parsing XML:", err);
        } else {
          // Convert the parsed XML to JSON
          const jsonData = JSON.stringify(result, null, 2);
          res.send(jsonData).status(200);
        }
      });
    } else {
      res.send([]).status(404);
    }
  } catch (error) {
    console.error(error);
  }
});

// !
let port = 4000;
app.listen(port, function () {
  console.log(`Mock server is running in http://localhost:4000`);
});

//to run mock server we need nodemon

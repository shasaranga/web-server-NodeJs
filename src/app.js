const express = require("express");
const path = require("path");
const hbs = require("hbs");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

// define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

// to get handlebars engine set up (dynamic paging)
app.set("view engine", "hbs");

// pointing express to check for views in a custom directory
app.set("views", viewPath);

// registering partials directory
hbs.registerPartials(partialPath);

//set up static directory to serve.. loading static files like html, css, js
app.use(express.static(publicDirectoryPath));

// domain --> app.com
// other pages (routes)
// app.com/help
// app.com/about

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "W.H.Sathsara",
    temperature: 29,
    weather: "Partly Cloudy",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "This is some helpful text",
    title: "Dynamic Help Page",
    name: "Sathsara Warushawithana",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "Dynamic About Page",
    name: "W.Sathsara Hasaranga",
  });
});

app.get("/weather", (req, res) => {

  const address = req.query.address

  if (!address) {
    return res.send({
      error: 'Address is required'
    })
  }

  geocode.getGeoCode(
    address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send(error);
      }

      forecast.getCurrentWeather(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send(error);
        }

        res.send({
          forecast: forecastData,
          location,
          address
        })
      });
    }
  );

  
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'Search term is required'
    })
  }

  console.log(req.query);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404-page.hbs", {
    title: "Dynamic About Page",
    name: "W.Sathsara Hasaranga",
    errorMessage: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404-page.hbs", {
    title: "404-NOT Found",
    name: "W.Sathsara Hasaranga",
    errorMessage: "Sorry no such page..",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});

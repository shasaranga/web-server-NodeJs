const axios = require("axios");
const constants = require("../security/constants");
const currentForecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=${constants.WEATHER_STACK_API_KEY}&query=${latitude},${longitude}&units=f`;

  axios
    .get(url)
    .then(({ data }) => {
      if (data.error) {
        callback(
          {
            error: data.error.info,
          },
          undefined
        );
      } else {
        callback(undefined, {
          weather_description: data.current.weather_descriptions[0],
          temperature: data.current.temperature,
          feels_like: data.current.feelslike,
        });
      }
    })
    .catch(({ response, request, message, config }) => {
      if (response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        callback(
          {
            data: response.data,
            status: response.status,
            headers: response.headers,
          },
          undefined
        );
      } else if (request) {
        console.log("Error request");
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        callback(request, undefined);
      } else {
        // Something happened in setting up the request that triggered an Error
        callback(message, undefined);
      }
      callback(
        {
          error_config: config,
        },
        undefined
      );
    });
};

module.exports = {
  getCurrentWeather: currentForecast,
};

const axios = require("axios");
const constants = require("../security/constants");
const geoCode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=${constants.MAP_BOX_API_KEY}&limit=1`;

  axios
    .get(url)
    .then(({ data }) => {
      if (data.features.length === 0) {
        callback({error:"No Result found"}, undefined);
      } else {
        callback(undefined, {
          latitude: data.features[0].center[1],
          longitude: data.features[0].center[0],
          location: data.features[0].place_name,
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
  getGeoCode: geoCode,
};

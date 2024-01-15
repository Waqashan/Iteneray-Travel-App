const axios = require("axios");
const Amadeus = require("amadeus");
const amadeus = new Amadeus({
  clientId: "xpLzlv1rSqDvveLLY5uOY9VzLmVH8pPj",
  clientSecret: "Gsczi5mMq3wy7mm8",
});



exports.accessToken = async (req, res) => {
  try {
    const formData = new URLSearchParams();
    formData.append("grant_type", "client_credentials");
    formData.append("client_id", "xpLzlv1rSqDvveLLY5uOY9VzLmVH8pPj");
    formData.append("client_secret", "Gsczi5mMq3wy7mm8");
    console.log(formData.get("client_id"), "ccc");

    const response = await axios.post(
      "https://test.api.amadeus.com/v1/security/oauth2/token",

      formData.toString(), // Convert form data to URL-encoded string
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
 

    const accessToken = response.data.access_token;
    const expiresIn = response.data.expires_in;
    const tokenType = response.data.token_type;

    const responseData = {
      type: "amadeusOAuth2Token",
      username: "waqaskhan26394@gmail.com",
      application_name: "TravelApp",
      client_id: formData.get("client_id"),
      token_type: tokenType,
      access_token: accessToken,
      expires_in: expiresIn,
      state: "approved",
      scope: "",
    };

    res.json(responseData);
  } catch (error) {
    console.error("Error getting access token:", error.message);
    res.status(500).json({ error: "Internal server error........" });
  }
};

// Airport & City Search API

exports.airportAndCitySearch = async (req, res) => {
  try {
    let { keyword, countryCode, subType } = req.query;
    console.log(keyword, "keeeeeee");
    // Use req.query instead of req.params
    let token = req.headers.authorization;
    console.log(token, "yyyyy");

    const response = await axios.get(
      `https://test.api.amadeus.com/v1/reference-data/locations?subType=CITY,AIRPORT&keyword=${keyword}&countryCode=${countryCode}`,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// flight search api

// exports.flightSearch = async (req, res) => {
//   try {
//     const {
//       origin,
//       destinationLocationCode,
//       departureDate,
//       adults,
//       returnDate,
//     } = req.query;
//     const token = req.headers.authorization;
//     console.log(req.query);

//     const response = await axios.get(
//       `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${origin}&destinationLocationCode=${destinationLocationCode}&departureDate=${departureDate}&returnDate=${returnDate}&adults=${adults}&max=5`,

//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );

//     res.json(response.data);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

//   ('JFK', 'LAX', '2024-01-15', 1);

//flight offer pric api
// exports.flightOfferPrice = async (req, res) => {
//   try {
//     const { offerId } = req.query;
//     const token = req.headers.authorization;

//     // Make a request to the Flight Offers Price API
//     const response = await axios.post(
//       "https://test.api.amadeus.com/v2/shopping/flight-offers/pricing?offerId =9",
//       // {
//       //   data: {
//       //     type: 'flight-offers-pricing',
//       //     flightOffers: [{ id: offerId }], // Add the offerId you want to price
//       //   },
//       // },
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           // 'Content-Type': 'application/json',
//         },
//       }
//     );

//     res.json(response.data);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

exports.citysearch = async (req, res) => {
  console.log(req.query);
  var keywords = req.query.keyword;
  const response = await amadeus.referenceData.locations
    .get({
      keyword: keywords,
      subType: "CITY,AIRPORT",
    })
    .catch((x) => console.log(x));
  try {
    await res.json(JSON.parse(response.body));
  } catch (err) {
    await res.json(err);
  }
};

//search flights
exports.flightsearch = async function (req, res) {
  console.log(req.body);
  departureDate = req.body.departure;
  arrivalDate = req.body.arrival;
  locationDeparture = req.body.locationDeparture;
  locationArrival = req.body.locationArrival;
  adults = req.body.adults;

  const response = await amadeus.shopping.flightOffersSearch
    .get({
      originLocationCode: locationDeparture,
      destinationLocationCode: locationArrival,
      departureDate: departureDate,
      adults: "1",
    })
    .catch((err) => console.log(err));
  try {
    await res.json(JSON.parse(response.body));
  } catch (err) {
    await res.json(err);
  }
};

exports.flightsOffersPrice = async (req, res) => {
  const flight = req.body.data;
  // Confirm availability and price
  amadeus.shopping.flightOffers.pricing
    .post(
      JSON.stringify({
        data: {
          type: "flight-offers-pricing",
          flightOffers: [flight],
        },
      })
    )
    .then(function (response) {
      res.send(response.result);
    })
    .catch(function (response) {
      res.send(response);
    });
};


exports.search=async (req, res) => {
    const parameter = req.query.parameter;
    // Which cities or airports start with the parameter variable
    amadeus.referenceData.locations
        .get({
            keyword: parameter,
            subType: Amadeus.location.any,
        })
        .then(function (response) {
            res.send(response.result);
        })
        .catch(function (response) {
            res.send(response);
        });
}



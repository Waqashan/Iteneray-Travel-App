const express=require("express");
const router=express.Router();
const FlightContrl=require('../controller/flightsController')




router.post('/access',FlightContrl.accessToken);
router.get('/airports',FlightContrl.airportAndCitySearch);
// router.get('/flight-search',FlightContrl.flightSearch);
router.post('/flight-offer-price',FlightContrl.flightsOffersPrice);
router.get('/citySearch',FlightContrl.citysearch);
router.post('/Searchflight',FlightContrl.flightsearch);
router.get(`/city-and-airport-search`,FlightContrl.search);


module.exports = router;
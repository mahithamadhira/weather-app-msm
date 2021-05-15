const request = require('request')

const geocode = (address, callback) => {
    geocode_url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibWFoaXRoYSIsImEiOiJja2prMGRpZGg1bzZvMnpsZzU0YmszZnQ5In0.bEnatu4gLiAjpUVQRh2RVw';
    request({url: geocode_url, json: true}, (error, response) => {
        if(error){
            callback('Unable to connect to the network', null)
        }
        else if(response.body.features.length == 0){
            callback("Unable to find location", null)
        }
        else{
            callback(null,{
                latitude: response.body.features[0].center[0],
                longitude: response.body.features[0].center[1],
                place: response.body.features[0].place_name
            } )
        }
    })
}

module.exports = geocode;
const { response } = require("express");
const request = require("request");


const forecast = (long, lat, callback) => {
    const forecast_url = 'http://api.weatherstack.com/current?access_key=c9141178005f1a58c827159db967a2ab&query=' + long + ',' + lat;

    request({url: forecast_url, json: true }, (error, response) => {
        if(error){
            callback('Unable to connect to the network', null)
        }
        else if(response.body.error){
            callback('Unable to find location', null)
        }
        else{
            callback(null,{
                temp: response.body.current.temperature,
                feelslike: response.body.current.feelslike,
            })
        }
    })
}

module.exports = forecast
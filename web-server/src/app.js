const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()
const request = require('request')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '../templates/views'))
hbs.registerPartials(path.join(__dirname, '../templates/partials'))

app.use(express.static(path.join(__dirname, '../public')))

app.get('', (req, res)=>{
    res.render('index',{
        title: 'Weather app',
        name: 'mahitha'
    })
})

app.get('/help', (req, res) =>{
    res.render('help',{
        title: 'Help page',
        name: 'mahitha'
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About page',
        name: 'mahitha'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        res.send({
            error: "Please enter an address"
        })
    }
    else{
        geocode(req.query.address, (error, {latitude, longitude, place} = {}) => {
            if(error){
                console.log(error);
            }
            else{
                console.log(place);
                forecast(longitude, latitude, (error, data) =>{
                    if(error){
                        res.send({error: error});
                    }
                    else{
                        console.log("It is currently " + data.temp + " degrees outside. It feels like " + data.feelslike + " degrees outside.");
                        res.send({
                            forecast: "It is currently " + data.temp + " degrees outside. It feels like " + data.feelslike + " degrees outside.",
                            location: place,
                            address: req.query.address
                        })
                    }
                } )
            }
        })    
    }
})

app.get('*',(req,res) => {
    res.render('errors')
})

app.listen(4000, ()=>{
    console.log("Sever up and running on 4000");
})


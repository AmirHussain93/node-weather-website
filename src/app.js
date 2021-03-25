const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather App",
        name: 'Amir Hussain'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About me",
        name: "Amir Hussain"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help",
        name: "Amir Hussain",
        helpText: "Info about the application"

    })
})


app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            "error": "You must provide a address term"
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        console.log(req.query)
        if (error) {
            return res.send({ error })
        } 
    
        forecast(latitude, longitude, (error, forecastData) => {
    
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
            
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 help',
        name: 'Amir Hussain',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name:'Amir Hussain',
        errorMessage: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})
const request = require('request')

const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=50d5fa632c2f0597d646ffb1d49f9082&query= ' + lat + ',' + long + '&units=m'

    request({ url, json: true }, (error, response) => {
        if (error) {
            callback("Unable to connect to weather service", undefined)
        } else if (response.body.error) {
            callback('Unable to find location.', undefined)
        } else {
            const { weather_descriptions, temperature, feelslike } = response.body.current
            callback(undefined, weather_descriptions[0] + ". It is currently " + temperature +" degrees out. It feels like " + feelslike + " degrees out.")
        }
    })

}

module.exports = forecast
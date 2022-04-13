const request = require('request')

const weatherstack = (Latitude,Longitude ,callstack) => {
    const url = 'http://api.weatherstack.com/current?access_key=87a2935230916a32406b3b7530b0cfa8&query='+ encodeURIComponent(Latitude) +','+ encodeURIComponent(Longitude) +'&units=m'
    // const url = 'http://api.weatherstack.com/current?access_key=87a2935230916a32406b3b7530b0cfa8&query='+ Latitude +','+ Longitude +'&units=m'
    request({ url, json: true }, (error, { body }) => {
        if(error){
            callstack('Unable to connect to weather service!' , undefined)
        }else if(body.error){
            callstack('Unable to find location' , undefined )
        }else {
            callstack(undefined , body.current.weather_descriptions[0] + ", It is currently "+body.current.temperature+" degrees out. It feels like "+body.current.feelslike+" degrees out," + " The humidity is "+body.current.humidity+"%"+" and the pressure is "+body.current.pressure )
        }
    })
}

module.exports = weatherstack

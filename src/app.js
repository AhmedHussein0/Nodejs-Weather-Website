const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const weatherstack = require('./utils/weatherstack')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewpath = path.join(__dirname, '../templates/views')
const partialspath =path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine' , 'hbs')
app.set ('views' , viewpath)
hbs.registerPartials(partialspath)

//Setup static directory
app.use(express.static(publicDirectoryPath))


app.get('' , (req , res) =>{
    res.render('index',{
        title: 'Weather app',
        name: 'Ahmed'
    })
})

app.get('/about' , (req , res) => {
    res.render('about' , {
        title: 'About me',
        name: 'Ahmed'
    })
})

app.get('/help' , (req , res) => {
    res.render('help' , {
        title: 'Help',
        name: 'Ahmed',
        helptext: 'This is some helping text'
    })
})

app.get('/weather' , (req, res) =>{
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
    geocode (req.query.address, (error , { longitude, latitude, location } = {} )=> {
        if(error)
        {
            return res.send({
                error
            })
        }
        weatherstack(longitude , latitude ,(error , weatherstackData) => {
            if(error)
            {
                return res.send({
                    error
                })
            }
            res.send({
                Forecast: weatherstackData,
                location: location,
                address: req.query.address
            })
        })
    })
})

app.get('/product', (req, res) =>{
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*' , (req, res)=>{
    res.render('404routes' ,{
        title: '404',
        text: 'Help article nor found',
        name: 'Ahmed'
    })
})

app.get('*' , (req, res)=>{
    res.render('404routes' ,{
        title: '404',
        text: 'Page not found',
        name: 'Ahmed'
    })
})

app.listen(3000, ()=>{
    console.log('Server is up')
})
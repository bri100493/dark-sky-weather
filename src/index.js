const express = require('express')
const exphbs = require('express-handlebars')
const request = require('request')
const app = express()
const port = process.env.PORT || 3000;
const apiKey = "29c20abae84971c79ce21fdfe7fb9ae1"
const zipcodes = require('zipcodes');
const handlebars = require('handlebars');
const handlebarsIntl = require('handlebars-intl');
const momentHandler = require('handlebars.moment');
const skycons = require('skycons');

//SET UP PLUGINS AND MIDDLEWARE
app.use(express.static('assets'))

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

handlebarsIntl.registerWith(handlebars);

momentHandler.registerHelpers(handlebars);

handlebars.registerHelper('distanceFixed', function (distance) {
    return distance.toFixed(0);
});

handlebars.registerHelper("math", function (lvalue, operator, rvalue, options) {
    lvalue = parseFloat(lvalue);
    rvalue = parseFloat(rvalue);

    return {
        "+": lvalue + rvalue,
        "-": lvalue - rvalue,
        "*": (lvalue * rvalue).toFixed(0),
        "/": (lvalue / rvalue).toFixed(0),
        "%": lvalue % rvalue
    }[operator];
});

//DEFINE ROUTES
app.get('/', function (req, res) {
    res.render('home');
});

app.get('/weather/:zipcode', (req, res) => {
    const locationData = zipcodes.lookup(req.params.zipcode);
    const darkSkyURL = `https://api.darksky.net/forecast/${apiKey}/${locationData.latitude},${locationData.longitude}`

    function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            const data = JSON.parse(body);

            let today = new Date();
            for (let i = 0; i < data.daily.data.length; i++) {
                let newDate = new Date().setDate(today.getDate() + i);
                data.daily.data[i].time = newDate;    
            }

            res.render('forecast', data.daily);
            //res.json(data);
        }
        else {
            res.json(error);
        }
    }

    request.get(darkSkyURL, callback)
})

//START SERVER
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
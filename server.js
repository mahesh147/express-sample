const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');



app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log');
        }
    });
    next();
});

// app.use((req, res, next) => {
//     console.log('Student 90281UXha2948ajnm00281rTKa5 tried logging in during manitance hour.');
//     res.render('maintance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();    
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req,res) => {
    res.render('home.hbs',{
        welcomeText: 'Hello, there!',
        pageTitle: 'Home Page',
        
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
        
    });
});

app.get('/bad', (req, res) => {
    res.send({
        status: 400,
        message: 'DOES NOT EXIST'
    });
});

app.listen(port, () => {
    console.log(`Server is up on PORT ${port}`);
});

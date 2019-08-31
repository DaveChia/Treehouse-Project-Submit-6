const express = require('express');
const app = express();
const data = require('./data.json');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'pug');
app.use('/static', express.static('public'));
app.use(express.static(__dirname + '/public/assets'));


//Redirects user to home directory, pass all projects data to the home page
app.get('/', (request, response) => {

    response.render('./', { data: data.projects });

});

//Redirects user to the about page 
app.get('/about', (request, response) => {

    response.render('./about');
});

//Redirects user to individual project page, with individual project details passed in
app.get('/project:id', (request, response) => {

    let queryID = (request.param("id"));
    queryID = queryID.replace(":", "");
    response.render('./project', { data: data.projects[queryID] });

});

//Error handler if the user entered an invalid url
app.use((req, res, next) => {
    const err = new Error('Hi we could not find your page, have you entered a wrong address?');
    err.status = 404;
    console.log("Error is " + err + " .The error status is " + err.status);
    next(err);
});

//Displays the error 
app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status);
    res.render('error');
});

//App listener
app.listen(3000, () => {

    console.log("App is listening to port 3000");

});
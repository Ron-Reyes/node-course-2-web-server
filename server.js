const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

// user use the env.PORT or use the port 3000 , then reference the "port" below at app.listen(port
const port = process.env.PORT || 3000; //store all the ports that will use by the app. process.env is an object variable that stores all the data in the environment (cmd: set)


var app = express();
 
hbs.registerPartials(__dirname + '/views/partials/'); // include __dirname concatenate it with views folder and partial forlder. this contain the mostly use module like header/footer etc. any repetitive task
app.set('view engine', 'hbs'); //2 key value pair, KEY and VALUE. key is the one you set, and value is the one you want to use
//This execute the help.html using __dirname

//EXPRESS MIDDLEWARE: REQ = ex http, path, query param or anything comes from the client
app.use((req, res, next) => { // logger: logs all the request come in to the server
    var now = new Date().toString(); // like a timestamp
    var log = `${now} : ${req.method} ${req.url}`;// OUTPUT: GET /about ---> GET is the req.method. /about is the req.url
    
    console.log(log);
    //below creates a server logs that record all activity
    fs.appendFile('server.log', log + '\n', (err) => { // consist of 3 args, filename, things you want to add, a callback for errors w/c is required. '\n' is create new line
        if (err){  // this is the callback
            console.log('Unable to append to server.log');
        }    
    }); 
    next(); 
});

// this allows you to make maintenance, it's the same pages you will see in all the modules. it can be commented out if done with the maintenanace
// note: make sure to uncommenet/comment the maintenance in header.hbs
// app.use((req, res, next) => {
//     res.render('maintenance.hbs', {
//         //pageTitle: 'Maintenance Page',
//         header: 'Maintenance',
//         welcome_message: 'This site is currently being updated.',
//     }); 
// });

app.use(express.static(__dirname + '/public'));// this is call middleware, this is a third party add on. the  __dirname stores the node-web-server .  

hbs.registerHelper('getCurrentYear',() => { // takes 2 arguments, 1.name of the helper, 2. the function to run
    return new Date().getFullYear()  // it returns the full year method value ex: 2019
});

hbs.registerHelper('screamIt', (text) => { //capitalization helper, convert the text to uppercase
    return text.toUpperCase();
})

app.get('/', (req, res) => { //this is a http route handler request / means root directory. ()=> function to run, and it contain two argu request and response
    // res.send('<h1>Hello Express!</h1>'); // this is the response for the http request passing a string
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        header: 'Home',        
        welcome_message: 'Welcome to Leisure and Resorts World Corporation',
        // no need for below currentYear because i already use the return new Date().getFullYear above
        //currentYear: new Date().getFullYear() // 2016: it also lets you pass the data to about.hbs
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', { // this will render the about.hbs. lets you render any set up under the view engine. also passes dynamic data below
        pageTitle: 'Reset Page', // it also lets you pass the data to about.hbs
        header: 'Reset',
        welcome_message: 'Reset your password here!',
        // no need for below currentYear because i already use the return new Date().getFullYear above
        //currentYear: new Date().getFullYear() 
    }); 
});
    
app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to handle request'
    });
});

app.listen(port, () =>{ //bind to the applicaton ported on the machine () => this is an optional function
    console.log(`Server is up on port ${port}`);
}); 
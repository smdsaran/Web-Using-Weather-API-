const express = require("express");
const https = require('https');
const bodyParser = require("body-parser");
const { urlencoded } = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded( { extended : true}));

app.get("/" , function(req , res) {

    res.sendFile(__dirname + "/index.html");

        
    }); 


app.post("/" , function(req , res ) {

    const city = req.body.cityName;
    const apiKey = "085e8ec9886a5be18e1d64a8253a9203";
    const unit = req.body.unit;

    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=" + unit;

https.get(url , function(resp) {
    console.log(resp.statusCode);

    resp.on("data" , function(data) {
        const weatherData = JSON.parse(data);
        const temp = weatherData.main.temp;
        
        const w_Discription = weatherData.weather[0].description;
        
        const icon = weatherData.weather[0].icon;
        const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";


        res.write("<p><strong> Weather condition : " + w_Discription + " </strong></p>");
        res.write("<h1> The Temperature is " + temp + " in " + city + " . </h1>");
        res.write("<img src=" + imageUrl + ">");
        res.send();
});



    
});  
});
   






app.listen(3000 , function() {
    console.log("Server is running on port 3000");
});
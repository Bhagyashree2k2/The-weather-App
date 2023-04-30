const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");


const app=express();
/**404--resource not found */


app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");

});

app.post("/",function (req,res) {
    console.log(req.body.cityName);
    console.log("Post has been receive!");

    const query=req.body.cityName;//name attribute in index.html
    const apiKey="f1eb8d6ea55eea42751397fae6266315";
    const unit="metric";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ apiKey +"&units="+unit;
    https.get(url,function(response){ //callback function will give u a response
        console.log(response.statusCode);
        response.on("data",function(data){

            var weatherData=JSON.parse(data);//we will get in json format ---complete Data
            
            console.log(weatherData);
            const temp=weatherData.main.temp;
            console.log(temp);
            var desc=weatherData.weather[0].description;

            res.write("<h1>The temperature in "+ query+" is "+temp+" degree celcius </h1>");
            res.write("<p>The weather is currently "+desc+"</p>");

            const weatherIcon=weatherData.weather[0].icon;
            const imageUrl="http://openweathermap.org/img/wn/"+ weatherIcon +"@2x.png";
            res.write("<img src="+imageUrl+">");
            res.send();
            /*console.log(desc)

           const object ={
            name:"Bhagya",
            age:20
           }
           console.log(JSON.stringify(object)); //we will get in string format
          */
          
        });

    });
})

app.listen(3000,function(){
    console.log("Server running on port 3000");
});


/**json.parse -- converts hex codes or strings ino actual javascript objects 
 * json.stringify --- converts javascript objects into strings
 * use on to get actual message body data
*/



  
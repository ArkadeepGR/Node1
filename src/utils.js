/*
const geoCode=function(address,callback){
    fn=function(){
        data={lat:0,long:0}
        callback(data)
    }
    setTimeout(fn,2000)
}
geoCode("LA",function(data){
    console.log(data)
})


*/

const request=require("request")

//
// Goal: Mess around with the callback pattern
//
// 1. Define an add function that accepts the correct arguments
// 2. Use setTimeout to simulate a 2 second delay
// 3. After 2 seconds are up, call the callback function with the sum
// 4. Test your work!

/*
const add=function(a,b,callback)
{
    fn=function(){
        callback(a+b)
    }
    setTimeout(fn,2000)
}


add(1, 4,function(sum){
    console.log(sum) // Should print: 5
})
*/

////////////////GEOCODE ASYN

const geoCode=function(location,callback){
    const url="https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(location)+".json?access_token=pk.eyJ1IjoiYXJrYWRlZXBnciIsImEiOiJjazh5ZXlqancwYWl6M2xvZzdnOHZwN3UxIn0.h28U0iN-st6udQCgxS6F7g"
    request({url:url,json:true},function(error,data){
        if(error)
        {
            callback("Unable to connect.",undefined)
        }
        else if(data.body.features.length===0){
            callback("Unable to find location",undefined)
        }
        else{
            d={
                place:data.body.features[0].place_name,
                lat:data.body.features[0].center[1],
                long:data.body.features[0].center[0]
            }
            callback(undefined,d)
        }
    })
}




////////////////GEOCODE SYN

const c=function(loc){
    const url="https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(loc)+".json?access_token=pk.eyJ1IjoiYXJrYWRlZXBnciIsImEiOiJjazh5ZXlqancwYWl6M2xvZzdnOHZwN3UxIn0.h28U0iN-st6udQCgxS6F7g"
    request({url:url,json:true},function(error,response){
        if(!error)
        {
            try{
            obj=response.body.features
            console.log(" "+obj[0].place_name+" ")
            console.log("Latitude: "+obj[0].center[1])
            console.log("Longitude: "+obj[0].center[0])
            }
            catch(e){
                console.log("Unexpected Error")
            }
        }
        else
        console.log("Error: Unable to connect.")
    })
    return 1
}
/*
callback=function(error,data){
   if(error)
   {
       console.log(error)
   }
   else{
       console.log(data)
   }
}
*/
const weather=function(loc,callback){
    const url="http://api.weatherstack.com/current?access_key=01777137f371583fcb3b4d3f2b7ed312&query="+encodeURIComponent(loc)+"&units=m"
   request({url:url,json:true},function(error,response){
       if(error)
       {callback("Unable to connect",undefined)}
       else{
           try{
                data={
                    location:response.body.location.name+", "+response.body.location.country,
                    temp:response.body.current.temperature,
                    hum:response.body.current.humidity,
                    desc:response.body.current.weather_descriptions[0]
                }
                callback(undefined,data)
           }catch(e){
               callback("Location not found.",undefined)
           }
       }
   }
   )
}




module.exports={
    geoCodeAsync:geoCode,
    geoCodeSync:c,
    weather:weather
}


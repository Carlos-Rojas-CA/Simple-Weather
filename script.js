var appKey = '&appid=2e2fac335cb9431eeb2e8eda8d7b97dc';

var searchCityEl = $('#search')
var searchButtonEl = $('#search-button')
var units = '&units=imperial'
var name;

function searchWeather(cityName){
    var forecastQuery = 'https://api.openweathermap.org/data/2.5/forecast?q='
        var currentQuery = 'https://api.openweathermap.org/data/2.5/weather?q='
        var uvQuery = "http://api.openweathermap.org/data/2.5/uvi"
        
        forecastQuery = forecastQuery + cityName + units + appKey;
        currentQuery = currentQuery +cityName + units + appKey
        
        $.ajax({
            url: forecastQuery,
            method: "GET"
          }).then(function(result){
              console.log(result)
              var dtText = result.list[0].dt_txt.split(' ')
            //   console.log(dtText)
              console.log(dtText[0])
              var newName = result.city.name + ', ' + result.city.country;
            $('#city').text(newName)
          })

        $.ajax({
        url: currentQuery,
        method: "GET"
        }).then(function(response){
            console.log(response)
            
            var currentTemp = 'Temperature: '+ response.main.temp + '°F';
            var currentHumidity = 'Humidity: ' + response.main.humidity + '%';
            var windSpeed = 'Wind Speed: ' + response.wind.speed + ' MPH';
            var timeZone = response.timezone;
            var dt = parseInt(response.dt) + 25200;
            var time = (dt+timeZone)*1000;
            var date = new Date(time)
            var month = parseInt(date.getMonth()) + 1;
            var day = date.getDate()
            console.log(date)
            console.log(time)
            var year = date.getFullYear()
            var locationsDate = month + '/' + day + '/' + year;

            $.ajax({
                url: forecastQuery,
                method: "GET"
            }).then(function(result){
                console.log(result)
                var newName = result.city.name + '(' + locationsDate + ')';
            $('#city').text(newName)
            })




            var lat = response.coord.lat
            var long = response.coord.lon
            uvQuery = uvQuery + "?lat=" + lat + '&lon=' + long + appKey;
            
            $('#temp').text(currentTemp)
            $('#humidity').text(currentHumidity)
            $('#wind').text(windSpeed)
            
            $.ajax({
                url: uvQuery,
                method: "GET"
            }).then(function(uv){
                console.log(uv)
                var uvIndex = uv.value
                var uvButton = $('<button>')
                uvButton.text(uvIndex);
                if(uvIndex<=2.9){
                    uvButton.attr('class', 'btn btn-success')
                }else if(uvIndex>=3 && uvIndex<=5.9){
                    uvButton.attr('class', 'btn btn-warning')
                }else if(uvIndex>=6 && uvIndex<=7.9){
                    uvButton.attr('class', 'btn orange')
                }else if(uvIndex>=8 && uvIndex<=10.9){
                    uvButton.attr('class', 'btn btn-danger')
                }else if(uvIndex>=11){
                    uvButton.attr('class', 'btn violet')
                }
                $('#uv').html('');
                $('#uv').text('UV Index: ');
                $('#uv').append(uvButton);
            })


        })

        window.localStorage.setItem('city', cityName)

        

}
if(window.localStorage.getItem('city') !== 'null'){
    name=window.localStorage.getItem('city')
    searchWeather(name)
}



searchButtonEl.on('click',function(event){
    console.log("1")
    if(searchCityEl.val() !== 'undefined'){
        event.preventDefault();
        name = searchCityEl.val()
        searchWeather(name)
    }

})


// function forcast(days){
//     var forcast = [];
//     var date = [];
//     var today=0
//     var tomorrow = 0;
//     var dtText
//     var fTemp = []
//     var maxTemp
//     var fhumid = []
//     var fweather = []
//     for(var i = 0; i<days.length; i++){
//         dtText = days[i].dt_txt.split(' ')
//         if(date[tomorrow] !== dtText[0]){
//             today++
//             date.push(dtText[i])
//             maxTemp = days[i].main.temp
//             fTemp.push(maxTemp)
//             fhumid.push(days[i].main.humidity)
//             fweather.push(days[i].weather.main)
//             tomorrow++
//         }else if(date[today] === dtText[0]){
//             if(days[i].main.temp > fTemp[tomorrow])
//         }
        
//     }
// }




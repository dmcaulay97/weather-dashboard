var key = "2d5a13d9312ee895b46814ad5a65ff9f";
var background = $("html");
var prevSearch = $("#prevSearch");
var todayWeather = $("#todayWeather");
var fiveDay = $("#fiveDay");
var submit = $("#submit");
var weatherDisplay = $("#weatherDisplay");

if (!(localStorage.getItem("searched") == null)) {
    var searchedArray = JSON.parse(localStorage.getItem("searched"));
    for (var i = searchedArray.length - 1; i > -1; i--) {
        var city = searchedArray[i];
        appendSearched(city);
    }
}

function getCoords(city) {
    fetch("https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=" + key).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                if (data.length === 0) {
                    alert("No City found with that name!");
                } else {
                    var lat = data[0].lat;
                    var lon = data[0].lon;
                    var cityName = data[0].name;
                    getWeather(lat, lon, cityName);
                }
            })
        } else {
            alert("No City found with that name!");
        }
    })
}

function getWeather(lat, lon, cityName) {
    var cityName = cityName;
    fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly,alerts&units=imperial&appid=" + key).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data);
                weatherDisplay.css("display", "initial");
                var temp = data.current.temp;
                var humid = data.current.humidity;
                var wind = data.current.wind_speed;
                var uv = data.current.uvi;
                var disc = data.current.weather[0].main;
                var dt = data.current.dt;
                var offSet = data.timezone_offset;
                var sunset = data.current.sunset;
                var sunrise = data.current.sunrise;
                var night = (dt > sunset);
                var morning = (dt < sunrise);
                todayWeather.empty();
                fiveDay.empty();
                searchList(cityName);
                setCurrent(cityName, temp, humid, wind, uv, disc, dt, offSet, night, morning);
                setFiveDay(data);
            })
        } else {
            alert("No City found with that name!");
        }
    })
}

$(function () {
    var city_names = ["Aberdeen", "Abilene", "Akron", "Albany", "Albuquerque", "Alexandria", "Allentown", "Amarillo", "Anaheim", "Anchorage", "Ann Arbor", "Antioch", "Apple Valley", "Appleton", "Arlington", "Arvada", "Asheville", "Athens", "Atlanta", "Atlantic City", "Augusta", "Aurora", "Austin", "Bakersfield", "Baltimore", "Barnstable", "Baton Rouge", "Beaumont", "Bel Air", "Bellevue", "Berkeley", "Bethlehem", "Billings", "Birmingham", "Bloomington", "Boise", "Boise City", "Bonita Springs", "Boston", "Boulder", "Bradenton", "Bremerton", "Bridgeport", "Brighton", "Brownsville", "Bryan", "Buffalo", "Burbank", "Burlington", "Cambridge", "Canton", "Cape Coral", "Carrollton", "Cary", "Cathedral City", "Cedar Rapids", "Champaign", "Chandler", "Charleston", "Charlotte", "Chattanooga", "Chesapeake", "Chicago", "Chula Vista", "Cincinnati", "Clarke County", "Clarksville", "Clearwater", "Cleveland", "College Station", "Colorado Springs", "Columbia", "Columbus", "Concord", "Coral Springs", "Corona", "Corpus Christi", "Costa Mesa", "Dallas", "Daly City", "Danbury", "Davenport", "Davidson County", "Dayton", "Daytona Beach", "Deltona", "Denton", "Denver", "Des Moines", "Detroit", "Downey", "Duluth", "Durham", "El Monte", "El Paso", "Elizabeth", "Elk Grove", "Elkhart", "Erie", "Escondido", "Eugene", "Evansville", "Fairfield", "Fargo", "Fayetteville", "Fitchburg", "Flint", "Fontana", "Fort Collins", "Fort Lauderdale", "Fort Smith", "Fort Walton Beach", "Fort Wayne", "Fort Worth", "Frederick", "Fremont", "Fresno", "Fullerton", "Gainesville", "Garden Grove", "Garland", "Gastonia", "Gilbert", "Glendale", "Grand Prairie", "Grand Rapids", "Grayslake", "Green Bay", "GreenBay", "Greensboro", "Greenville", "Gulfport-Biloxi", "Hagerstown", "Hampton", "Harlingen", "Harrisburg", "Hartford", "Havre de Grace", "Hayward", "Hemet", "Henderson", "Hesperia", "Hialeah", "Hickory", "High Point", "Hollywood", "Honolulu", "Houma", "Houston", "Howell", "Huntington", "Huntington Beach", "Huntsville", "Independence", "Indianapolis", "Inglewood", "Irvine", "Irving", "Jackson", "Jacksonville", "Jefferson", "Jersey City", "Johnson City", "Joliet", "Kailua", "Kalamazoo", "Kaneohe", "Kansas City", "Kennewick", "Kenosha", "Killeen", "Kissimmee", "Knoxville", "Lacey", "Lafayette", "Lake Charles", "Lakeland", "Lakewood", "Lancaster", "Lansing", "Laredo", "Las Cruces", "Las Vegas", "Layton", "Leominster", "Lewisville", "Lexington", "Lincoln", "Little Rock", "Long Beach", "Lorain", "Los Angeles", "Louisville", "Lowell", "Lubbock", "Macon", "Madison", "Manchester", "Marina", "Marysville", "McAllen", "McHenry", "Medford", "Melbourne", "Memphis", "Merced", "Mesa", "Mesquite", "Miami", "Milwaukee", "Minneapolis", "Miramar", "Mission Viejo", "Mobile", "Modesto", "Monroe", "Monterey", "Montgomery", "Moreno Valley", "Murfreesboro", "Murrieta", "Muskegon", "Myrtle Beach", "Naperville", "Naples", "Nashua", "Nashville", "New Bedford", "New Haven", "New London", "New Orleans", "New York", "New York City", "Newark", "Newburgh", "Newport News", "Norfolk", "Normal", "Norman", "North Charleston", "North Las Vegas", "North Port", "Norwalk", "Norwich", "Oakland", "Ocala", "Oceanside", "Odessa", "Ogden", "Oklahoma City", "Olathe", "Olympia", "Omaha", "Ontario", "Orange", "Orem", "Orlando", "Overland Park", "Oxnard", "Palm Bay", "Palm Springs", "Palmdale", "Panama City", "Pasadena", "Paterson", "Pembroke Pines", "Pensacola", "Peoria", "Philadelphia", "Phoenix", "Pittsburgh", "Plano", "Pomona", "Pompano Beach", "Port Arthur", "Port Orange", "Port Saint Lucie", "Port St. Lucie", "Portland", "Portsmouth", "Poughkeepsie", "Providence", "Provo", "Pueblo", "Punta Gorda", "Racine", "Raleigh", "Rancho Cucamonga", "Reading", "Redding", "Reno", "Richland", "Richmond", "Richmond County", "Riverside", "Roanoke", "Rochester", "Rockford", "Roseville", "Round Lake Beach", "Sacramento", "Saginaw", "Saint Louis", "Saint Paul", "Saint Petersburg", "Salem", "Salinas", "Salt Lake City", "San Antonio", "San Bernardino", "San Buenaventura", "San Diego", "San Francisco", "San Jose", "Santa Ana", "Santa Barbara", "Santa Clara", "Santa Clarita", "Santa Cruz", "Santa Maria", "Santa Rosa", "Sarasota", "Savannah", "Scottsdale", "Scranton", "Seaside", "Seattle", "Sebastian", "Shreveport", "Simi Valley", "Sioux City", "Sioux Falls", "South Bend", "South Lyon", "Spartanburg", "Spokane", "Springdale", "Springfield", "St. Louis", "St. Paul", "St. Petersburg", "Stamford", "Sterling Heights", "Stockton", "Sunnyvale", "Syracuse", "Tacoma", "Tallahassee", "Tampa", "Temecula", "Tempe", "Thornton", "Thousand Oaks", "Toledo", "Topeka", "Torrance", "Trenton", "Tucson", "Tulsa", "Tuscaloosa", "Tyler", "Utica", "Vallejo", "Vancouver", "Vero Beach", "Victorville", "Virginia Beach", "Visalia", "Waco", "Warren", "Washington", "Waterbury", "Waterloo", "West Covina", "West Valley City", "Westminster", "Wichita", "Wilmington", "Winston", "Winter Haven", "Worcester", "Yakima", "Yonkers", "York", "Youngstown"];
    $('#citySearch').autocomplete({
        source: city_names,
    });
});

function setCurrent(cityName, temp, humid, wind, uv, disc, dt, offSet, night, morning) {
    var icon = iconSelector(disc, night, morning);
    var currentDate = moment((dt + offSet), "X").utc().format("MM/DD/YYYY");
    var cityName = $("<h1>" + cityName + " (" + currentDate + ") </h1>").attr("id", "cityName");
    var temp = $("<p> Temperature: " + temp.toFixed(1) + " F</p>");
    var humid = $("<p> Humidity: " + humid + "%</p>");
    var wind = $("<p> Wind Speed: " + wind.toFixed(1) + " MPH</p>");
    var uvi = $("<p> UV Index: </p>");
    var uvSpan = $("<span>" + uv.toFixed(2) + "</span>").attr("class", "text-white p-1 rounded");
    if (uv < 3) {
        uvSpan.css("background-color", "green");
    } else if (uv < 6) {
        uvSpan.css("background-color", "#e9e910");
    } else {
        uvSpan.css("background-color", "rgb(192, 5, 5)");
    }

    var currentTime = moment((dt + offSet), "X").utc().format("h:mm A");

    currentTime = $("<p>Local Time: " + currentTime + "</p>");
    uvi.append(uvSpan);
    cityName.append(icon);
    todayWeather.append(cityName, currentTime, temp, humid, wind, uvi);
}

function iconSelector(disc, night = false, morning = false) {
    var mistArray = ["Mist", "Smoke", "Haze", "Dust", "Fog", "Sand", "Ash", "Squall", "Tornado"]
    if (night || morning) {
        if (disc == "clouds") {
            var icon = $("<i></i>").attr("class", "fas fa-cloud-moon");
        } else if (disc == "Drizzle" || disc == "Rain" || disc == "Thunderstorm") {
            var icon = $("<i></i>").attr("class", "fas fa-cloud-moon-rain");
        } else {
            var icon = $("<i></i>").attr("class", "fas fa-moon");
        }
    } else if (disc == "Clear") {
        var icon = $("<i></i>").attr("class", "fas fa-sun");
    } else if (disc == "Clouds") {
        var icon = $("<i></i>").attr("class", "fas fa-cloud-sun");
    } else if (disc == "Drizzle") {
        var icon = $("<i></i>").attr("class", "fas fa-cloud-rain");
    } else if (disc == "Rain") {
        var icon = $("<i></i>").attr("class", "fas fa-cloud-showers-heavy");
    } else if (disc == "Thunderstorm") {
        var icon = $("<i></i>").attr("class", "fas fa-bolt");
    } else if (disc == "Snow") {
        var icon = $("<i></i>").attr("class", "fas fa-snowflake");
    } else if (mistArray.includes(disc)) {
        var icon = $("<i></i>").attr("class", "fas fa-smog");
    } else {
        //if all others fail this sets icon to cloudy.
        var icon = $("<i></i>").attr("class", "fas fa-cloud-sun");
    }
    icon.css("color", "black")
    return icon;
}

function setFiveDay(data) {
    for (var i = 0; i < 5; i++) {
        var temp = data.daily[i].temp.day;
        var humid = data.daily[i].humidity;
        var disc = data.daily[i].weather[0].main;
        var dt = data.current.dt;
        var offSet = data.timezone_offset;
        var date = moment((dt + offSet), "X").utc().add(i, "days").format("MM/DD/YYYY");
        var icon = iconSelector(disc);
        var card = $("<div></div>").attr("class", "card mx-2 pt-1 col-2 fiveDayCard")
        var dateEl = $("<p>" + date + "</p>")
        var iconEl = $("<p></p>")
        iconEl.append(icon);
        var tempEl = $("<p>Temp: " + temp.toFixed(1) + " F</p>")
        var humidEl = $("<p>Humidity: " + humid + "%</p>");

        card.append(dateEl, iconEl, tempEl, humidEl);
        fiveDay.append(card);
    }
}

function searchList(cityName) {
    var city = cityName;
    if (localStorage.getItem("searched") == null) {
        var searchedArray = [city];
        localStorage.setItem("searched", JSON.stringify(searchedArray));
        appendSearched(city);
    } else {
        var searchedArray = JSON.parse(localStorage.getItem("searched"));
        if (!searchedArray.includes(city)) {
            searchedArray.unshift(city);
            if (searchedArray.length > 10) {
                searchedArray.pop();
                prevSearch.children().last().remove();
            }
            localStorage.setItem("searched", JSON.stringify(searchedArray));
            appendSearched(city);
        }
    }
}

function appendSearched(city) {
    var li = $("<li>" + city + "</li>").attr("class", "list-group-item searchedList");
    var span = $("<i></i>").attr("class", "delete fas fa-minus-circle")
    span.on("click", function (event) {
        event.stopPropagation();
        var clicked = $(event.target);
        var searchedArray = JSON.parse(localStorage.getItem("searched"));
        var index = searchedArray.indexOf(clicked.parent().text());
        searchedArray.splice(index, 1);
        localStorage.setItem("searched", JSON.stringify(searchedArray));
        clicked.parent().remove();
    })
    li.append(span);
    li.on("click", function (event) {
        var clickedCity = $(event.target).text();
        getCoords(clickedCity);
    })
    prevSearch.prepend(li);
}

submit.on("click", function (event) {
    event.preventDefault();
    var btn = event.target;
    var citySearch = $(btn).prev().val();
    getCoords(citySearch);
});
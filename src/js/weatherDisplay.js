// A simple plugin JS to display the weather with the API of Openweathermap and the XMLHttpRequest
// Convert Unix time to UTC time and to a human readable form (hours, minutes, seconds)
function unixToHumanTime (unixTimestamp) {
  let dateUTC = new Date(unixTimestamp * 1000)
  let hour = dateUTC.getHours()
  let minute = dateUTC.getMinutes()
  let second = dateUTC.getSeconds()
  let date = `${hour}:${minute}:${second}`
  return date
}

// Display weather informations into the #weather ID
function weatherDisplay (response) {
  // convert Unix time to UTC time
  let sunrise = unixToHumanTime(response.sys.sunrise)
  console.log(sunrise)

  let sunset = unixToHumanTime(response.sys.sunset)
  console.log(sunset)

  document.getElementById('weather').innerHTML += `<h3>Sun</h3> <ul><li> Sunrise : ${sunrise} </li><li> Sunset : ${sunset} </li></ul>`
  document.getElementById('weather').innerHTML += `<h3>Weather</h3>
  <ul>
    <li>Humidity : ${response.main.humidity} % </li>
    <li>Currently Temperature : ${response.main.temp} <sup>O</sup>C</li>
    <li>Sky : ${response.weather[0].description} </li>
    <li>Pressure : ${response.main.pressure} hPa </li>
    <li>Wind : ${response.wind.speed} m/sec </li>
  </ul>`
}

// create an XMLHttpRequest object
const xhr = new XMLHttpRequest()

// open a new request
xhr.open('GET', 'http://api.openweathermap.org/data/2.5/weather?q=lille&units=metric&lang=fr&APPID=0ee0d4b8649b53009c1d1c62a9964138')

// Instructions when the resquest is full load
xhr.onload = function (e) {
  // If the status of the request is 4 or full load
  if (xhr.readyState === 4) {
    // check the server's response
    if (xhr.status === 200) {
      if (xhr.responseType === '') {
        // translate the text response into a JSON objet. More easy to manipulate
        let response = JSON.parse(xhr.responseText)
        weatherDisplay(response)
        console.log(response)
      }
    }
  } else {
    console.error(xhr.statusText)
  }
}

// send me a error into the console if there is a error with the request
xhr.onerror = function (e) {
  console.log(xhr.statusText)
}

// send the new request
xhr.send()

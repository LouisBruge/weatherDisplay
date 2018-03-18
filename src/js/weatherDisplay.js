// A simple plugin JS to display the weather with the API of Openweathermap and the XMLHttpRequest

// create an XMLHttpRequest object
const xhr = new XMLHttpRequest()

// open a new request
xhr.open('GET', 'http://api.openweathermap.org/data/2.5/weather?q=lille&units=metric&APPID=0ee0d4b8649b53009c1d1c62a9964138')

xhr.onload = function (e) {
  // If the status of the request is 4 or full load
  if (xhr.readyState === 4) {
    // check the server's response
    if (xhr.status === 200) {
      if (xhr.responseType === '') {
        // translate the text response into a JSON objet. More easy to manipulate
        let response = JSON.parse(xhr.responseText)
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

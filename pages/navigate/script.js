const locationNameElement = document.querySelector('#location-name');
const distanceElement = document.querySelector('#distance');

const coordinatesParam = getQueryParam('coordinates').split(',');
const coordinates = {
  latitude: parseFloat(coordinatesParam[0]),
  longitude: parseFloat(coordinatesParam[1]),
}

const locationName = getQueryParam('locationName');
locationNameElement.innerText = locationName;

const nextPage = getQueryParam('nextPage');

localStorage.setItem('coordinates', coordinatesParam);
localStorage.setItem('locationName', locationName);
localStorage.setItem('nextPage', nextPage);

function success(position) {
  const distance = getDistance(position.coords.latitude, position.coords.longitude, coordinates.latitude, coordinates.longitude).distance;
  distanceElement.innerText = distance;

  if (distance < 20) {
    location.assign(`../${nextPage}/index.html`)
  }
}

function error(err) {
  console.warn('ERROR(' + err.code + '): ' + err.message);
}

const options = {
  enableHighAccuracy: true,
  timeout: 20000,
  maximumAge: 0
};

// check if page lives in the test iframe
if (isInIframe()) {
  // get map gps positions
  function handleMessage (evt) {
  	success({coords: {latitude: evt.data.lat, longitude: evt.data.lng}});
  }
  window.addEventListener("message", handleMessage, false);
  parent.postMessage({message: "navigate-init"}, "*");
  parent.postMessage({message: "navigate-localstorage", coordinates: coordinatesParam, locationName, nextPage}, "*");
} else {
  // access real gps data
  navigator.geolocation.watchPosition(success, error, options);
}

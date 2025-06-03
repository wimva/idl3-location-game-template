/*
Gebruik:

Om een geofence te starten gebruik je de startGeofence functie met:
Eerste argument: latitude van de locatie (number, required)
Tweede argument: longitude van de locatie (number, required)
Derde argument: de straal in meter (number, required)
Vierde argument: een functie die wordt aangeroepen wanneer je binnen de straal bent (function, required)
Vijfde argument: een functie die wordt aangeroepen wanneer je buiten de straal bent (function, optioneel)

Voorbeeld html:
<script defer src="../../scripts/get-distance.js"></script>
<script defer src="../../plugins/geofence.js"></script>

Voorbeeld js:
function onEnter() {
  console.log('Je bent in de buurt!');
}

function onExit() {
  console.log('Je hebt de zone verlaten');
}

startGeofence(51.219608, 4.411694, 20, onEnter, onExit);
*/

let geofenceWatchId = null;
let wasInside = false;

function startGeofence(lat, lon, radius, onEnter, onExit) {
  if (!navigator.geolocation) {
    alert('Geolocatie niet beschikbaar.');
    return;
  }

  const options = {
    enableHighAccuracy: true,
    timeout: 20000,
    maximumAge: 0
  };

  function success(position) {
    const distance = getDistance(position.coords.latitude, position.coords.longitude, lat, lon).distance;
    const isInside = distance <= radius;

    if (isInside && !wasInside) {
      if (onEnter) onEnter();
    } else if (!isInside && wasInside) {
      if (onExit) onExit();
    }

    wasInside = isInside;
  }

  function error(err) {
    console.warn('ERROR(' + err.code + '): ' + err.message);
  }

  geofenceWatchId = navigator.geolocation.watchPosition(success, error, options);
}

function stopGeofence() {
  if (geofenceWatchId !== null) {
    navigator.geolocation.clearWatch(geofenceWatchId);
    geofenceWatchId = null;
    wasInside = false;
  }
}

// iframe

const iframeElement = document.querySelector('#iframe');
const nextPage = localStorage.getItem('nextPage');
const coordinates = localStorage.getItem('coordinates');
const locationName = localStorage.getItem('locationName');

if (nextPage) {
  iframeElement.src = `./pages/navigate/index.html?coordinates=${coordinates}&locationName=${locationName}&nextPage=${nextPage}`;
} else {
  iframeElement.src = './pages/start/index.html';
}

// map

mapboxgl.accessToken = mapboxAccessToken;

const startCoordinates = {
  lat: 51.219608,
  lng: 4.411694
};

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [startCoordinates.lng, startCoordinates.lat],
  zoom: 15
});

const marker = new mapboxgl.Marker({
  draggable: true
})
.setLngLat([startCoordinates.lng, startCoordinates.lat])
.addTo(map);

let markerCoordinates = startCoordinates;

function onDragEnd() {
  markerCoordinates = marker.getLngLat();
  iframeElement.contentWindow.postMessage(markerCoordinates, "*");
}

marker.on('dragend', onDragEnd);

// listen to messages from iframe

function handleMessage (evt) {
  if (evt.data.message === 'navigate-init') {
    iframeElement.contentWindow.postMessage(markerCoordinates, "*");
  }
  if (evt.data.message === 'navigate-localstorage') {
    localStorage.setItem('coordinates', evt.data.coordinates);
    localStorage.setItem('locationName', evt.data.locationName);
    localStorage.setItem('nextPage', evt.data.nextPage);
  }
}
window.addEventListener("message", handleMessage, false);

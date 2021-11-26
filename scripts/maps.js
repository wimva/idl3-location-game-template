function createMap(myID, lat, lng, zoom, styled) {
    lat = typeof lat !== "undefined" ? lat : 51.219608;
    lng = typeof lng !== "undefined" ? lng : 4.411694;
    zoom = typeof zoom !== "undefined" ? zoom : 15;
    styled = typeof styled !== "undefined" ? styled : "mapbox://styles/mapbox/streets-v11";

    mapboxgl.accessToken = mapboxAccessToken;

    const startCoordinates = {
      lat: lat,
      lng: lng,
    };

    const map = new mapboxgl.Map({
      container: myID,
      style: styled,
      center: [startCoordinates.lng, startCoordinates.lat],
      zoom: zoom
    });

    return map;
  }
  function createMarker(map, className, myWidth, myHeight, image, lat, lng, draggable) {
    draggable = typeof draggable !== "undefined" ? draggable : false;
    const el = document.createElement("div");
    el.className = className;
    el.style.backgroundImage = `url(`+image+`)`;
    el.style.width = `${myWidth}px`;
    el.style.height = `${myHeight}px`;
    el.style.backgroundSize = "100%";

    const marker = new mapboxgl.Marker(el, {
      draggable: draggable
    }).setLngLat([lng,lat]).addTo(map);
  }

  const myMap = createMap("map", 51.219608, 4.411694, 10, 'mapbox://styles/matthekim/ckv6gc88y0c9u15t5ppk1horn');
  createMarker(myMap, 'marker',20, 30, "https://driesvannoten-la.com/img/pin.svg",51.219608,4.411694, false);

// Degrees to Radians
function degreesToRadians(degrees) {
  return degrees * Math.PI / 180;
}

// Redians to Degrees
function radiansToDegrees(radians) {
  return radians * 180 / Math.PI;
}

// Calculate Distance Between LatLongs
function getDistance(lat1, lon1, lat2, lon2) {
  const earthRadiusKm = 6371;

  const dLat = degreesToRadians(lat2 - lat1);
  const dLon = degreesToRadians(lon2 - lon1);

  const lat1rad = degreesToRadians(lat1);
  const lat2rad = degreesToRadians(lat2);
  const lon1rad = degreesToRadians(lon1);
  const lon2rad = degreesToRadians(lon2);

  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
          + Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1rad) * Math.cos(lat2rad);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = Math.round((earthRadiusKm * c) * 1000);

  const y = Math.sin(lon2rad - lon1rad) * Math.cos(lat2rad);
  const x = Math.cos(lat1rad) * Math.sin(lat2rad)
        - Math.sin(lat1rad) * Math.cos(lat2rad) * Math.cos(lon2rad - lon1rad);
  let brng = Math.atan2(y, x);
  brng = radiansToDegrees(brng);

  const bearing = Math.round((brng + 360) % 360);

  return {
    distance,
    bearing,
  };
}

// Convert Bearing
function convertBearing(bearing) {
  let result = '';
  if (bearing < 22.5) {
    result = 'N';
  } else if (bearing > 22.5 && bearing < 67.5) {
    result = 'NE';
  } else if (bearing > 67.5 && bearing < 112.5) {
    result = 'E';
  } else if (bearing > 112.5 && bearing < 157.5) {
    result = 'SE';
  } else if (bearing > 157.5 && bearing < 202.5) {
    result = 'S';
  } else if (bearing > 202.5 && bearing < 247.5) {
    result = 'SW';
  } else if (bearing > 247.5 && bearing < 292.5) {
    result = 'W';
  } else if (bearing > 292.5 && bearing < 337.5) {
    result = 'NW';
  } else if (bearing > 337.5) {
    result = 'N';
  }

  return result;
}

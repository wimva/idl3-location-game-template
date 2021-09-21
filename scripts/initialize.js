const nextPage = localStorage.getItem('nextPage');
const coordinates = localStorage.getItem('coordinates');
const locationName = localStorage.getItem('locationName');

if (nextPage) {
  location.assign(`./pages/navigate/index.html?coordinates=${coordinates}&locationName=${locationName}&nextPage=${nextPage}`)
} else {
  location.assign('./pages/start/index.html');
}

const startButton = document.querySelector('#start-button');

startButton.onclick = () => {
  const coordinates = '51.203275,4.450912'
  const locationName = 'Boelaerpark';
  const nextPage = 'stop1';
  location.assign(`../navigate/index.html?coordinates=${coordinates}&locationName=${locationName}&nextPage=${nextPage}`)
}

function callback(base64) {
  console.log('the image was captured');
  console.log(base64);
}

startCamera(true, '#video', '#canvas', '#capture', callback);

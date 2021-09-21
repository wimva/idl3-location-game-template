const continueButton = document.querySelector('#continue-button');

continueButton.onclick = () => {
  const coordinates = '51.210901,4.416229'
  const locationName = 'Stadspark';
  const nextPage = 'stop3';
  location.assign(`../navigate/index.html?coordinates=${coordinates}&locationName=${locationName}&nextPage=${nextPage}`)
}

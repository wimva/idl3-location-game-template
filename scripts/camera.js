let videoElement = null;
let canvasElement = null;
let captureButton = null;

async function startCamera(videoSelector, canvasSelector, captureSelector, onClickFunction) {
  videoElement = document.querySelector(videoSelector);
  canvasElement = document.querySelector(canvasSelector);
  captureButton = document.querySelector(captureSelector);

  if (!videoElement) console.error('camera.js: Video selector could not find a valid element');
  if (!canvasElement) console.error('camera.js: Canvas selector could not find a valid element');
  if (!captureButton) console.error('camera.js: Capture Button selector could not find a valid element');

  let stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
	videoElement.srcObject = stream;

  captureButton.onclick = () => {
    canvasElement.getContext('2d').drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);
    let imageBase64 = canvasElement.toDataURL('image/jpeg');

    if (onClickFunction) onClickFunction(imageBase64);
  };
};

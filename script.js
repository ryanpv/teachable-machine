const STATUS = document.getElementById('status');
const VIDEO = document.getElementById('webcam');
const ENABLE_CAM_BUTTON = document.getElementById('enableCam');
const DISABLE_CAM_BUTTON = document.getElementById('disableCam');
const RESET_BUTTON = document.getElementById('reset');
const TRAIN_BUTTON = document.getElementById('train');
const MOBILE_NET_INPUT_WIDTH = 224;
const MOBILE_NET_INPUT_HEIGHT = 224;
const STOP_DATA_GATHER = -1;
const CLASS_NAMES = [];


ENABLE_CAM_BUTTON.addEventListener('click', enableCam);
DISABLE_CAM_BUTTON.addEventListener('click', disableCam);

let videoPlaying = false;

// Check if browser supports media/webcam access
function hasGetUserMedia() {
  return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
};


function enableCam() {
  console.log("Enabling webcam")
  if (hasGetUserMedia()) {
    // constraint parameters for the webcam stream
    const constraints = {
      video: true,
      width: 640, 
      height: 480 
    };
 
    // start webcam stream
    navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
      VIDEO.srcObject = stream;
      VIDEO.addEventListener('loadeddata', function() {
        ENABLE_CAM_BUTTON.classList.add('removed');
        DISABLE_CAM_BUTTON.classList.remove('removed');
      });
      
      videoPlaying = true;
    });
  } else {
    console.warn('getUserMedia() is not supported by your browser');
  }
};


async function disableCam() {
  console.log("Disabling webcam.")

  let currentVideoStream = VIDEO.srcObject;

  if (currentVideoStream) {
    currentVideoStream.getTracks().forEach(track => track.stop());

    VIDEO.srcObject = null;
    videoPlaying = false;

    ENABLE_CAM_BUTTON.classList.remove('removed');
    DISABLE_CAM_BUTTON.classList.add('removed');
  } else {
    console.log("Webcam is not active")
  }
};
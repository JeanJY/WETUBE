const startBtn = document.getElementById("startBtn");
const previewVideo = document.getElementById("preview");

let stream;
let recorder;

const handleDownload = () => {};

const handleStopRecording = () => {
  startBtn.innerText = "Download Recording";
  startBtn.removeEventListener("click", handleStopRecording);
  startBtn.addEventListener("click", handleDownload);
  recorder.stop();
};

const handleStartRecording = () => {
  startBtn.innerText = "Stop Recording";
  startBtn.removeEventListener("click", handleStartRecording);
  startBtn.addEventListener("click", handleStopRecording);

  recorder = new MediaRecorder(stream);
  recorder.ondataavailable = (event) => {
    const videoFile = URL.createObjectURL(event.data);
    previewVideo.srcObject = null;
    previewVideo.src = videoFile;
    previewVideo.loop = true;
    previewVideo.play();
  };
  recorder.start();
};

const init = async () => {
  stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: true,
  });
  previewVideo.srcObject = stream;
  previewVideo.play();
};

init();

startBtn.addEventListener("click", handleStartRecording);

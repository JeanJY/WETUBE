const startBtn = document.getElementById("startBtn");
const previewVideo = document.getElementById("preview");

let stream;

const handleStopRecording = () => {
  startBtn.innerText = "Start Recording";
  startBtn.removeEventListener("click", handleStopRecording);
  startBtn.addEventListener("click", handleStartRecording);
};

const handleStartRecording = () => {
  startBtn.innerText = "Stop Recording";
  startBtn.removeEventListener("click", handleStartRecording);
  startBtn.addEventListener("click", handleStopRecording);

  const recorder = new MediaRecorder(stream);
  recorder.ondataavailable = (e) => {
    console.log("recording done");
    console.log(e);
    console.log(e.data);
  };
  console.log(recorder);
  recorder.start();
  console.log(recorder);
  setTimeout(() => {
    recorder.stop();
  }, 10000);
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

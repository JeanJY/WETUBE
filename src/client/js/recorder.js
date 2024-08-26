const startBtn = document.getElementById("startBtn");
const previewVideo = document.getElementById("preview");

const handleStartRecording = async () => {
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: true,
  });
  previewVideo.srcObject = stream;
  previewVideo.play();
};

startBtn.addEventListener("click", handleStartRecording);

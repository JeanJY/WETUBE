const startBtn = document.getElementById("startBtn");
const previewVideo = document.getElementById("preview");

let stream;
let recorder;
let videoFile;

const handleDownload = () => {
  const a = document.createElement("a");
  a.href = videoFile;
  a.download = "MyRecording.webm";
  document.body.appendChild(a);
  a.click();
};

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

  previewVideo.hidden = false; // 비디오 요소를 보이게 함

  navigator.mediaDevices
    .getUserMedia({ audio: false, video: true })
    .then((mediaStream) => {
      stream = mediaStream;
      previewVideo.srcObject = stream;
      previewVideo.play();

      recorder = new MediaRecorder(stream, { mimeType: "video/webm" });
      recorder.ondataavailable = (event) => {
        videoFile = URL.createObjectURL(event.data);
        previewVideo.srcObject = null;
        previewVideo.src = videoFile;
        previewVideo.loop = true;
        previewVideo.play();
      };
      recorder.start();
    })
    .catch((error) => {
      console.error("Error accessing media devices.", error);
    });
};

startBtn.addEventListener("click", handleStartRecording);

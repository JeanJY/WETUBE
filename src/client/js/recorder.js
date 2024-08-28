import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";

const startBtn = document.getElementById("startBtn");
const previewVideo = document.getElementById("preview");

let stream;
let recorder;
let videoFile;

const handleDownload = async () => {
  const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd";
  const ffmpeg = new FFmpeg();
  ffmpeg.on("log", ({ message }) => {
    console.log(message);
  });
  await ffmpeg.load({
    coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
    wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, "application/wasm"),
  });

  await ffmpeg.writeFile("recording.webm", await fetchFile(videoFile));
  await ffmpeg.exec(["-i", "recording.webm", "-r", "60", "output.mp4"]);
  const mp4File = await ffmpeg.readFile("output.mp4");
  const mp4Blob = new Blob([mp4File.buffer], { type: "video/mp4" });
  const mp4Url = URL.createObjectURL(mp4Blob);

  const a = document.createElement("a");
  a.href = mp4Url;
  a.download = "MyRecording.mp4";
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

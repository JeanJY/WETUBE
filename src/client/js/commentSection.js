const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");

const handleSubmit = (event) => {
  event.preventDefault();
  const videoId = videoContainer.dataset.id;
  const textarea = form.querySelector("textarea");
  const text = textarea.value.trim();
  if (text === "") {
    return;
  }
  fetch(`/api/videos/${videoId}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }), // 자바스크립트 오브젝트를 받아서 string으로 바꿔서 인터넷으로 보내고 Server.js로 가면 ("JavaScript object → JSON string )->
  });
  textarea.value = "";
};

if (form) {
  form.addEventListener("submit", handleSubmit);
}

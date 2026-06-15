const API_URL = "https://script.google.com/macros/s/AKfycbx4nwxkquh5_eIcRh0IjGzgKJXaKT2hZdw_f8BFUZmhUuNhDnRaRynp5skEsCY2083l/exec";
let isSubmitting = false;

function submitReport() {
  if (isSubmitting) {
    return;
  }

  const reporter = document.getElementById("reporter").value.trim();
  const target = document.getElementById("target").value.trim();
  const reason = document.getElementById("reason").value.trim();
  const photo = document.getElementById("photo").files[0];

  const submitBtn = document.getElementById("submitBtn");
  const loadingText = document.getElementById("loadingText");

  if (!reporter || !target || !reason) {
    console.log("신고자, 신고 대상자, 사유를 모두 입력하세요.");
    return;
  }

  isSubmitting = true;
  submitBtn.disabled = true;
  submitBtn.textContent = "전송 중...";
  loadingText.style.display = "block";

  const data = {
    reporter: reporter,
    target: target,
    reason: reason,
    report_date: new Date().toLocaleString("ko-KR", {
      timeZone: "Asia/Seoul"
    }),
    photo: null
  };

  if (photo) {
    const reader = new FileReader();

    reader.onload = function () {
      data.photo = {
        name: photo.name,
        type: photo.type,
        content: reader.result.split(",")[1]
      };

      sendToSheet(data);
    };

    reader.onerror = function () {
      console.log("사진 읽기 실패");

      isSubmitting = false;
      submitBtn.disabled = false;
      submitBtn.textContent = "전송";
      loadingText.style.display = "none";
    };

    reader.readAsDataURL(photo);
  } else {
    sendToSheet(data);
  }
}

function sendToSheet(data) {
  fetch(API_URL, {
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify(data)
  })
    .then(() => {
      console.log("전송 요청 완료:", data);

      document.getElementById("reporter").value = "";
      document.getElementById("target").value = "";
      document.getElementById("reason").value = "";
      document.getElementById("photo").value = "";
    })
    .catch(error => {
      console.log("전송 실패:", error);
    })
    .finally(() => {
      isSubmitting = false;

      const submitBtn = document.getElementById("submitBtn");
      const loadingText = document.getElementById("loadingText");

      submitBtn.disabled = false;
      submitBtn.textContent = "전송";
      loadingText.style.display = "none";
    });
}

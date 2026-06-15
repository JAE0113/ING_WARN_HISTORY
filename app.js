const API_URL = "https://script.google.com/macros/s/AKfycbyt5PPGqg2Y2ESqn2JFicKN36dyy7G6ri2glw2J3PYZeEJa6LHPUX0hQwGQaAgPFtHa/exec";
let isSubmitting = false;

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

function submitReport() {
  if (isSubmitting) return;

  const reporter = document.getElementById("reporter").value.trim();
  const target = document.getElementById("target").value.trim();
  const reason = document.getElementById("reason").value.trim();
  const photo = document.getElementById("photo").files[0];

  const submitBtn = document.getElementById("submitBtn");
  const loadingText = document.getElementById("loadingText");

  if (!reporter || !target || !reason) {
    showToast("신고자, 신고 대상자, 사유를 모두 입력하세요.");
    return;
  }

  isSubmitting = true;
  submitBtn.disabled = true;
  submitBtn.textContent = "전송 중...";
  loadingText.style.display = "block";

  const data = {
    reporter,
    target,
    reason,
    report_date: new Date().toLocaleString("ko-KR", {
      timeZone: "Asia/Seoul"
    }),
    photo: null
  };

  if (photo) {
    compressImage(photo, 1280, 0.75)
      .then(compressed => {
        data.photo = compressed;
        sendToSheet(data);
      })
      .catch(error => {
        console.log("사진 압축 실패:", error);
        resetSubmitState();
      });
  } else {
    sendToSheet(data);
  }
}

function compressImage(file, maxWidth, quality) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = function (event) {
      const img = new Image();

      img.onload = function () {
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        const dataUrl = canvas.toDataURL("image/jpeg", quality);

        resolve({
          name: file.name.replace(/\.[^/.]+$/, "") + ".jpg",
          type: "image/jpeg",
          content: dataUrl.split(",")[1]
        });
      };

      img.onerror = reject;
      img.src = event.target.result;
    };

    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function sendToSheet(data) {
  fetch(API_URL, {
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify(data)
  })
    .then(() => {
      showToast("전송 요청 완료");
      console.log("전송 요청 완료:", {
        reporter: data.reporter,
        target: data.target,
        reason: data.reason,
        report_date: data.report_date,
        has_photo: !!data.photo
      });

      document.getElementById("reporter").value = "";
      document.getElementById("target").value = "";
      document.getElementById("reason").value = "";
      document.getElementById("photo").value = "";
    })
    .catch(error => {
      showToast("전송 실패");
      console.log("전송 실패:", error);
    })
    .finally(() => {
      resetSubmitState();
    });
}

function resetSubmitState() {
  isSubmitting = false;

  const submitBtn = document.getElementById("submitBtn");
  const loadingText = document.getElementById("loadingText");

  submitBtn.disabled = false;
  submitBtn.textContent = "전송";
  loadingText.style.display = "none";
}

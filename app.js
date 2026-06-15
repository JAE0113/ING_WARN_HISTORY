const API_URL = "https://script.google.com/macros/s/AKfycbx4nwxkquh5_eIcRh0IjGzgKJXaKT2hZdw_f8BFUZmhUuNhDnRaRynp5skEsCY2083l/exec";

function submitReport() {
  const reporter = document.getElementById("reporter").value.trim();
  const target = document.getElementById("target").value.trim();
  const reason = document.getElementById("reason").value.trim();
  const photo = document.getElementById("photo").files[0];

  if (!reporter || !target || !reason) {
    console.log("신고자, 신고 대상자, 사유를 모두 입력하세요.");
    return;
  }

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
    });
}

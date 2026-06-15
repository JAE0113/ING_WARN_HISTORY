const API_URL = "https://script.google.com/macros/s/AKfycbwIQpnhkT6j3EFUTdjLq6VuRvD-470X2ZhBKZId21T7dvVI-fmEzWQwIvnInJiq8MNn/exec";

function submitReport() {
  const reporter = document.getElementById("reporter").value.trim();
  const target = document.getElementById("target").value.trim();
  const reason = document.getElementById("reason").value.trim();

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
    })
  };

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
    })
    .catch(error => {
      console.log("전송 실패:", error);
    });
}

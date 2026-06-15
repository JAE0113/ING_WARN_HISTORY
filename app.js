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
    created_at: new Date().toLocaleString("ko-KR", {
      timeZone: "Asia/Seoul"
    })
  };

  console.log("전송 데이터:", data);

  document.getElementById("reporter").value = "";
  document.getElementById("target").value = "";
  document.getElementById("reason").value = "";
}

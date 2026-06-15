const API_URL = "https://script.google.com/macros/s/AKfycbxoRAumfciiW6uOyrgl6ngnR8bIXeKSjOX_bhAwT0jinT3HRLy_NP5yBQqvDvXdJ_3W/exec";

function submitData() {
  const pw = document.getElementById("pw").value.trim();
  const name = document.getElementById("name").value.trim();
  const reason = document.getElementById("reason").value.trim();

  const message = document.getElementById("message");
  const result = document.getElementById("result");

  if (!pw) {
    message.textContent = "비밀번호를 입력하세요.";
    message.style.color = "red";
    return;
  }

  if (!name || !reason) {
    message.textContent = "이름과 사유를 모두 입력하세요.";
    message.style.color = "red";
    return;
  }

  const data = {
    password: pw,
    name: name,
    reason: reason,
    warning_date: new Date().toLocaleString("ko-KR", {
      timeZone: "Asia/Seoul"
    })
  };

  fetch(API_URL, {
    method: "POST",
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(resultData => {
      if (!resultData.success) {
        message.textContent = resultData.message || "저장 실패";
        message.style.color = "red";
        return;
      }

      message.textContent = "저장 완료";
      message.style.color = "green";
      result.textContent = JSON.stringify(data, null, 2);
    })
    .catch(error => {
      message.textContent = "요청 중 오류가 발생했습니다.";
      message.style.color = "red";
      console.error(error);
    });
}

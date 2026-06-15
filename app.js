const API_URL = "https://script.google.com/macros/s/AKfycbyv5c66Hs64nIka_-BbSK2s4DB0Wy_GbkKWHiOjeKSVjA6s9PZ4oq2OdZPCRipBslvd/exec";

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
    mode: "no-cors",
    body: JSON.stringify(data)
  })
    .then(() => {
      message.textContent = "저장 요청 완료";
      message.style.color = "green";

      result.textContent = JSON.stringify(
        {
          name: data.name,
          reason: data.reason,
          warning_date: data.warning_date
        },
        null,
        2
      );

      document.getElementById("pw").value = "";
      document.getElementById("name").value = "";
      document.getElementById("reason").value = "";
    })
    .catch(error => {
      message.textContent = "요청 중 오류가 발생했습니다.";
      message.style.color = "red";
      console.error(error);
    });
}

const PASSWORD = "1234";

function submitData() {
  const pw = document.getElementById("pw").value.trim();
  const name = document.getElementById("name").value.trim();
  const reason = document.getElementById("reason").value.trim();

  const message = document.getElementById("message");
  const result = document.getElementById("result");

  if (pw !== PASSWORD) {
    message.textContent = "비밀번호가 틀렸습니다.";
    message.style.color = "red";
    return;
  }

  if (!name || !reason) {
    message.textContent = "이름과 사유를 모두 입력하세요.";
    message.style.color = "red";
    return;
  }

  const data = {
    name: name,
    reason: reason,
    created_at: new Date().toISOString()
  };

  message.textContent = "입력 완료";
  message.style.color = "green";

  result.textContent = JSON.stringify(data, null, 2);

  // 현재 예제는 저장 없이 화면에만 표시
  console.log(data);
}

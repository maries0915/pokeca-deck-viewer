function show() {
  const code = document.getElementById("deck").value.trim();
  const output = document.getElementById("result");
  output.textContent = "";

  if (!code) return;

  const iframe = document.createElement("iframe");
  iframe.style.display = "none";
  iframe.src = "https://www.pokemon-card.com/deck/confirm.html";

  iframe.onload = () => {
    try {
      const win = iframe.contentWindow;

      // 公式のデッキデコード関数を呼ぶ
      const deck = win.DeckCode.decode(code);

      const lines = deck.map(c => {
        return `${c.card_name} ×${c.num}`;
      });

      output.textContent = lines.join("\n");
      document.body.removeChild(iframe);

    } catch (e) {
      output.textContent = "デコード失敗（公式仕様変更の可能性あり）";
      document.body.removeChild(iframe);
    }
  };

  document.body.appendChild(iframe);
}
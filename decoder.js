function decodeDeck(code) {
  // Base64URL → Uint8Array
  const base64 = code.replace(/-/g, "+").replace(/_/g, "/");
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }

  // zlib 展開
  const jsonText = new TextDecoder().decode(pako.inflate(bytes));

  // JSON 解析
  return JSON.parse(jsonText);
}

function show() {
  const code = document.getElementById("deck").value.trim();
  const out = document.getElementById("result");
  out.textContent = "";

  if (!code) return;

  try {
    const deck = decodeDeck(code);

    const lines = deck.cards.map(c => {
      return `${c.card_name} ×${c.num}`;
    });

    out.textContent = lines.join("\n");

  } catch (e) {
    out.textContent = "デコード失敗（無効なデッキコード）";
  }
}
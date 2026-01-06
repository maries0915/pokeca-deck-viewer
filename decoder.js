// ===== Pokeca Deck Code Decoder (Browser Safe) =====
function decodeDeck(code) {
  const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_";
  let bits = "";
  for (const c of code) {
    const v = chars.indexOf(c);
    bits += v.toString(2).padStart(6, "0");
  }

  let i = 0;
  const read = (n) => {
    const v = parseInt(bits.slice(i, i + n), 2);
    i += n;
    return v;
  };

  const cardCount = read(8);
  const result = [];

  for (let c = 0; c < cardCount; c++) {
    const count = read(4);
    const set = read(10);
    const number = read(10);
    result.push({
      id: `SV${set}-${number.toString().padStart(3, "0")}`,
      count
    });
  }
  return result;
}

// ===== 仮カードDB（次ステップで拡張）=====
const cardDB = {
  "SV8-117": "サーフゴーex",
  "SV7-024": "コレクレー",
  "SV7-025": "コレクレー",
  "SV8-118": "ゲンガーex"
};

// ===== 表示 =====
function show() {
  const code = document.getElementById("deck").value.trim();
  const cards = decodeDeck(code);

  document.getElementById("result").textContent =
    cards.map(c => `${cardDB[c.id] ?? c.id} ×${c.count}`).join("\n");
}
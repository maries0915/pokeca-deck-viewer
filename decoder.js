// ===== Pokeca Deck Code Decoder (Browser Safe) =====
function decodeDeck(code) {
  const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_";
  let bits = "";

  for (const c of code) {
    const v = chars.indexOf(c);
    if (v < 0) continue; // 安全装置
    bits += v.toString(2).padStart(6, "0");
  }

  let i = 0;
  const read = (n) => {
    if (i + n > bits.length) return null;
    const v = parseInt(bits.slice(i, i + n), 2);
    i += n;
    return v;
  };

  const cardCount = read(8);
  if (cardCount === null) return [];

  const result = [];

  for (let c = 0; c < cardCount; c++) {
    const count = read(4);
    const set = read(10);
    const number = read(10);

    // ★ NaN・null対策（超重要）
    if (
      count === null ||
      set === null ||
      number === null ||
      Number.isNaN(count) ||
      Number.isNaN(set) ||
      Number.isNaN(number)
    ) {
      break;
    }

    result.push({
      id: `SV${set}-${number.toString().padStart(3, "0")}`,
      count
    });
  }

  return result;
}

// ===== 表示 =====
function show() {
  const code = document.getElementById("deck").value.trim();
  const resultElm = document.getElementById("result");
  resultElm.textContent = "";

  if (!code) return;

  const cards = decodeDeck(code);

  const lines = cards.map(c => {
    const name = cardDB?.[c.id];
    return name
      ? `${name} ×${c.count}`
      : `${c.id} ×${c.count}`;
  });

  resultElm.textContent = lines.join("\n");
}
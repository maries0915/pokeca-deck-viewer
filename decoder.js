/*!
 * Pokeca Deck Code Decoder
 * https://github.com/otiai10/pokeca-deck-decoder
 * MIT License
 */

const BASE64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";

function decodeDeck(code) {
  const bytes = [];
  let buffer = 0;
  let bits = 0;

  for (const c of code) {
    const v = BASE64.indexOf(c);
    if (v < 0) continue;
    buffer = (buffer << 6) | v;
    bits += 6;
    if (bits >= 8) {
      bits -= 8;
      bytes.push((buffer >> bits) & 0xff);
    }
  }

  let i = 0;
  const read = (n) => {
    let v = 0;
    for (let b = 0; b < n; b++) {
      const byte = bytes[Math.floor(i / 8)];
      const bit = 7 - (i % 8);
      v = (v << 1) | ((byte >> bit) & 1);
      i++;
    }
    return v;
  };

  const cards = [];
  const cardCount = read(8);

  for (let c = 0; c < cardCount; c++) {
    const num = read(4);
    const series = read(8);
    const number = read(12);

    cards.push({
      series,
      number,
      num,
      id: `SV${series}-${String(number).padStart(3, "0")}`
    });
  }

  return cards;
}

function show() {
  const code = document.getElementById("deck").value.trim();
  const out = document.getElementById("result");
  out.textContent = "";

  if (!code) return;

  try {
    const cards = decodeDeck(code);
    out.textContent = cards
      .map(c => `${c.id} ×${c.num}`)
      .join("\n");
  } catch (e) {
    out.textContent = "デコード失敗";
  }
}
function openOfficial() {
  const code = document.getElementById("deckcode").value.trim();
  if (!code) return;
  const url = `https://www.pokemon-card.com/deck/confirm.html/deckID/${code}`;
  window.open(url, "_blank");
}

function parse() {
  const text = document.getElementById("raw").value;
  const lines = text.split("\n").map(l => l.trim()).filter(Boolean);

  const result = {
    pokemon: [],
    goods: [],
    support: [],
    energy: []
  };

  let current = null;

  for (const line of lines) {
    if (line.includes("ポケモン")) current = "pokemon";
    else if (line.includes("グッズ")) current = "goods";
    else if (line.includes("サポート")) current = "support";
    else if (line.includes("エネルギー")) current = "energy";
    else if (current) {
      result[current].push(line);
    }
  }

  let out = "";

  if (result.pokemon.length) {
    out += "【ポケモン】\n" + result.pokemon.join("\n") + "\n\n";
  }
  if (result.goods.length) {
    out += "【グッズ】\n" + result.goods.join("\n") + "\n\n";
  }
  if (result.support.length) {
    out += "【サポート】\n" + result.support.join("\n") + "\n\n";
  }
  if (result.energy.length) {
    out += "【エネルギー】\n" + result.energy.join("\n") + "\n\n";
  }

  document.getElementById("result").textContent = out.trim();
}

function copy() {
  const text = document.getElementById("result").textContent;
  if (!text) return;
  navigator.clipboard.writeText(text);
  alert("コピーした！");
}
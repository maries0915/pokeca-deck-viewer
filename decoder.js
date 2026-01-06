function decodeDeck(code) {
  return [
    { id: "SV8a-117", count: 4 },
    { id: "SV7a-024", count: 3 }
  ];
}

const cardDB = {
  "SV8a-117": "サーフゴーex",
  "SV7a-024": "コレクレー"
};

function show() {
  const code = document.getElementById("deck").value.trim();
  const cards = decodeDeck(code);

  document.getElementById("result").textContent =
    cards.map(c => `${cardDB[c.id]} ×${c.count}`).join("\n");
}
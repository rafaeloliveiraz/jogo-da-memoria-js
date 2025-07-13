// Variáveis
const emojis = [
  "🐶",
  "🐶",
  "🐭",
  "🐭",
  "🐰",
  "🐰",
  "🐨",
  "🐨",
  "🐸",
  "🐸",
  "🐯",
  "🐯",
  "🐷",
  "🐷",
  "🐵",
  "🐵",
];
let openCards = [];
let shuffleEmojis = emojis.sort(() => (Math.random() > 0.5 ? 2 : -1));

// console.log(shuffleEmojis);

// Criar e posicionar itens
for (let i = 0; i < emojis.length; i++) {
  let box = document.createElement("div");
  box.className = "item";
  box.innerHTML = shuffleEmojis[i];
  box.onclick = handleClick;
  document.querySelector(".game").appendChild(box);
}

// Abre Cartas clicadas
function handleClick() {
  // Ignora clique se já estiver aberta ou se já foi combinada
  if (
    this.classList.contains("boxOpen") ||
    this.classList.contains("boxMatch") ||
    openCards.includes(this)
  ) {
    return;
  }
  if (openCards.length < 2) {
    this.classList.add("boxOpen");
    openCards.push(this);
  }

  if (openCards.length == 2) {
    setTimeout(checkMatch, 500);
  }
}

// Verifica se deu match
function checkMatch() {
  if (openCards[0].innerHTML === openCards[1].innerHTML) {
    playSound("match");
    openCards[0].classList.add("boxMatch");
    openCards[1].classList.add("boxMatch");
  } else {
    // playSound("fail");
    openCards[0].classList.remove("boxOpen");
    openCards[1].classList.remove("boxOpen");
  }
  openCards = [];

  // Verifica se acertou todos
  if (document.querySelectorAll(".boxMatch").length === emojis.length) {
    alert("Parabéns, você venceu!");
    window.location.reload();
  }
}

// Audio para acerto
function playSound(soundName) {
  let audio = new Audio(`./src/audio/${soundName}.mp3`);
  audio.volume = 0.5;
  audio.play();
}

const audio = document.getElementById("lofi-audio");
const speech = document.getElementById("speech");

function playSound() {
    audio.play().then(() => {
        updateSpeech(`
          Som ambiente ativado 🎶<br>
          Deseja pausar o som ou continuar ouvindo?
          <div class="options">
            <button onclick="pauseSound()">⏸️ Pausar som</button>
            <button onclick="continueSound()">🎶 Continuar ouvindo</button>
          </div>
        `);
    }).catch((err) => {
        console.error("Erro ao tocar:", err);
        alert("Clique novamente para ativar o som.");
    });
}

function pauseSound() {
    audio.pause();
    updateSpeech(`
        Som pausado. Deseja voltar ao menu?
        <div class="options">
          <button onclick="returnToMenu()">🔄 Voltar ao menu</button>
          <button onclick="toggleSound()">▶️ Tocar som</button>
        </div>
      `);
}

function continueSound() {
    updateSpeech(`
        Ótimo! Continue aproveitando o som ambiente 🎵
        <div class="options">
          <button onclick="pauseSound()">⏸️ Pausar som</button>
        </div>
      `);
}

function declineSound() {
    updateSpeech(`
        Tudo bem, fique à vontade 😊<br>
        Deseja voltar ao menu?
        <div class="options">
          <button onclick="returnToMenu()">🔄 Voltar ao menu</button>
        </div>
      `);
}

function returnToMenu() {
    updateSpeech(`
        Olá, seja bem-vindo ao nosso site!<br>
        Temos som ambiente. Gostaria de escutar?
        <div class="options">
          <button onclick="playSound()">✅ Sim, quero ouvir</button>
          <button class="no-btn" onclick="declineSound()">❌ Não, obrigado</button>
        </div>
      `);
}

function toggleSound() {
    if (audio.paused) {
        audio.play();
        continueSound();
    } else {
        pauseSound();
    }
}

function updateSpeech(content) {
    speech.innerHTML = content;
}
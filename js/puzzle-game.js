const puzzle = document.getElementById('puzzle');
const nivelSelect = document.getElementById('nivel');
const timerDisplay = document.getElementById('timer');
const movimentosDisplay = document.getElementById('movimentos');

let ordem = [];
let tamanho = 3;
let imagemAtual = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=300&q=80';
let tempo = 0;
let movimentos = 0;
let cronometro;

function comecarJogo() {
    tamanho = parseInt(nivelSelect.value);
    clearInterval(cronometro);
    tempo = 0;
    movimentos = 0;
    timerDisplay.textContent = '0';
    movimentosDisplay.textContent = '0';
    document.getElementById('embaralharBtn').disabled = false;

    criarPecas();       // cria as peças na ordem correta
    embaralhar();       // embaralha imediatamente
    cronometro = setInterval(() => {
        tempo++;
        timerDisplay.textContent = tempo;
    }, 1000);
}

function criarPecas() {
    ordem = [];
    puzzle.innerHTML = '';
    puzzle.style.gridTemplateColumns = `repeat(${tamanho}, 100px)`;
    puzzle.style.gridTemplateRows = `repeat(${tamanho}, 100px)`;
    for (let i = 0; i < tamanho * tamanho; i++) {
        ordem.push(i);
    }
    renderizarPecas();
}

function embaralhar() {
    ordem.sort(() => Math.random() - 0.5);
    movimentos = 0;
    movimentosDisplay.textContent = '0';
    renderizarPecas();
}

function renderizarPecas() {
    puzzle.innerHTML = '';
    ordem.forEach((i, idx) => {
        const div = document.createElement('div');
        div.className = 'piece';
        div.draggable = true;
        div.style.width = '100px';
        div.style.height = '100px';
        div.dataset.index = idx;
        div.dataset.bg = i;
        const x = (i % tamanho) * 100;
        const y = Math.floor(i / tamanho) * 100;
        div.style.backgroundImage = `url('${imagemAtual}')`;
        div.style.backgroundSize = `${tamanho * 100}px ${tamanho * 100}px`;
        div.style.backgroundPosition = `-${x}px -${y}px`;

        div.addEventListener('dragstart', e => {
            e.dataTransfer.setData('from', idx);
        });

        div.addEventListener('dragover', e => e.preventDefault());

        div.addEventListener('drop', e => {
            const from = parseInt(e.dataTransfer.getData('from'));
            const to = idx;
            [ordem[from], ordem[to]] = [ordem[to], ordem[from]];
            movimentos++;
            movimentosDisplay.textContent = movimentos;
            renderizarPecas();
            verificarVitoria();
        });

        puzzle.appendChild(div);
    });
}

function verificarVitoria() {
    const venceu = ordem.every((val, idx) => val === idx);
    if (venceu) {
        clearInterval(cronometro);
        setTimeout(() => {
            alert(`Parabéns! Você completou o puzzle em ${tempo} segundos e ${movimentos} movimentos 🎉`);
        }, 100);
    }
}

iniciarJogo();
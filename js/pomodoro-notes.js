let tempo = 25 * 60;
let tempoInicial = 25 * 60;
let intervalo;
let pausado = false;

const timerEl = document.getElementById('timer');

function atualizarTimer() {
    const min = Math.floor(tempo / 60);
    const seg = tempo % 60;
    const texto = `${String(min).padStart(2, '0')}:${String(seg).padStart(2, '0')}`;
    timerEl.textContent = texto;
    document.title = `🍃 ${texto} – Modo Zen`;
}

function atualizarBarra() {
    const progresso = ((tempoInicial - tempo) / tempoInicial) * 100;
    document.getElementById('barra-progresso').style.width = `${progresso}%`;
}

function setTempo(minutos) {
    stopTimer();
    tempo = minutos * 60;
    tempoInicial = tempo;
    atualizarTimer();
    atualizarBarra();
}

function startTimer() {
    clearInterval(intervalo);
    pausado = false;
    intervalo = setInterval(() => {
        if (!pausado && tempo > 0) {
            tempo--;
            atualizarTimer();
            atualizarBarra();
        } else if (tempo === 0) {
            clearInterval(intervalo);
            atualizarBarra();
            document.getElementById('alarme').play();
            alert('Pomodoro concluído! Faça uma pausa. 🍵');
        }
    }, 1000);
}

function togglePause() {
    pausado = !pausado;
}

function stopTimer() {
    clearInterval(intervalo);
    tempo = 25 * 60;
    tempoInicial = tempo;
    atualizarTimer();
    atualizarBarra();
    pausado = false;
}

atualizarTimer();
atualizarBarra();

// Blocos de notas
let contador = 0;
const blocosSalvos = JSON.parse(localStorage.getItem('peace_blocos')) || [];
blocosSalvos.forEach(data => criarBloco(data.texto, data.titulo, data.cor, data.x, data.y));

document.getElementById('criar').addEventListener('click', () => {
    criarBloco('', '', '#ffffff', 100 + contador * 30, 100 + contador * 30);
    contador++;
});

function criarBloco(texto = '', titulo = '', cor = '#ffffff', x = 100, y = 100) {
    const bloco = document.createElement('div');
    bloco.className = 'bloco';
    bloco.style.left = `${x}px`;
    bloco.style.top = `${y}px`;
    bloco.style.background = cor;

    const fechar = document.createElement('button');
    fechar.className = 'fechar';
    fechar.innerHTML = '×';
    fechar.onclick = () => {
        bloco.remove();
        salvarBlocos();
    };

    const tituloInput = document.createElement('input');
    tituloInput.className = 'titulo';
    tituloInput.placeholder = 'Título';
    tituloInput.value = titulo;
    tituloInput.oninput = salvarBlocos;

    const textarea = document.createElement('textarea');
    textarea.value = texto;
    textarea.oninput = salvarBlocos;

    const paleta = document.createElement('div');
    paleta.style.position = 'absolute';
    paleta.style.bottom = '6px';
    paleta.style.left = '6px';
    paleta.style.display = 'flex';
    paleta.style.gap = '4px';

    const cores = [
        { nome: 'Branco', valor: '#ffffff' },
        { nome: 'Rosa', valor: '#fce4ec' },
        { nome: 'Azul claro', valor: '#e3f2fd' },
        { nome: 'Verde claro', valor: '#e8f5e9' },
        { nome: 'Bege', valor: '#fff3e0' }
    ];

    cores.forEach(corOp => {
        const botao = document.createElement('div');
        botao.title = corOp.nome;
        botao.style.width = '16px';
        botao.style.height = '16px';
        botao.style.borderRadius = '4px';
        botao.style.border = '1px solid #aaa';
        botao.style.background = corOp.valor;
        botao.style.cursor = 'pointer';

        botao.onclick = () => {
            bloco.style.background = corOp.valor;
            salvarBlocos();
        };

        paleta.appendChild(botao);
    });

    bloco.appendChild(fechar);
    bloco.appendChild(tituloInput);
    bloco.appendChild(textarea);
    bloco.appendChild(paleta);
    document.body.appendChild(bloco);

    tornarArrastavel(bloco);
    salvarBlocos();
}

function tornarArrastavel(el) {
    let offsetX, offsetY, arrastando = false;

    el.addEventListener('mousedown', (e) => {
        if (
            e.target.tagName === 'TEXTAREA' ||
            e.target.className === 'fechar' ||
            e.target.tagName === 'DIV' && e.target.parentElement.className === 'paleta' ||
            e.target.className === 'titulo'
        ) return;
        arrastando = true;
        offsetX = e.clientX - el.offsetLeft;
        offsetY = e.clientY - el.offsetTop;
        el.style.zIndex = 1000;
    });

    document.addEventListener('mousemove', (e) => {
        if (arrastando) {
            el.style.left = `${e.clientX - offsetX}px`;
            el.style.top = `${e.clientY - offsetY}px`;
        }
    });

    document.addEventListener('mouseup', () => {
        if (arrastando) {
            arrastando = false;
            el.style.zIndex = 1;
            salvarBlocos();
        }
    });
}

function salvarBlocos() {
    const blocos = document.querySelectorAll('.bloco');
    const dados = Array.from(blocos).map(bloco => {
        return {
            texto: bloco.querySelector('textarea').value,
            titulo: bloco.querySelector('.titulo').value,
            cor: bloco.style.background,
            x: parseInt(bloco.style.left),
            y: parseInt(bloco.style.top)
        };
    });
    localStorage.setItem('peace_blocos', JSON.stringify(dados));
}
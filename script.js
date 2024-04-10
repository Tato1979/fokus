const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const musicaBtn = document.querySelector('#alternar-musica');
const startPause = document.querySelector('#start-pause');
const musica = new Audio('sons/luna-rise-part-one.mp3');
const audioPlay = new Audio('sons/play.wav'); 
const audioPausa = new Audio('sons/pause.mp3');
const audioTempoFinalizado = new Audio('sons/beep.mp3');
const iniciarOuPausarBt = document.querySelector('#start-pause span');
const icone = document.querySelector('.app__card-primary-butto-icon');
const tempoNaTela = document.querySelector('#timer');

musica.loop = true;

let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;

musicaBtn.addEventListener('change', () => {
    if(musica.paused) {
        musica.play();
    } else {
        musica.pause();
    }
})

function alterarContexto(contexto) {
    mostrarTempo();
    botoes.forEach(function (contexto) {
        contexto.classList.remove('active');
    })
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `imagens/${contexto}.png`);
    switch (contexto) {
        case 'foco':
            titulo.innerHTML = `
            Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`
            break;

        case 'descanso-curto':
            titulo.innerHTML = `
            Que tal uma respirada,<br>
            <strong class="app__title-strong">faça uma pausa curta!</strong>`
            break;

        case 'descanso-longo':
            titulo.innerHTML = `
            Hora de voltar a superfície,<br>
            <strong class="app__title-strong">faça uma pausa longa!</strong>`
            break; 

        default:        
            break; 
    }
}

focoBt.addEventListener('click', () => {
    //html.setAttribute('data-contexto', 'foco');
    //banner.setAttribute('src', 'imagens/foco.png');
    tempoDecorridoEmSegundos = 1500;
    alterarContexto('foco');
    focoBt.classList.add('active');
})

curtoBt.addEventListener('click', () => {
    //html.setAttribute('data-contexto', 'descanso-curto');
    //banner.setAttribute('src', 'imagens/descanso-curto.png');
    tempoDecorridoEmSegundos = 300;
    alterarContexto('descanso-curto');
    curtoBt.classList.add('active');    
})

longoBt.addEventListener('click', () => {
    //html.setAttribute('data-contexto', 'descanso-longo');
    //banner.setAttribute('src', 'imagens/descanso-longo.png');
    tempoDecorridoEmSegundos = 900;
    alterarContexto('descanso-longo'); 
    longoBt.classList.add('active');      
})

const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos <= 0) {
        audioTempoFinalizado.play();
        alert('Tempo Finalizado');
        zerar();
        return;
    }
    tempoDecorridoEmSegundos -= 1;
    mostrarTempo();
}

startPause.addEventListener('click', iniciarOuPausar);

function iniciarOuPausar() {
    if (intervaloId) {
        audioPausa.play();
        zerar();
        return;
    }
    audioPlay.play();
    intervaloId = setInterval(contagemRegressiva, 1000);
    iniciarOuPausarBt.textContent = 'Pausar';
    icone.setAttribute('src', 'imagens/pause.png');
}

function zerar() {
    clearInterval(intervaloId);
    iniciarOuPausarBt.textContent = 'Começar';   
    icone.setAttribute('src', 'imagens/play_arrow.png');     
    intervaloId = null;
}

function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-br', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`;
}

mostrarTempo();
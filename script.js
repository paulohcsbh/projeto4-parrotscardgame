//Variáveis globais
let quant = 0;
let deck = 0;
let selecaoCarta = 0;
let cliques = 0;
let pares = 0;
let contador = 0;

//Função condições para jogar
function numCartas() {
    quant = Number(prompt("Com quantas cartas você quer jogar?(Digite um número par entre 4 e 14)"));
    if (naoNum(quant)) {
      alert("Entrada Inválida. O número de cartas deve ser um número par entre 4 e 14");
      return numCartas();
    }
  }
function naoNum(n) {
    if (isNaN(n)) {
      return true;
    }
  
    if (n % 2 !== 0) {
      return true;
    }
    return n < 4 || n > 14;
  }

const papagaio = [
  "revertitparrot.gif",
  "bobrossparrot.gif",
  "tripletsparrot.gif",
  "fiestaparrot.gif",
  "metalparrot.gif",
  "explodyparrot.gif",
  "unicornparrot.gif",
];

//Criando div's
function dom() {  
  let div = "";
  for (let i = 0; i < quant; i++) {
    div += `
        <div class="carta" onclick="virar(this, '${deck[i]}')">
            <div class="front-face papagaio">
                <img src="imagens/front.png" />
            </div>
            <div class="back-face papagaio">
                <img src="imagens/${deck[i]}" />
            </div>
        </div>`;
  }
  const elemento = document.querySelector(".principal");
  elemento.innerHTML = div;
}


function baralho() {
  deck = [];
  for (let i = 0; i < quant / 2; i++) {
    const element = papagaio[i];
    deck.push(element);
    deck.push(element);
  }
  deck.sort(comparador);
}

function comparador() {
  return Math.random() - 0.5;
}


function virarCartas(carta) {
  return selecaoCarta.length < 2 && !carta.classList.contains("par");
}

function virar(carta, nomeCarta) {
  if (virarCartas(carta)) {
    cliques++;
    carta.classList.add("clicado");
    selecaoCarta.push([nomeCarta, carta]);
    if (selecaoCarta.length === 2) {
      voltar();
    }
  }
}

function conferir() {
  return selecaoCarta[0][0] === selecaoCarta[1][0];
}

function voltar() {
  if (conferir()) {
    selecaoCarta[0][1].classList.add("par");
    selecaoCarta[1][1].classList.add("par");
    selecaoCarta = [];
    pares++;
    if (pares === quant / 2) {
      setTimeout(fimDeJogo, 250);
      clearInterval(idInterval);
    }
  } else {
    setTimeout(flipBack, 1000);
  }
}

function flipBack() {
  selecaoCarta[0][1].classList.remove("clicado");
  selecaoCarta[1][1].classList.remove("clicado");
  selecaoCarta = [];
}

function fimDeJogo(showalert = true) {
  if (showalert) {
    alert(
      `Fim de jogo! Você ganhou com ${cliques} jogadas!`
    );
  }

}  

function jogar() {
  numCartas();
  baralho();
  dom();
  selecaoCarta = [];
  cliques = 0;
  pares = 0;
  contador = 0;
  
}
jogar();
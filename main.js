// Space Invaders
// Autor: Ayo Oyewole
// Adaptado por: Gilson Pereira
// Código fonte original: http://www.ayodeji.ca/space-invaders/

// Programa principal

let tela
let c;

let canhao;
let laser;
let alien;

let canhaoX = 180;
let canhaoY = 529;
let laserX = 193;
let laserY = 520;
let alienX = 0;
let alienY = 0;
let inicioLaser = false;
let impactoLaserX;
let laserMovendo;
let intervalo = 10;
let posicao = 0;

let alienLinhas = [10, 38, 66, 94, 122, 150, 178, 206, 234, 262, 290];
let alienColunas = [55, 85, 115, 145, 175];
let aliensRestantes = [];

const C_ALTURA = 600;
const C_LARGURA = 400;

const TECLA_ESQUERDA = 37;
const TECLA_DIREITA = 39;
const TECLA_ACIMA = 38;

onkeydown = moverCanhao; // Define função chamada ao se pressionar uma tecla

iniciar(); // Chama função inicial do jogo


// Sub-rotinas (funções)
function iniciar() {
    tela = document.getElementById("tela");
    c = tela.getContext("2d");
	
	c.fillStyle = "black";
	c.fillRect(0, 0, C_LARGURA, C_ALTURA);

    posicionarAlien();
    carregarImagens();

	setInterval("moverAliens()", intervalo);
    setInterval("alienAtingido()", 6);
}    

function posicionarAlien() {
    for (var i = 0; i < alienLinhas.length; i++){
        for (var j = 0; j < alienColunas.length; j++){
            var novoAlien = {
                posX : alienLinhas[i],
                posY : alienColunas[j],
                foiAtingido : false
			};
			
            aliensRestantes[aliensRestantes.length] = novoAlien;
        }
    }
}    

function carregarImagens() {
    canhao = new Image();
    canhao.src = "assets/imgs/canhao.png";
    canhao.onload = function(){
        c.drawImage(canhao, canhaoX, canhaoY);
    }
    
    laser = new Image();
    laser.src = "assets/imgs/laser.png";
    
    alien = new Image();
    alien.src = "assets/imgs/alien.png";
}

function moverAliens(){
        if (posicao <= 65){
            alienX += 1;
            posicao += 1;
        } else if ((posicao > 65) && (posicao <= 80)){
            alienX += 1;
            alienY += 1
            posicao += 1;            
        } else if ((posicao > 80) && (posicao <= 147)){
            alienX -= 1;
            posicao += 1;
        } else if ((posicao > 147) && (posicao < 162)){
            alienX -= 1;
            alienY += 1;
            posicao += 1;
        } else{
            posicao = 0;
        }
        
        for (var i = 0; i < aliensRestantes.length; i++){
            if (!aliensRestantes[i].foiAtingido){
                c.fillRect((alienX + aliensRestantes[i].posX - 1), (alienY + aliensRestantes[i].posY - 1), 20, 25);
                c.drawImage(alien, (alienX + aliensRestantes[i].posX), (alienY + aliensRestantes[i].posY));
				
                if ((aliensRestantes[i].posY + alienY + 23) >= 530){
                    fimDeJogo();
                }
            }
        }
}

function alienAtingido(){
    for(var i = 0; i < aliensRestantes.length; i++){
        if ((laserY >= (alienY + aliensRestantes[i].posY)) && (laserY <= (alienY + aliensRestantes[i].posY + 20)) && 
            (impactoLaserX >= (alienX + aliensRestantes[i].posX - 5)) && (impactoLaserX <= (alienX + aliensRestantes[i].posX + 18))){
            if (!aliensRestantes[i].foiAtingido){
                c.fillStyle = "black";
                c.fillRect((alienX + aliensRestantes[i].posX - 1), (alienY + aliensRestantes[i].posY - 1), 20, 25);
                aliensRestantes[i].foiAtingido = true;
                c.fillRect(impactoLaserX, laserY, 6, 19);
                laserY = 0;
            }
        }
    }    
}

function fimDeJogo(){
    canhaoX = 180;
    laserX = 193;
    laserY = 520;
    alienX = 0;
    alienY = 0;
    posicao = 0;
    aliensRestantes = [];
    inicioLaser = false;
	
    c.fillStyle = "black";
	c.fillRect(0, 0, C_LARGURA, C_ALTURA);
    
    c.textAlign = "center";
    c.font = "16px Arial";
    c.fillStyle = "white";
    c.fillText("Fim de Jogo", C_LARGURA/2, C_ALTURA/2);

    onkeydown = null;
}

let seuVotopara = document.querySelector('.d-1-1 span');
let cargo = document.querySelector('.d-1-2 span');
let descricao = document.querySelector('.d-1-4');
let aviso = document.querySelector('.d-2');
let lateral = document.querySelector('.d-1-right');
let numeros = document.querySelector('.d-1-3');


let etapaAtual = 0;
let numero = '';
let votoBranco = false;
let votos = [];

function comecarEtapa () {
    let etapa = etapas[etapaAtual];

    let numeroHtml = '';
    numero = '';
    votoBranco = false;

    for(let i=0;i<etapa.numeros;i++) {
        if(i === 0) {
            numeroHtml += '<div class="numero pisca"></div>';
        } else {
        numeroHtml += '<div class="numero"></div>';}
    }



    seuVotopara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = '';
    numeros.innerHTML = numeroHtml;
}

function atualizaInterface () {
    let etapa = etapas[etapaAtual];
    let candidato = etapa.candidatos.filter((item) => {
        if(item.numero === numero) {
            return true;
        } else {
            return false;
        }
    });

    if(candidato.length > 0) {
        candidato = candidato [0];
        seuVotopara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = `Nome: ${candidato.name} <br> Partido: ${candidato.partido}`;
        

        let fotosHtml = '';
        for(let i in candidato.fotos) {
            fotosHtml += `<div class="d-1-right"> <div class="d-1-image"> <img src="/images/${candidato.fotos[i].url}" alt=""/> ${candidato.fotos[i].legenda} </div>`;
        }

        lateral.innerHTML = fotosHtml;
    } else {
        seuVotopara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = '<div class="aviso--grande pisca">VOTO NULO</div>';
    }



}

function clicou(n) {
    let elnumero = document.querySelector('.numero.pisca');
    if(elnumero !== null) {
        elnumero.innerHTML = n;
        numero = `${numero}${n}`;
        
        elnumero.classList.remove('pisca');
        if(elnumero.nextElementSibling !== null) {
            elnumero.nextElementSibling.classList.add('pisca');
        } else {
            atualizaInterface();
        }
        
    }
}

function branco() {
    numero = '';
    votoBranco = true;
    seuVotopara.style.display = 'block';
    aviso.style.display = 'block';
    numeros.innerHTML = '';
    descricao.innerHTML = '<div class="aviso--grande pisca">VOTO EM BRANCO</div>';
    lateral.innerHTML = '';    
} 


function corrige() {
    comecarEtapa();
}

function confirma() {
    let etapa = etapas[etapaAtual];
    let votoConfirmado = false

    if(votoBranco === true) {
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: 'branco'
        });

    } else if(numero.length === etapa.numeros) {
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: numero
        
        });
    }

    if(votoConfirmado) {
        etapaAtual++;
        if(etapas[etapaAtual] !== undefined) {
            comecarEtapa();
        } else {
            etapaAtual = 0;
            document.querySelector('.tela').innerHTML = '<div class="aviso--gigante pisca"> FIM</div>';
            for (let voto of votos){
                alert(voto.voto);
            }
            setTimeout(comecarEtapa, 10000);
            console.log(votos);
        };
    }

}

comecarEtapa();




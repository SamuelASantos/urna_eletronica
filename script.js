// CONTROLE DE INTERFACE
let seuVotoPara = document.querySelector(".seu--voto-para p");
let titulo = document.querySelector(".titulo span");
let descricao = document.querySelector(".status");
let aviso = document.querySelector(".tela--bot");
let lateral = document.querySelector(".tela--top-direita");
let numero = document.querySelector(".numeros");
let elNomeNumero = document.querySelector('.espaco .num');
let btnBranco = document.querySelector('.botao--branco');
let btnCorrige = document.querySelector('.botao--corrige');
let btnConfirma = document.querySelector('.botao--confirma');

// CONTROLE DE AMBIENTE
let etapaAtual = 0;
let numeroCandidato = '';
let votoBranco = false;
let votos = [];

// FUNÇÕES
function atualizaInterface() {
    let etapa = etapas[etapaAtual];
    let candidato = etapa.candidatos.filter((item)=>{ // Verifica se existe o candidato
        if (item.numero === numeroCandidato) {
            return true;
        } else {
            return false;
        }
    });
    if (candidato.length > 0) {
        candidato = candidato[0];
        seuVotoPara.style.display = 'block';
        if (candidato.vice !== undefined) {
            descricao.innerHTML = `
            Nome: ${candidato.nome} </br>
            Partido: ${candidato.partido} </br>       
            Vice: ${candidato.vice}
            `;
        } else {
            descricao.innerHTML = `
            Nome: ${candidato.nome} </br>
            Partido: ${candidato.partido} </br>       
            `;
        };
        aviso.style.display = "block";

        let fotosHtml = '';
        for(let i in candidato.fotos) {
            if (candidato.fotos[i].small) {
                fotosHtml += `
                <div class="foto--dois">
                    <img class="small" src="img/${candidato.fotos[i].url}">
                    <p>${candidato.fotos[i].legenda}</p>
                </div>
                `;
            } else {
                fotosHtml += `
                <div class="foto--dois">
                    <img src="img/${candidato.fotos[i].url}">
                    <p>${candidato.fotos[i].legenda}</p>
                </div>
                `;
            }            
        }
        lateral.innerHTML = fotosHtml;
    } else {
        seuVotoPara.style.display = 'block';
        aviso.style.display = "block";
        descricao.innerHTML = '<div class="aviso--grande pisca">VOTO NULO</div>';
    }
}

function comecarEtapa() {
    let etapa = etapas[etapaAtual];
    let numeroHTML = '';
    numeroCandidato = '';
    votoBranco = false;

    for (let i = 0; i < etapa.numeros; i++) {
        if (i === 0) {
            numeroHTML += '<span class="numero pisca"></span>';
        } else {
            numeroHTML += '<span class="numero"></span>';
        }
    }

    seuVotoPara.style.display = "none";
    titulo.innerHTML = etapa.titulo;
    descricao.innerHTML = '';
    aviso.style.display = "none";
    lateral.innerHTML = '';
    elNomeNumero.style.display = 'block';
    numero.innerHTML = numeroHTML;
}

function clicou(num) {
    let elNumero = document.querySelector(".numero.pisca");
    if (elNumero !== null) {
        elNumero.innerHTML = num;
        numeroCandidato = `${numeroCandidato}${num}`;

        elNumero.classList.remove('pisca');
        if (elNumero.nextElementSibling !== null) {
            elNumero.nextElementSibling.classList.add('pisca'); // nextElementSibling seleciona o próximo elemento (o que está do lado)
        } else {
            atualizaInterface();
        }
    }
}

function branco() {
    if (numeroCandidato === '') {
        votoBranco = true;
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        numero.innerHTML = '';
        elNomeNumero.style.display = 'none';
        descricao.innerHTML = '<div class="aviso--grande pisca">VOTO EM BRANCO</div>';
    } else {
        alert('Para votar em BRANCO, o campo de voto deve estar vazio. Aperte CORRIGE para apagar o campo de voto.');
    }
}

function corrige() {
    comecarEtapa();
}

function confirma() {
    let etapa = etapas[etapaAtual];

    let votoConfirmado = false;

    if (votoBranco === true) {
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: 'branco'
        });
    } else if (numeroCandidato.length === etapa.numeros) {
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: numeroCandidato
        });
    }

    if (votoConfirmado) {
        etapaAtual++; 
        if (etapas[etapaAtual] !== undefined) {
            comecarEtapa();
        } else {
            document.querySelector('#tela').innerHTML = '<div class="aviso--gigante pisca">FIM!</div>';
            btnBranco.removeAttribute('onclick');
            btnCorrige.removeAttribute('onclick');
            btnConfirma.removeAttribute('onclick');
            console.log(votos);
        }
    }
}

comecarEtapa();
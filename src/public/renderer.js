const video = document.getElementById('fonte');
const tela = document.getElementById('vid');
const url = "rtsp://admin:Root1234@10.0.0.4:554/cam/realmonitor?channel=1&subtype=0";
const novoLink = "http://localhost:3000/video";
const canva = document.getElementById('canva')
var resultadoOCR = document.getElementById('resultadoOCR');
var meuTexto = document.getElementById('texto')
video.src = novoLink
var regex = /(?:[A-Za-z]{3}1[A-Za-z]\d{2}|[A-Za-z]{3}-\d{4})/;


function exit() {
    window.actions.exit();
}
function minimize() {
    window.actions.minimize();
}
function maximize() {
    window.actions.maximize();
}
function acionarCamera() {

    if (tela.className == "hide") {
        tela.className = "show"

    } else {
        tela.className = "hide";
    }

}
function parar() {
    if (tela.className == "show") {
        tela.className = "hide";
    }
}

var radioButton = document.getElementById('definicao');
radioButton.addEventListener("change", async (event) => {
    var retorno = await setResolution(event.target.value)
    var parametros = retorno.split('x')
    video.height = parametros[0];
    video.width = parametros[1];
    canva.height = parametros[0];
    canva.width = parametros[1];
})

function setResolution(numero) {

    switch (numero) {
        case "1":
            return "480x640"
        case "2":
            return "600x800"
        case "3":
            return "720x1280"
        case "4":
            return "1080x1920"
    }
}

var captura = document.getElementById('captura');

captura.addEventListener("click", (event) => {
    var vid = novoLink
    const context = canva.getContext('2d');

    context.drawImage(video, 0, 0, canva.width, canva.height);
    const imgUrl = canva.toDataURL('image/png');

    const link = document.createElement('a');
    link.href = imgUrl;
    link.download = 'foto.png'
    link.click()
})

async function abrirArquivo(){
    var foto = document.getElementById('foto')
    var meuTexto = document.getElementById('texto')
    var nomeArquivo = await window.actions.abrirArquivo();
    foto.src = nomeArquivo
    //console.log(nomeArquivo)

    var texto = await Tesseract.recognize(nomeArquivo)
    console.log(texto)
    meuTexto.innerHTML =  regex.test(texto.data.text)?texto.data.text:"";

}








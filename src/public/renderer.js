const video = document.getElementById('fonte');
const tela = document.getElementById('vid');
const url = "rtsp://admin:Root1234@10.0.0.4:554/cam/realmonitor?channel=1&subtype=0";
const novoLink = "http://localhost:3000/video";
var resultadoOCR = document.getElementById('resultadoOCR');
video.src = novoLink
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
})

function setResolution(numero) {

    switch (numero) {
        case "1":
            return "480x640"
        case "2":
            return "600x800"
        case "3":
            return "720x1280"
    }
}




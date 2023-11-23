const video = document.getElementById('fonte')
const url = "rtsp://admin:Root1234@10.0.0.4:554/cam/realmonitor?channel=1&subtype=0"
const novoLink = "http://localhost:3000/video";

function exit(){
    window.actions.exit();
}
function minimize(){
    window.actions.minimize()
}
function maximize(){
    window.actions.maximize()
}
function acionarCamera(){
   video.src = novoLink
}
function parar(){

}






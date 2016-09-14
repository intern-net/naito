$(document).ready(function(){
  $('.category tr td').on('click', function(){
    $('#listener').toggleClass('hidden');
  });
});

var audio = new Audio();
audio.src = "audios/sample.wav";

function onMusicClick(){
  console.log("音楽スタート予定");
  var img = document.getElementById("mid");
  var imgPath = img.getAttribute("src");
  if(imgPath == "images/Start.jpg"){
    document.getElementById("mid").src = "images/stop.png";
    audio.play();
    imgPath = img.getAttribute("src");
  }else if(imgPath == "images/stop.png"){
    document.getElementById("mid").src = "images/Start.jpg";
    audio.pause();
    imgPath = img.getAttribute("src");
  }
};
//firebase初期化
firebase.initializeApp({
    authDomain: "favst-dojo.firebaseapp.com",
    databaseURL: "https://favst-dojo.firebaseio.com",
    storageBucket: "favst-dojo.appspot.com",
    messagingSenderId: "732756833582"
});

var db = firebase.database();
var storage = firebase.storage();

console.log('Genres');
db.ref('/voices').once('value', function(snapshot) {
    console.log(snapshot.val());
    console.log('=====================================================================');
});


//audioタグ作成
var ttag = "<p></p>"
var autag = "<source></source>";

//hash初期化
var link_hash = {"all": [], "entertainment": [], "IT":[], "fashion":[],"news":[], "gourmet":[], "sports":[], "hobby":[]};
var title_hash = {"all": [], "entertainment": [], "IT":[], "fashion":[],"news":[], "gourmet":[], "sports":[], "hobby":[]};
var voice_hash = {"all": [], "entertainment": [], "IT":[], "fashion":[],"news":[], "gourmet":[], "sports":[], "hobby":[]};

//firebase data取得
db.ref('/voices').once('value', function (snapshot) {
    var all_data = snapshot.val();
    genre_list = Object.keys(all_data);
    console.log(genre_list);
    genre_list.forEach(function(g_name){
        var obj = all_data[g_name];
        Object.keys(obj).forEach(function (id) {
            var val = obj[id];
            storage.refFromURL(val.voiceURL).getDownloadURL().then(function (voiceURL) {
                console.log('ID:', id);
                console.log('Title:', val.title);
                console.log('LinkURL:', val.linkURL);
                console.log('VoiceURL:', voiceURL);
                console.log('=====================================================================');
                // var vtag = $(autag).attr("src", voiceURL);
                // $("#ft2").append(vtag);
                title_hash[g_name].push(val.title)
                voice_hash[g_name].push(voiceURL);
                link_hash[g_name].push(val.linkURL);
            });
        });
    });
});


//audio再生系
var genre; //選ぶジャンル

var audio = new Audio();
// audio.src = "audios/sample.wav";

//click時
$(document).ready(function(){
  $('.category tr td').on('click', function(){
    $('#listener').show();
    genre = $(this).attr("id");
    $("#genre").text(genre);
    $("#title").text(title_hash[genre][0]);
    audio.src = voice_hash[genre][0];
    });
});

//再生ボタンclick
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

//back button
function onBackClick(){
  audio.play();
};

//next button
function onNextClick(){
  audio.play();
};
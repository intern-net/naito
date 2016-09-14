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
var now_genre = "no genre"; //選ぶジャンル
var now_url;
var now_title;
var now_voice;

var audio = new Audio();
var num = 0;
var flg = 0; //stop->0 start->1

//click時
$(document).ready(function(){
  $('.category tr td').on('click', function(){
    now_genre = $(this).attr("id");
    if(voice_hash[now_genre].length > 2){
        $('#listener').show();
    }else{
        $('#listener').hidden();
    }
    setGenre();
    setTitle();
    setAudio();
});
});

function setGenre(){
    $("#genre").text(now_genre);
};

function setTitle(){
    $("#title").text(title_hash[now_genre][num]);
};

function setAudio(){
    audio.src = voice_hash[now_genre][num];
};

function playAudio(){
    audio.play();
    flg=1;
}

function pauseAudio(){
    audio.pause();
    flg=0;
}

//再生ボタンclick
function onMusicClick(){
  var img = document.getElementById("mid");
  var imgPath = img.getAttribute("src");
  if(imgPath == "images/Start.jpg"){
    document.getElementById("mid").src = "images/stop.png";
    playAudio();
    imgPath = img.getAttribute("src");
}else if(imgPath == "images/stop.png"){
    document.getElementById("mid").src = "images/Start.jpg";
    pauseAudio();
    imgPath = img.getAttribute("src");
}
};

//back button
function onBackClick(){
    if(num>1){
        if(flg==1){
            audio.pause();
        }
        num -= 1;
        setTitle();
        setAudio();
        if(flg==1){
            audio.play();
        }
    }
};

//next button
function onNextClick(){
    if(flg==1){
        audio.pause();
    }
    num += 1;
    setTitle();
    setAudio();
    if(flg==1){
        audio.play();
    }
};
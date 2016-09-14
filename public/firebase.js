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
var autag1 = "<audio controls></audio>";
var autag2 = "</audio>";


db.ref('/voices/all').once('value', function (snapshot) {
    var obj = snapshot.val();
    Object.keys(obj).forEach(function (id) {
        var val = obj[id];
        storage.refFromURL(val.voiceURL).getDownloadURL().then(function (voiceURL) {
            console.log('ID:', id);
            console.log('Title:', val.title);
            console.log('LinkURL:', val.linkURL);
            console.log('VoiceURL:', voiceURL);
            console.log('=====================================================================');
            var vurl = voiceURL;
            $(autag1).attr("src", voiceURL).appendTo("#ft");
        });
    });
});
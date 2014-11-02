window.addEventListener('load', function() {
        FastClick.attach(document.body);
}, false);

function addScore(user) {
    var place = user.place;
    var userid = user.userid;
    $("#hslist").append('<li>'+userid+'<span>'+place+'</span></li>');
}


function getHighscores(gameid){
    var scores = new Firebase("https://moneymoney.firebaseio.com/games/"+gameid);
    scores.on('child_added', pushHighscore);
}

function pushHighscore(data){
    var obj = data.val();
    var list = $("#hslist");
    for(var property in obj){
        list.append('<li>'+property+'<span>'+obj[property].score+'</span></li>');
        console.log(property);
        console.log(obj[property].score);
    }
}

var canvas = document.getElementById('bg');
var context = canvas.getContext('2d');
var looping = false;
var totalSeconds = 0;

var img = new Image();
img.onload = imageLoaded;
img.src = 'images/bg.png';

function imageLoaded() {
    draw(0);
}

var lastFrameTime = 0;
var timer = null;

function startStop() {
    looping = !looping;

    if (looping) {
        timer = setInterval(loop,30);
    } else {
        timer.stop();
    }
}

function loop() {
    totalSeconds+=1;
    draw(30);
}

function draw(delta) {
    var vx = 5; // the background scrolls with a speed of 100 pixels/sec
    var numImages = Math.ceil(canvas.width / img.width) + 1;
    var xpos = totalSeconds * vx % img.width;

    context.save();
    context.translate(-xpos, 0);
    for (var i = 0; i < numImages; i++) {
        context.drawImage(img, i * img.width, 0);
    }
    context.restore();
}

$(document).ready( function() {
    getHighscores(1);
    $("#viewhsbtn").click( function() {
        $("#play").hide();
        $("#highscore").show();
    });
    $("#hsback").click( function() {
        $("#highscore").hide();
        $("#play").show();
    });
    $("#playbtn").click( function() {
        $("#play").hide();
        $("#game").show();
        startStop();
    });
    $("#gamebackbtn").click( function() {
        $("#game").hide();
        $("#play").show();
        startStop();
    });
});



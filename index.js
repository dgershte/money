window.addEventListener('load', function() {
        FastClick.attach(document.body);
}, false);


function loadBlockChain(){
    getCurrentBlock();
    //loads seed too
    console.log(userid);
    getCoins(userid);
}

loadBlockChain();

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
    var i = 0;
    for(var property in obj){
        if(i > 2) return;
        i++;
        list.append('<li>'+obj[property].name+'<span>'+obj[property].score+'</span></li>');
    }
}

window.requestAnimationFrame = window.requestAnimationFrame
        || window.webkitRequestAnimationFrame
        || window.mozRequestAnimationFrame
        || function(callback) { window.setTimeout(callback, 1000 / 60); };

var cvs = document.getElementById('bg');
var ctx = cvs.getContext('2d');
var looping = false;
var totalSeconds = 0;

var img = new Image();
img.onload = imageLoaded;
img.src = 'images/bg.png';

function imageLoaded() {
    draw(0);
}

var lastFrameTime = 0;

function startStop() {
    looping = !looping;

    if (looping) {
        lastFrameTime = Date.now();
        requestAnimationFrame(loop);
    }
}

function loop() {
    if (!looping) {
        return;
    }

    requestAnimationFrame(loop);

    var now = Date.now();
    var deltaSeconds = (now - lastFrameTime) / 1000;
    lastFrameTime = now;
    draw(deltaSeconds);
}

function draw(delta) {
    totalSeconds += delta;

    var vx = 100; // the background scrolls with a speed of 100 pixels/sec
    var numImages = Math.ceil(cvs.width / img.width) + 1;
    var xpos = totalSeconds * vx % img.width;

//    ctx.canvas.width  = window.innerWidth;
//    ctx.canvas.height = window.innerHeight;
    ctx.save();
    ctx.translate(-xpos, 0);
    for (var i = 0; i < numImages; i++) {
        ctx.drawImage(img, i * img.width, 0);
    }
    ctx.restore();
}

function endGame(score,rundata){
    saveRun(userid, block, score, rundata);
}

$(document).ready( function() {
    $("#viewhsbtn").click( function() {
        $("#play").hide();
        $("#highscore").show();
    });
    $("#hsback").click( function() {
        $("#highscore").hide();
        $("#game").hide();
        $("#play").show();
    });
    $("#playbtn").click( function() {
        $("#play").hide();
        $("#game").show();
        payUser(userid,block);
        startStop();
        restart();
    });
    $("#gamebackbtn").click( function() {
        $("#game").hide();
        $("#play").show();
        startStop();
    });
    $("#cashoutbtn").click( function() {
        $("#play").hide();
        $("#cashout").show();
    });
    $("#cashoutback").click( function() {
        $("#cashout").hide();
        $("#play").show();
    });
    $("#bitcoins").html(coins);
});

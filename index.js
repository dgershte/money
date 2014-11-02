window.addEventListener('load', function() {
        FastClick.attach(document.body);
}, false);


function loadBlockChain(){
    getCurrentBlock();
    //loads seed too
    getCoins(userid);
    getHumanName(userid);
}

loadBlockChain();

function addScore(user) {
    var place = user.place;
    var userid = user.userid;
    $("#hslist").append('<li>'+userid+'<span>'+place+'</span></li>');
}


function getHighscores(gameid){
    var prizes = getPrizes();
    while(prizes.length<3){
        prizes.push(0);
    }
    fbmain.child("games").child(gameid).child("scores").once('value', function(data){
        var obj = data.val();
        console.log(data.val())
        var list = $("#hslist");
        list.empty();

        var scoreObjs = new Array();
        for(var property in obj){
            scoreObjs.push({name:obj[property].name,score:obj[property].score});
        }

        scoreObjs.sort(function(a,b){
            if(a["score"]<b["score"]){
                return 1;
            } else if(a["score"]==b["score"]){
                return 0;
            } else return -1;
        });
        /*
        var pot = maindata["games"][gameid]["pot"];
        var prizes = getPrizes(pot);
        var i = 0;
        while(prizes.length>0){
            var prize = prizes.shift();
            maindata["users"][scoreObjs[i]["name"]]["coins"]+=prize;
            i++;
        }*/
        var pot = prizes;
        for(var i =0;i<scoreObjs.length;i++){
            if(i > 2) return;
            list.append('<li><img class="place" src="images/place'+(i+1)+'.png"/><div class="pot">'+pot[i]+'BTC</div><div class="userscore">'+scoreObjs[i].name+' '+scoreObjs[i].score+'</div></li>');
        }
    });
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

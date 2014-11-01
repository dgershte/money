var users = new Array();

function User(userid,place) {
    this.userid = userid;
    this.place = place;
}


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

$(document).ready( function() {
    for(var i = 0; i < 10; i++) {
        var user = new User("user"+i,i);
        users.push(user);
        addScore(user);
    }
    
    getHighscores(1);
});



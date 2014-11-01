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



$(document).ready( function() {
    for(var i = 0; i < 10; i++) {
        var user = new User("user"+i,i);
        users.push(user);
        addScore(user);
    }
});



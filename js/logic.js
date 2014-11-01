var firebase  = new Firebase("https://moneymoney.firebaseio.com/");

function receivedData(response){
    console.log("receivedData");
}

// submit score for game
function submitScore(name, gameid, newscore){
    var scores = new Firebase("https://moneymoney.firebaseio.com/games/"+gameid+"/scores/"+name+"/score");
    scores.transaction(function(score){
        if(newscore>score){
            return newscore;
        }
        return score;
    });
}

//payUser("Danny",1);
function payUser(name, gameid){
    var coins = new Firebase("https://moneymoney.firebaseio.com/users/"+name+"/coins");
    coins.transaction(function(coins){
        if(coins==null){
            return 0;
        }
        if(coins>0){
            return coins-1;
        }
    });
}

function payWinners(){
}


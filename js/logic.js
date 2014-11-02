var firebase  = new Firebase("https://moneymoney.firebaseio.com/");

function receivedData(response){
    console.log("receivedData");
}

// submit score for game
function saveRun(name, gameid, newscore, rundata){
    var currgame = new Firebase("https://moneymoney.firebaseio.com/games/"+gameid);
    currgame.transaction(function(game){
        if(game==null){
            return game;
        }
        if(game["scores"]==null || game["scores"][name]==null){
            return game;
        }

        if(newscore>game["scores"][name]["score"]){
            game["scores"][name]["score"]=newscore;
            game["scores"][name]["rundata"]=rundata;
            game["scores"][name]["name"]=humanName;
            return game;
        }
    });
}


var fbmain = new Firebase("https://moneymoney.firebaseio.com/");
fbmain.on('value',function(maindata){
});

function payUser(name, gameid){
        fbmain.transaction(function(maindata){
        if(maindata==null){
            return maindata;
        }
        console.log(maindata);
        if(maindata["urls"][name]["coins"]>50 && maindata["games"][gameid]!=null){
            if(maindata["games"][gameid]["scores"]==null){
                maindata["games"][gameid]["scores"]={};
                maindata["games"][gameid]["pot"]=0;
            } else if(maindata["games"][gameid]["scores"][name]!=null){
                return maindata;
            }
            maindata["urls"][name]["coins"]-=500;
            maindata["games"][gameid]["pot"]+=500;
            maindata["games"][gameid]["scores"][name]={score:0, rundata:"",name:maindata["urls"][name]["name"]};
            return maindata;
        }
    });
}

function getPrizes(pot){
    var prizes = [];
    while(pot!=0){
        var p = Math.ceil(pot/3*2);
        pot-=p;
        prizes.push(p);
    }
    return prizes;
}

/*
function payWinners(gameid){
    var fb = new Firebase("https://moneymoney.firebaseio.com/");
    fb.transaction(function(maindata){
        if(maindata==null){
            return maindata;
        }
        if(maindata["games"][gameid]["over"]==false){
            if(maindata["games"][gameid]["over"]==false){
                scores = maindata["games"][gameid]["scores"];
                if(scores==null){
                    return maindata;
                }
                var scoreObjs = new Array();
                for(var property in scores){
                    scoreObjs.push({name:property,score:scores[property]});
                }

                scoreObjs.sort(function(a,b){
                    if(a["score"]["score"]<b["score"]["score"]){
                        return 1;
                    } else if(a["score"]["score"]==b["score"]["score"]){
                        return 0;
                    } else return -1;
                });
                var pot = maindata["games"][gameid]["pot"];
                var prizes = getPrizes(pot);
                var i = 0;
                while(prizes.length>0){
                    var prize = prizes.shift();
                    maindata["users"][scoreObjs[i]["name"]]["coins"]+=prize;
                    i++;
                }
                maindata["games"][gameid]["over"]=true;
            }
            return maindata;
        }
    });
}*/
function getHumanName(userid){
    fbmain.child("urls").child(userid).child("/name").on('value',function(data){
        if(data.val()!=null){
            updateHumanName(data.val());
        }
    });
}

function getCoins(userid){
    fbmain.child("urls").child(userid).child("/coins").on('value',function(data){
        if(data.val()!=null){
            updateCoins(data.val());
        }
    });
}

function getCurrentBlock(){
    fbmain.child("games").child("currblock").on('value',function(data){
        if(data.val()!=null){
            updateBlock(data.val());
        }
    });
}

function getSeedForBlock(block){
    fbmain.child("games").child(block).child("seed").on('value',function(data){
        if(data.val()!=null){
            updateSeed(data.val());
        }
    });
}

//get the number of coins
//getCoins("Danny");

//example:
//user pays, user can then save a run
//payUser("g1khchwy4l2o891",1);
//payUser("Bob",1);
//saveRun("Danny",1,210,"adsdfsdff");

//pay out the winners
//payWinners(1);

var coins = 0;
var block = -1;
var blockSeed=0;
var humanName="";

function updateHumanName(val){
    humanName=val;
}

function updateCoins(val){
    coins = val;
}
function updateBlock(val){
    block = val;
    getSeedForBlock(block);
}

function updateSeed(val){
    blockSeed = val;
}
//payUser("g1khchwy4l2o891",block);

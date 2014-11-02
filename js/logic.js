function receivedData(response){
    console.log("receivedData");
}

// submit score for game
function saveRun(name, gameid, newscore, rundata){
    fbmain.child("games").child(gameid).child("scores").child(name).transaction(function(game){
        console.log(game)
        if(game==null){
            //return game;
            //return {"score":newscore,rundata:rundata,name:humanName};
            return {"score":newscore,rundata:rundata,name:humanName};
        }

        if(newscore>game["score"]){
            return {"score":newscore,rundata:rundata,name:humanName};
        }
        return;
    });
}


function payUser(name, gameid){
        fbmain.child("urls").child(name).child("coins").transaction(function(coins){
        if(coins>500){
            return coins-500;
        }
        return;
        });
        fbmain.child("games").child(block).child("pot").transaction(function(pot){return pot+500;});
        fbmain.child("games").child(block).child("scores").child(name).transaction(function(userscore){
        if(userscore==null){
            userscore={score:0,rundata:"",name:humanName};
            return userscore;
        }
        return;
    });
    getCoins(userid);
}

function getPrizes(){
    var pot=0;
    var potprize = fbmain.child("games").child(block).child("pot").once('value',
        function(potsize){
            pot=potsize.val();;
        });

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
function getHumanName(){
var fbmain = new Firebase("https://moneymoney.firebaseio.com/");
    fbmain.child("urls").child(userid).child("name").on('value',function(data){
        if(data.val()!=null){
            console.log("human name "+data.val());
            updateHumanName(data.val());
        }
    });
}
function updateCoinDiv(){
    $("#bitcoins").html(""+coins/1000000);
}


function getCoins(){
    var fbmain = new Firebase("https://moneymoney.firebaseio.com/");
    console.log(fbmain);
    fbmain.child("urls").child(userid).child("coins").once('value',function(data){
        if(data.val()!=null){
            updateCoins(data.val());
        }
    });
}

function getCurrentBlock(){
var fbmain = new Firebase("https://moneymoney.firebaseio.com/");
        fbmain.child("games").child("currblock").once('value',function(data){
            if(data.val()!=null){
                updateBlock(data.val());
            }
        });
}

function getSeedForBlock(){
    fbmain.child("games").child(block).child("seed").once('value',function(data){
        if(data.val()!=null){
            updateSeed(data.val());
        }
    });
    getHighscores();
}

function loadShadows(){
    fbmain.child("games").child(block).child("scores").once('value',function(data){
        shadows = []
        for(var property in data.val()){
            var runs = data.val()[property].rundata;
            if(runs!=null){
                shadows.push(runs.split("|"));
            }
        }
    });
}


//get the number of coins

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
    updateCoinDiv();
}
function updateBlock(val){
    block = val;
    getSeedForBlock();
}

function updateSeed(val){
    blockSeed = val;
}
//payUser("g1khchwy4l2o891",block);

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
            return game;
        }
    });
}

function payUser(name, gameid){
    var fb = new Firebase("https://moneymoney.firebaseio.com/");
        fb.transaction(function(maindata){
            if(maindata==null){
                return maindata;
            }
            if(maindata["users"][name]["coins"]>0 && maindata["games"][gameid]!=null){
                if(maindata["games"][gameid]["scores"]==null){
                    maindata["games"][gameid]["scores"]={};
                    maindata["games"][gameid]["pot"]=0;
                } else if(maindata["games"][gameid]["scores"][name]!=null){
                    return maindata;
                }
                maindata["users"][name]["coins"]--;
                maindata["games"][gameid]["pot"]++;
                maindata["games"][gameid]["scores"][name]={score:0, rundata:""};
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
}

//example:
//user pays, user can then save a run
payUser("Danny",1);
payUser("Bob",1);
saveRun("Danny",1,210,"adsdfsdff");

//pay out the winners
payWinners(1);

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
    var newfb = new Firebase("https://moneymoney.firebaseio.com/");
        newfb.transaction(function(topfb){
            if(topfb==null){
                return {}
            }
            if(topfb["users"][name]["coins"]>0 && topfb["games"][gameid]!=null){
                if(topfb["games"][gameid]["scores"]==null){
                    topfb["games"][gameid]["scores"]={};
                } else if(topfb["games"][gameid]["scores"][name]!=null){
                    return topfb;
                }
                topfb["users"][name]["coins"]--;
                topfb["games"][gameid]["scores"][name]={score:0, rundata:""};
                return topfb;
            }
    });
}


function payWinners(){
}


//example:
//user pays, user can then save a run
payUser("Danny",1);
saveRun("Danny",1,210,"adsdfsdff");



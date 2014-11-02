
var m_w = 123456789;
var m_z = 987654321;
var mask = 0xffffffff;

// Takes any integer
function seed(i) {
    m_w = i;
    m_z = 987654321;
}

// Returns number between 0 (inclusive) and 1.0 (exclusive),
// just like Math.random().
function random()
{
    m_z = (36969 * (m_z & 65535) + (m_z >> 16)) & mask;
    m_w = (18000 * (m_w & 65535) + (m_w >> 16)) & mask;
    var result = ((m_z << 16) + m_w) & mask;
    result /= 4294967296;
    return result + 0.5;
}

function Char() {
    this.x=0;
    this.y=0;
    this.xspd=0;
    this.yspd=0;
    this.jump=false;
    this.jumptime=0;
    this.lasty=0;
    this.lastplat=null;
    this.onground=false;
    this.frame=0;
}

var grav = 2;

var keyup=false;
var platformspd=9;
var platformtime=0;
var character = new Char();
var gamespd=0;
var platforms = [];
var timer = null;
var charwidth=15;
var dog = new Image();
dog.src = 'images/dog0001.png';
var leftcap = new Image();
leftcap.src = 'images/platformleft.png';
var rightcap = new Image();
rightcap.src = 'images/platformright.png';
var platformimg = new Array();
var charimg = new Array();

for(var i = 1; i < 4; i++) {
    var pimg = new Image();
    pimg.src = 'images/platform000'+i+'.png';
    platformimg.push(pimg);
}

for(var i = 1; i < 12; i++) {
    var cimg = new Image();
    if(i > 9) cimg.src = 'images/dog00'+i+'.png';
    else cimg.src = 'images/dog000'+i+'.png';
    charimg.push(cimg);
}

var saveStuff=[];
var demo=[11, 13, 32, 35, 65, 88, 97, 99, 110, 123, 150, 158, 205, 225, 235, 236, 264, 273];

function restart(){
    character.y=0;
    character.yspd=0;
    if(timer!=null){
        clearInterval(timer);
    }
    var seedNumber=100;
    seed(seedNumber);
    platforms = [];
    character.x=100;
    character.lasty=0;
    character.y=0;
    character.xspd=0;
    character.yspd=0;
    character.jump=false;
    character.jumptime=0;
    character.lastplat=null;
    platformtime=0;
    character.mouse=false;
    character.droppedTime=0;
    var p=new Platform();
    p.x=20;
    p.y=300;
    p.width=700;
    character.y=p.y;
    platforms.push(p);
    character.lastplat=platforms[0];
    gamespd=0;
    mouseon=true;
    saveStuff=[];
    timer = setInterval(enterframe,30);
    mousehit=false;
    demoindex=0;
}

var mouse = false;
var canvas = null;
var context = null;
var mouseon = true;
var mousehit=0;
var frame = 0;

function mousedown(){
    mousehit=true;
    return false;
}

function mouseup(){
    mousehit=false;
    return false;
}

var demoindex = 0;

function enterframe(){
    canvas = document.getElementById('overlay');
    if(canvas==null){
        return;
    }
    frame++;
    canvas.addEventListener('mousedown',mousedown);
    canvas.addEventListener('mouseup',mouseup);
    canvas.addEventListener('touchstart',mousedown);
    canvas.addEventListener('touchend',mouseup);
    context = canvas.getContext('2d');
    //context.canvas.width  = window.innerWidth;
    //context.canvas.height = window.innerHeight;
    if(true){
        if(mousehit){
            if(mouseon){
                if(!character.mouse){
                    character.mouse=true;
                    saveStuff.push(frame);
                    mouseon=false;
                }
            }
        } else {
            if(character.mouse){
                character.mouse=false;
                saveStuff.push(frame);
            }
            mouseon=true;
        }
    } else {
        if(demo.length> 0 && demo[0]==frame){
            demo.shift();
            character.mouse=!character.mouse;
        }
    }

    updateChar(character);
    createPlatforms();
    updatePlatforms();
    context.clearRect(0,0,677,375);
    drawPlatforms();
    drawChar(character);
    if(frame>300 && frame<302){
        console.log(saveStuff);
    }
}

function createPlatforms(){
    var lastplat = platforms[platforms.length-1];
    if(lastplat.x+lastplat.width<630 || random()>.98){
        var platform = new Platform();
        platform.x=Math.round(677+random()*110+60);
        platform.y=Math.round(random()*160-80+lastplat.y);
        platform.y=platform.y>350?350:platform.y;
        platform.y=platform.y<150?150:platform.y;
        platform.width=Math.round(random()*6+5)*60;
        platforms.push(platform);
    }
}

function Platform() {
    this.x=0;
    this.y=0;
    this.width=0;
}

function updateChar(character){
    if(character.mouse){
        if((character.jump && character.yspd>0 && character.droppedTime<3) || !character.jump || (character.yspd<0 && character.jumptime<10 && character.mouse)){
            character.yspd=-13-10*(10-character.jumptime)/100;
            character.jumptime++;
            character.jump=true;
        }
    }
    if(character.jump && !character.mouse){
        character.jumptime=5;
    }
    character.lasty=character.y;
    if(landedChar(character)){
        character.jump=false;
        character.jumptime=0;
        character.yspd=0;
    }
    if(character.jump){
        character.y+=character.yspd;
        character.droppedTime++;
        character.yspd+=grav;
    } else if(droppedChar(character)){
        character.jump=true;
        character.yspd=1;
    }
    character.y = Math.round(character.y);
    platformtime-=gamespd;
}

function updatePlatforms(){
    for(var i =0; i<platforms.length;i++){
        platforms[i].x-=platformspd;
        if(platforms[i].x<=-platforms[i].width-20){
            platforms.splice(i,1);
            i--;
        }
    }
    platformspd+=.01;
}

function drawChar(character){
    var index = character.frame%9;
    if(character.jump) {
        index = 4;
    }
    context.drawImage(charimg[index],character.x-charwidth,character.y-55);
    character.frame++;
}

function drawPlatforms(){
    for(var i =0; i<platforms.length;i++){
        var platform = platforms[i];
        context.drawImage(leftcap,platform.x-11, platform.y);
        for(var j = 0,k=0; j < platform.width; j+=60,k++) {
            context.drawImage(platformimg[k%3],platform.x+k*60,platform.y);
        }
        context.drawImage(leftcap,platform.x,platform.y);
        context.drawImage(rightcap,platform.x+platform.width,platform.y);
    }
}

function landedChar(character){
    for(var i =0; i < platforms.length; i++){
        var platform = platforms[i];
        var min = character.x-charwidth;
        var max = character.x+charwidth;
        if(min>platform.x && min<platform.x+platform.width||
                max>platform.x && max<platform.x+platform.width){
            if(character.lasty<=platform.y && character.y+character.yspd>=platform.y){
                character.y=platform.y;
                character.jump=false;
                character.yspd=0;
                character.lastplat=platform;
                return true;
            }
        }
    }
    if(character.y>500){
        gameOver();
    }
    return false;
}

function gameOver(){
    $("#game").hide();
    $("#highscore").show(); 
}

function droppedChar(character){
    if(character.lastplat!=null){
        var min = character.x-charwidth;
        var max = character.x+charwidth;
        var platform=character.lastplat;
        if(!(min>platform.x && min<platform.x+platform.width||
                max>platform.x && max<platform.x+platform.width)){
            character.lastplat=null;
            character.droppedTime=0;
            return true;
        }
    }
    return false;
}

$(document).ready( function() {
    $("#playagain").click( function() {
        $("#highscore").hide();
        $("#game").show();
        restart();
    });
});

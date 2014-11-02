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

function Char {
    this.x=0;
    this.y=0;
    this.xspd=0;
    this.yspd=0;
    this.jump=false;
    this.jumptime=0;
    this.lasty=0;
}

var grav = .2;

var keyup=false;
var platformspd=9;
var platforms = [];

function restart(){
    var seedNumber=100;
    seed(seedNumber);
    platforms = [];
    character.x=0;
    character.lasty=0;
    character.y=0;
    character.xspd=0;
    character.yspd=0;
    character.jump=false;
    character.jumptime=0;
}

function enterframe(){
    updateChar(character);
    createPlatforms();
    updatePlatforms();
    drawPlatforms();
}

function createPatforms(){
    if(random()>.99 || platformtime<0){
        var platform = new Platform();
        platform.x=800+random()*100;
        platform.y=random()*300+200;
        platforms.push(platform);
        platformtime=200;
    }
    platformtime-=platformspd;
}

function Platform {
    this.x=0;
    this.y=0;
    this.width=100;
}

function updateChar(character){
    if(keyup){
        if(!character.jump && character.jumptime<5){
            character.yspd=-10;
            character.jumptimer++;
            character.jump=true;
        }
    }
    if(landedChar(character)){
        character.jumptime=0;
        character.jump=false;
        character.yspd=0;
    }
    character.lasty=character.y;
    if(character.jump){
        character.y+=character.yspd;
        character.yspd+=grav;
    } else if(droppedChar(character)){
        character.jump=true;
        character.yspd=1;
    }
    platformtime-=gamespd;
}

function updatePlatforms(){
    for(var i =0; i<platforms.length;i++){
        platforms[i].x-=platformspd;
    }
    platformspd+=.0001;
}

function drawPlatforms(){
    for(var i =0; i<platforms.length;i++){
        var platform = platforms[i];
        //draw from platform.x to platform.x+platform.width, platform.y
    }
}

function landedChar(character){
    for(var i =0; i < platforms.length; i++){
        var platform = platforms[i];
        if(character.x-10 > platform.x && character.x+10<platform.x+platform.width){
            if(character.lasty<platform.y && character.y+character.yspd>platform.y){
                character.y=platform.y;
                character.jump=false;
                character.yspd=0;
            }
        }
    }
}

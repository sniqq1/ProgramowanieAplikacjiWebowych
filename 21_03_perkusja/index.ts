let boomSound: HTMLAudioElement;
let clapSound: HTMLAudioElement;
let hihatSound: HTMLAudioElement;
let kickSound: HTMLAudioElement;
let openhatSound: HTMLAudioElement;
let rideSound: HTMLAudioElement;
let snareSound: HTMLAudioElement;
let tinkSound: HTMLAudioElement;
let tomSound: HTMLAudioElement;

const channel1: any[] = [];
let ifRecord1: boolean = false;
let timeRecord1: number;
let counter1: number = 0;
startApp();


function startApp() :void {
    document.body.addEventListener('keypress', keyPressOn);
 
    loadButtons();
    loadAudio();
}

function loadButtons(): void{
    const btnChannel1 = document.querySelector('#channel1');
    btnChannel1.addEventListener('click', playChanel1);
    const btnRecord1 = document.querySelector('#record1');
    btnRecord1.addEventListener('click', recording1);
}
function recording1(ev: MouseEvent ) {
    counter1++;
    timeRecord1 = ev.timeStamp;
    if (counter1 % 2 == 0) {
        ifRecord1 = false;
    }
    else {
        ifRecord1 = true;
    }
}


function playChanel1():void {
    channel1.forEach(sound => {
        setTimeout( () => playSound(sound.key), sound.newTime);
    })
}

function loadAudio():void {
    boomSound = document.querySelector('[data-sound="boom"]');
    clapSound = document.querySelector('[data-sound="clap"]');
    hihatSound = document.querySelector('[data-sound="hihat"]');
    kickSound = document.querySelector('[data-sound="kick"]');
    openhatSound = document.querySelector('[data-sound="openhat"]');
    rideSound = document.querySelector('[data-sound="ride"]');
    snareSound = document.querySelector('[data-sound="snare"]');
    tinkSound = document.querySelector('[data-sound="tink"]');
    tomSound = document.querySelector('[data-sound="tom"]');
}



function keyPressOn(ev: KeyboardEvent): void {
    const key = ev.key;
    const time = ev.timeStamp;

    if (key=='q' || key=='w' ||key=='e' ||key=='r' ||key=='a' ||key=='s' ||
    key=='d' ||key=='f' ||key=='x' ) {
    playSound(key);
    }
    if( ifRecord1 ) {
    const newTime = time - timeRecord1;
    channel1.push({key,newTime});
    console.log(channel1);
    }

    
}

function playSound(key):void {

    switch(key) {
        case 'q' :
        boomSound.currentTime = 0;
        boomSound.play();
        
        case 'w' :
        clapSound.currentTime=0;
        clapSound.play();

        case 'e' :
        hihatSound.currentTime=0;
        hihatSound.play();

        case 'r' :
        kickSound.currentTime=0;
        kickSound.play();

        case 'a' :
        openhatSound.currentTime=0;
        openhatSound.play();

        case 's' :
        rideSound.currentTime=0;
        rideSound.play();

        case 'd' :
        snareSound.currentTime=0;
        snareSound.play();

        case 'f' :
        tinkSound.currentTime=0;
        tinkSound.play();

        case 'x':
        tomSound.currentTime=0;
        tomSound.play();
    }
   
}
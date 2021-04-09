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

startApp();

function startApp() :void {
    document.body.addEventListener('keypress', keyPressOn);
    const btnChannel1 = document.querySelector('#channel1');
    btnChannel1.addEventListener('click', playChanel1);
    loadAudio();

}
function playChanel1():void {
    channel1.forEach(sound => {
        setTimeout( () => playSound(sound.key), sound.time);
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
    channel1.push({key,time});
    playSound(key);
    console.log(ev);
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
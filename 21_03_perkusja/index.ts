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
const channel2: any[] = [];
let ifRecord2: boolean = false;
let timeRecord2: number;
let counter2: number = 0;
const channel3: any[] = [];
let ifRecord3: boolean = false;
let timeRecord3: number;
let counter3: number = 0;
const channel4: any[] = [];
let ifRecord4: boolean = false;
let timeRecord4: number;
let counter4: number = 0;
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

    const btnChannel2 = document.querySelector('#channel2');
    btnChannel2.addEventListener('click', playChanel2);
    const btnRecord2 = document.querySelector('#record2');
    btnRecord2.addEventListener('click', recording2);

    const btnChannel3 = document.querySelector('#channel3');
    btnChannel3.addEventListener('click', playChanel3);
    const btnRecord3 = document.querySelector('#record3');
    btnRecord3.addEventListener('click', recording3);

    const btnChannel4 = document.querySelector('#channel4');
    btnChannel4.addEventListener('click', playChanel4);
    const btnRecord4 = document.querySelector('#record4');
    btnRecord4.addEventListener('click', recording4);
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
function recording2(ev: MouseEvent) {
    counter2++;
    timeRecord2 = ev.timeStamp;
    if (counter2 % 2 == 0) {
        ifRecord2 = false;
    }
    else {
        ifRecord2 = true;
    }
}
function recording3(ev: MouseEvent) {
    counter3++;
    timeRecord3 = ev.timeStamp;
    if (counter3 % 2 == 0) {
        ifRecord3 = false;
    }
    else {
        ifRecord3 = true;
    }
}
function recording4(ev: MouseEvent) {
    counter4++;
    timeRecord4 = ev.timeStamp;
    if (counter4 % 2 == 0) {
        ifRecord4 = false;
    }
    else {
        ifRecord4 = true;
    }
}


function playChanel1():void {
    channel1.forEach(sound => {
        setTimeout( () => playSound(sound.key), sound.newTime);
    })
}

function playChanel2():void {
    channel2.forEach(sound => {
        setTimeout( () => playSound(sound.key), sound.newTime);
    })
}
function playChanel3():void {
    channel3.forEach(sound => {
        setTimeout( () => playSound(sound.key), sound.newTime);
    })
}
function playChanel4():void {
    channel4.forEach(sound => {
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
    if (ifRecord2) {
        const newTime = time - timeRecord2;
        channel2.push({key,newTime});
        console.log(channel2);
    }
    if (ifRecord3) {
        const newTime = time - timeRecord3;
        channel3.push({key,newTime});
        console.log(channel3);
    }
    if (ifRecord4) {
        const newTime = time - timeRecord4;
        channel4.push({key,newTime});
        console.log(channel4);
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
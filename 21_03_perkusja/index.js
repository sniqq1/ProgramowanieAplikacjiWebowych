var boomSound;
var clapSound;
var hihatSound;
var kickSound;
var openhatSound;
var rideSound;
var snareSound;
var tinkSound;
var tomSound;
var channel1 = [];
startApp();
function startApp() {
    document.body.addEventListener('keypress', keyPressOn);
    var btnChannel1 = document.querySelector('#channel1');
    btnChannel1.addEventListener('click', playChanel1);
    loadAudio();
}
function playChanel1() {
    channel1.forEach(function (sound) {
        setTimeout(function () { return playSound(sound.key); }, sound.time);
    });
}
function loadAudio() {
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
function keyPressOn(ev) {
    var key = ev.key;
    var time = ev.timeStamp;
    channel1.push({ key: key, time: time });
    playSound(key);
    console.log(ev);
}
function playSound(key) {
    switch (key) {
        case 'q':
            boomSound.currentTime = 0;
            boomSound.play();
        case 'w':
            clapSound.currentTime = 0;
            clapSound.play();
        case 'e':
            hihatSound.currentTime = 0;
            hihatSound.play();
        case 'r':
            kickSound.currentTime = 0;
            kickSound.play();
        case 'a':
            openhatSound.currentTime = 0;
            openhatSound.play();
        case 's':
            rideSound.currentTime = 0;
            rideSound.play();
        case 'd':
            snareSound.currentTime = 0;
            snareSound.play();
        case 'f':
            tinkSound.currentTime = 0;
            tinkSound.play();
        case 'x':
            tomSound.currentTime = 0;
            tomSound.play();
    }
}

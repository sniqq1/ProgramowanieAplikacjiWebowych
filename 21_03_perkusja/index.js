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
var ifRecord1 = false;
var timeRecord1;
var counter1 = 0;
startApp();
function startApp() {
    document.body.addEventListener('keypress', keyPressOn);
    loadButtons();
    loadAudio();
}
function loadButtons() {
    var btnChannel1 = document.querySelector('#channel1');
    btnChannel1.addEventListener('click', playChanel1);
    var btnRecord1 = document.querySelector('#record1');
    btnRecord1.addEventListener('click', recording1);
}
function recording1(ev) {
    counter1++;
    timeRecord1 = ev.timeStamp;
    if (counter1 % 2 == 0) {
        ifRecord1 = false;
    }
    else {
        ifRecord1 = true;
    }
}
function playChanel1() {
    channel1.forEach(function (sound) {
        setTimeout(function () { return playSound(sound.key); }, sound.newTime);
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
    if (key == 'q' || key == 'w' || key == 'e' || key == 'r' || key == 'a' || key == 's' ||
        key == 'd' || key == 'f' || key == 'x') {
        playSound(key);
    }
    if (ifRecord1) {
        var newTime = time - timeRecord1;
        channel1.push({ key: key, newTime: newTime });
        console.log(channel1);
    }
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

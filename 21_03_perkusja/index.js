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
var channel2 = [];
var ifRecord2 = false;
var timeRecord2;
var counter2 = 0;
var channel3 = [];
var ifRecord3 = false;
var timeRecord3;
var counter3 = 0;
var channel4 = [];
var ifRecord4 = false;
var timeRecord4;
var counter4 = 0;
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
    var btnChannel2 = document.querySelector('#channel2');
    btnChannel2.addEventListener('click', playChanel2);
    var btnRecord2 = document.querySelector('#record2');
    btnRecord2.addEventListener('click', recording2);
    var btnChannel3 = document.querySelector('#channel3');
    btnChannel3.addEventListener('click', playChanel3);
    var btnRecord3 = document.querySelector('#record3');
    btnRecord3.addEventListener('click', recording3);
    var btnChannel4 = document.querySelector('#channel4');
    btnChannel4.addEventListener('click', playChanel4);
    var btnRecord4 = document.querySelector('#record4');
    btnRecord4.addEventListener('click', recording4);
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
function recording2(ev) {
    counter2++;
    timeRecord2 = ev.timeStamp;
    if (counter2 % 2 == 0) {
        ifRecord2 = false;
    }
    else {
        ifRecord2 = true;
    }
}
function recording3(ev) {
    counter3++;
    timeRecord3 = ev.timeStamp;
    if (counter3 % 2 == 0) {
        ifRecord3 = false;
    }
    else {
        ifRecord3 = true;
    }
}
function recording4(ev) {
    counter4++;
    timeRecord4 = ev.timeStamp;
    if (counter4 % 2 == 0) {
        ifRecord4 = false;
    }
    else {
        ifRecord4 = true;
    }
}
function playChanel1() {
    channel1.forEach(function (sound) {
        setTimeout(function () { return playSound(sound.key); }, sound.newTime);
    });
}
function playChanel2() {
    channel2.forEach(function (sound) {
        setTimeout(function () { return playSound(sound.key); }, sound.newTime);
    });
}
function playChanel3() {
    channel3.forEach(function (sound) {
        setTimeout(function () { return playSound(sound.key); }, sound.newTime);
    });
}
function playChanel4() {
    channel4.forEach(function (sound) {
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
    if (ifRecord2) {
        var newTime = time - timeRecord2;
        channel2.push({ key: key, newTime: newTime });
        console.log(channel2);
    }
    if (ifRecord3) {
        var newTime = time - timeRecord3;
        channel3.push({ key: key, newTime: newTime });
        console.log(channel3);
    }
    if (ifRecord4) {
        var newTime = time - timeRecord4;
        channel4.push({ key: key, newTime: newTime });
        console.log(channel4);
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

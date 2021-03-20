class Pab {
    input1input : HTMLInputElement;
    input2input: HTMLInputElement;
    input3input: HTMLInputElement;
    input4input: HTMLInputElement;
    suminput: HTMLInputElement;
    avginput: HTMLInputElement;
    mininput: HTMLInputElement;
    maxinput: HTMLInputElement;

    constructor() {
        this.start();
    }

    start() {
        this.load();
        this.watch();
    }

    load() {
        this.input1input = document.querySelector('#input1');
        this.input2input = document.querySelector('#input2');
        this.input3input = document.querySelector('#input3');
        this.input4input = document.querySelector('#input4');
        this.suminput = document.querySelector('#sum');
        this.avginput = document.querySelector('#avg');
        this.mininput = document.querySelector('#min');
        this.maxinput = document.querySelector('#max');
    }

    watch() {
        this.input1input.addEventListener('input', () => this.countData());
        this.input2input.addEventListener('input', () => this.countData());
        this.input3input.addEventListener('input', () => this.countData());
        this.input4input.addEventListener('input', () => this.countData());
    }

    countData(){
        const data1  = +this.input1input.value;
        const data2 = +this.input2input.value;
        const data3 = +this.input3input.value;
        const data4 = +this.input4input.value;

        const sum = data1+data2+data3+data4;
        const avg = sum /4;
        const min = Math.min(data1,data2,data3,data4);
        const max = Math.max(data1, data2, data3, data4);
        this.show(sum, avg, min, max);
    }
    show(sum: number, avg: number, min: number, max: number) {
        this.suminput.value = sum.toString();
        this.avginput.value = avg.toString();
        this.mininput.value = min.toString();
        this.maxinput.value = max.toString();

    }


}

const hejka = new Pab();
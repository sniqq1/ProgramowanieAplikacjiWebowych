var Pab = /** @class */ (function () {
    function Pab() {
        this.start();
    }
    Pab.prototype.start = function () {
        this.load();
        this.watch();
    };
    Pab.prototype.load = function () {
        this.input1input = document.querySelector('#input1');
        this.input2input = document.querySelector('#input2');
        this.input3input = document.querySelector('#input3');
        this.input4input = document.querySelector('#input4');
        this.suminput = document.querySelector('#sum');
        this.avginput = document.querySelector('#avg');
        this.mininput = document.querySelector('#min');
        this.maxinput = document.querySelector('#max');
    };
    Pab.prototype.watch = function () {
        var _this = this;
        this.input1input.addEventListener('input', function () { return _this.countData(); });
        this.input2input.addEventListener('input', function () { return _this.countData(); });
        this.input3input.addEventListener('input', function () { return _this.countData(); });
        this.input4input.addEventListener('input', function () { return _this.countData(); });
    };
    Pab.prototype.countData = function () {
        var data1 = +this.input1input.value;
        var data2 = +this.input2input.value;
        var data3 = +this.input3input.value;
        var data4 = +this.input4input.value;
        var sum = data1 + data2 + data3 + data4;
        var avg = sum / 4;
        var min = Math.min(data1, data2, data3, data4);
        var max = Math.max(data1, data2, data3, data4);
        this.show(sum, avg, min, max);
    };
    Pab.prototype.show = function (sum, avg, min, max) {
        this.suminput.value = sum.toString();
        this.avginput.value = avg.toString();
        this.mininput.value = min.toString();
        this.maxinput.value = max.toString();
    };
    return Pab;
}());
var hejka = new Pab();

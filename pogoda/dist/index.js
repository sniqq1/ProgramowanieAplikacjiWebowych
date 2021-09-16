/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const apiKey = "a3bc515e60ed338d4c59cc163b1c1f96";
const cities = (_a = JSON.parse(localStorage.getItem('cities'))) !== null && _a !== void 0 ? _a : [];
let list;
const form = document.querySelector('.form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const city = document.querySelector('.add');
    cities.push(city.value);
    updateWeather(cities);
    city.value = "";
    localStorage.setItem('cities', JSON.stringify(cities));
});
updateWeather(cities);
function updateWeather(cities) {
    cities &&
        cities.forEach(city => {
            let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pl`;
            fetch(url)
                .then(response => response.json())
                .then(data => list = setList(data))
                .then(list => pageView(list));
        });
}
function setList(data) {
    const list = {
        weather: {
            id: data['weather']['id'],
            main: data['weather'][0]['main'],
            description: data['weather'][0]['description']
        },
        city: {
            timezone: data['timezone'],
            id: data['id'],
            name: data['name'],
            country: data['sys']['country'],
            dt: data['dt']
        },
        main: {
            temp: data['main']['temp'],
            pressure: data['main']['pressure']
        }
    };
    return list;
}
function pageView(weatherList) {
    let lista = document.querySelector(`#${weatherList.city.name}`);
    let cityInfo, weatherInfo, mainInfo;
    if (lista === null) {
        lista = document.createElement('div');
        lista.className = 'weatherList';
        lista.id = weatherList.city.name;
        let container = document.querySelector('.weatherLists');
        container.appendChild(lista);
        cityInfo = document.createElement('div');
        cityInfo.className = 'cityInfo';
        lista.appendChild(cityInfo);
        weatherInfo = document.createElement('div');
        weatherInfo.className = 'weatherInfo';
        lista.appendChild(weatherInfo);
        mainInfo = document.createElement('div');
        mainInfo.className = 'mainInfo';
        lista.appendChild(mainInfo);
    }
    else {
        cityInfo = lista.querySelector('.cityInfo');
        weatherInfo = lista.querySelector('.weatherInfo');
        mainInfo = lista.querySelector('.mainInfo');
    }
    cityInfo.innerHTML = `${weatherList.city.name}, ${weatherList.city.country}, UTC+${weatherList.city.timezone / 3600}, ${getDate(weatherList.city.dt)}`;
    weatherInfo.innerHTML = `${weatherList.weather.main} - ${weatherList.weather.description}`;
    mainInfo.innerHTML = `Temperatura: ${weatherList.main.temp}&degC, ciśnienie ${weatherList.main.pressure} hPa + "br"`;
}
function getDate(timestamp) {
    let date = new Date(timestamp * 1000);
    let hours = date.getHours();
    let minutes = "0" + date.getMinutes();
    let seconds = "0" + date.getSeconds();
    return hours + ':' + minutes.substr(-2);
}


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoRkEsTUFBTSxNQUFNLEdBQUUsa0NBQWtDLENBQUM7QUFFakQsTUFBTSxNQUFNLFNBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFjLG1DQUFJLEVBQUUsQ0FBQztBQUU5RSxJQUFJLElBQWtCLENBQUM7QUFFdkIsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQW9CLENBQUM7QUFDaEUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO0lBQ2xDLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUNuQixN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QUMsSUFBSSxDQUFDLENBQUM7SUFDcEMsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQzVCLElBQUksT0FBTyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDdEMsSUFBSSxPQUFPLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUV0QyxPQUFPLEtBQUssR0FBRyxHQUFHLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzVDLENBQUMiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC50c1wiKTtcbiIsImltcG9ydCB7IFdlYXRoZXJMaXN0IH0gZnJvbSBcIi4vd2VhdGhlclwiO1xyXG5cclxuY29uc3QgYXBpS2V5ID1cImEzYmM1MTVlNjBlZDMzOGQ0YzU5Y2MxNjNiMWMxZjk2XCI7XHJcblxyXG5jb25zdCBjaXRpZXMgPSAoSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY2l0aWVzJykpIGFzIHN0cmluZ1tdKSA/PyBbXTtcclxuXHJcbmxldCBsaXN0IDogV2VhdGhlckxpc3Q7XHJcblxyXG5jb25zdCBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvcm0nKSBhcyBIVE1MRm9ybUVsZW1lbnQ7XHJcbmZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgKGUpID0+IHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIGNvbnN0IGNpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkJykgYXMgSFRNTElucHV0RWxlbWVudDtcclxuICAgIGNpdGllcy5wdXNoKGNpdHkudmFsdWUpO1xyXG5cclxuICAgIHVwZGF0ZVdlYXRoZXIoY2l0aWVzKTtcclxuICAgIGNpdHkudmFsdWU9XCJcIjtcclxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdjaXRpZXMnLCBKU09OLnN0cmluZ2lmeShjaXRpZXMpKTtcclxufSlcclxuXHJcbnVwZGF0ZVdlYXRoZXIoY2l0aWVzKTtcclxuXHJcblxyXG5mdW5jdGlvbiB1cGRhdGVXZWF0aGVyKGNpdGllczogc3RyaW5nW10pIDp2b2lkIHtcclxuICAgIGNpdGllcyYmXHJcbiAgICBjaXRpZXMuZm9yRWFjaChjaXR5ID0+IHtcclxuICAgICAgICBsZXQgdXJsID0gYGh0dHA6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L3dlYXRoZXI/cT0ke2NpdHl9JmFwcGlkPSR7YXBpS2V5fSZ1bml0cz1tZXRyaWMmbGFuZz1wbGA7XHJcblxyXG4gICAgICAgIGZldGNoKHVybClcclxuICAgICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4gICAgICAgICAgICAudGhlbihkYXRhID0+IGxpc3QgPSBzZXRMaXN0KGRhdGEpKVxyXG4gICAgICAgICAgICAudGhlbihsaXN0ID0+IHBhZ2VWaWV3KGxpc3QpKTsgXHJcbiAgICB9KX1cclxuXHJcbiAgICBmdW5jdGlvbiBzZXRMaXN0KGRhdGE6IGFueSl7XHJcbiAgICAgICAgY29uc3QgbGlzdCA6IFdlYXRoZXJMaXN0ID0ge1xyXG4gICAgICAgICAgICB3ZWF0aGVyOiB7XHJcbiAgICAgICAgICAgICAgICBpZDogZGF0YVsnd2VhdGhlciddWydpZCddLFxyXG4gICAgICAgICAgICAgICAgbWFpbjogZGF0YVsnd2VhdGhlciddWzBdWydtYWluJ10sXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogZGF0YVsnd2VhdGhlciddWzBdWydkZXNjcmlwdGlvbiddXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGNpdHk6IHtcclxuICAgICAgICAgICAgICAgIHRpbWV6b25lOiBkYXRhWyd0aW1lem9uZSddLFxyXG4gICAgICAgICAgICAgICAgaWQ6IGRhdGFbJ2lkJ10sXHJcbiAgICAgICAgICAgICAgICBuYW1lOiBkYXRhWyduYW1lJ10sXHJcbiAgICAgICAgICAgICAgICBjb3VudHJ5OiBkYXRhWydzeXMnXVsnY291bnRyeSddLFxyXG4gICAgICAgICAgICAgICAgZHQ6IGRhdGFbJ2R0J11cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgbWFpbjoge1xyXG4gICAgICAgICAgICAgICAgdGVtcDogZGF0YVsnbWFpbiddWyd0ZW1wJ10sXHJcbiAgICAgICAgICAgICAgICBwcmVzc3VyZTogZGF0YVsnbWFpbiddWydwcmVzc3VyZSddXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGxpc3Q7XHJcbiAgICB9XHJcblxyXG5mdW5jdGlvbiBwYWdlVmlldyh3ZWF0aGVyTGlzdDpXZWF0aGVyTGlzdCkgOnZvaWQge1xyXG5cclxuICAgIGxldCBsaXN0YSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke3dlYXRoZXJMaXN0LmNpdHkubmFtZX1gKTtcclxuICAgIGxldCBjaXR5SW5mbywgd2VhdGhlckluZm8sIG1haW5JbmZvO1xyXG5cclxuICAgIGlmKCBsaXN0YSA9PT0gbnVsbCkge1xyXG4gICAgICAgIGxpc3RhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgbGlzdGEuY2xhc3NOYW1lID0nd2VhdGhlckxpc3QnO1xyXG4gICAgICAgIGxpc3RhLmlkID0gd2VhdGhlckxpc3QuY2l0eS5uYW1lO1xyXG4gICAgICAgIGxldCBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud2VhdGhlckxpc3RzJyk7XHJcbiAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGxpc3RhKTtcclxuICAgICAgICBcclxuXHJcblxyXG4gICAgICAgIGNpdHlJbmZvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgY2l0eUluZm8uY2xhc3NOYW1lID0gJ2NpdHlJbmZvJztcclxuICAgICAgICBsaXN0YS5hcHBlbmRDaGlsZChjaXR5SW5mbyk7XHJcblxyXG4gICAgICAgIHdlYXRoZXJJbmZvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgd2VhdGhlckluZm8uY2xhc3NOYW1lID0gJ3dlYXRoZXJJbmZvJztcclxuICAgICAgICBsaXN0YS5hcHBlbmRDaGlsZCh3ZWF0aGVySW5mbyk7XHJcblxyXG4gICAgICAgIG1haW5JbmZvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgbWFpbkluZm8uY2xhc3NOYW1lID0gJ21haW5JbmZvJztcclxuICAgICAgICBsaXN0YS5hcHBlbmRDaGlsZChtYWluSW5mbyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNpdHlJbmZvID0gbGlzdGEucXVlcnlTZWxlY3RvcignLmNpdHlJbmZvJylcclxuICAgICAgICB3ZWF0aGVySW5mbyA9IGxpc3RhLnF1ZXJ5U2VsZWN0b3IoJy53ZWF0aGVySW5mbycpXHJcbiAgICAgICAgbWFpbkluZm8gPSBsaXN0YS5xdWVyeVNlbGVjdG9yKCcubWFpbkluZm8nKVxyXG4gICAgfVxyXG4gICAgY2l0eUluZm8uaW5uZXJIVE1MID0gYCR7d2VhdGhlckxpc3QuY2l0eS5uYW1lfSwgJHt3ZWF0aGVyTGlzdC5jaXR5LmNvdW50cnl9LCBVVEMrJHt3ZWF0aGVyTGlzdC5jaXR5LnRpbWV6b25lLzM2MDB9LCAke2dldERhdGUod2VhdGhlckxpc3QuY2l0eS5kdCl9YFxyXG4gICAgd2VhdGhlckluZm8uaW5uZXJIVE1MID0gYCR7d2VhdGhlckxpc3Qud2VhdGhlci5tYWlufSAtICR7d2VhdGhlckxpc3Qud2VhdGhlci5kZXNjcmlwdGlvbn1gXHJcbiAgICBtYWluSW5mby5pbm5lckhUTUwgPSBgVGVtcGVyYXR1cmE6ICR7d2VhdGhlckxpc3QubWFpbi50ZW1wfSZkZWdDLCBjacWbbmllbmllICR7d2VhdGhlckxpc3QubWFpbi5wcmVzc3VyZX0gaFBhICsgXCJiclwiYFxyXG4gICAgXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldERhdGUodGltZXN0YW1wIDpudW1iZXIpIDpzdHJpbmcge1xyXG4gICAgbGV0IGRhdGUgPSBuZXcgRGF0ZSh0aW1lc3RhbXAqMTAwMCk7XHJcbiAgICBsZXQgaG91cnMgPSBkYXRlLmdldEhvdXJzKCk7XHJcbiAgICBsZXQgbWludXRlcyA9IFwiMFwiICsgZGF0ZS5nZXRNaW51dGVzKCk7XHJcbiAgICBsZXQgc2Vjb25kcyA9IFwiMFwiICsgZGF0ZS5nZXRTZWNvbmRzKCk7XHJcblxyXG4gICAgcmV0dXJuIGhvdXJzICsgJzonICsgbWludXRlcy5zdWJzdHIoLTIpO1xyXG59Il0sInNvdXJjZVJvb3QiOiIifQ==
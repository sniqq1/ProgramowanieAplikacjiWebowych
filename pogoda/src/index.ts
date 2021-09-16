import { WeatherList } from "./weather";

const apiKey ="a3bc515e60ed338d4c59cc163b1c1f96";

const cities = (JSON.parse(localStorage.getItem('cities')) as string[]) ?? [];

let list : WeatherList;

const form = document.querySelector('.form') as HTMLFormElement;
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const city = document.querySelector('.add') as HTMLInputElement;
    cities.push(city.value);

    updateWeather(cities);
    city.value="";
    localStorage.setItem('cities', JSON.stringify(cities));
})

updateWeather(cities);


function updateWeather(cities: string[]) :void {
    cities&&
    cities.forEach(city => {
        let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pl`;

        fetch(url)
            .then(response => response.json())
            .then(data => list = setList(data))
            .then(list => pageView(list)); 
    })}

    function setList(data: any){
        const list : WeatherList = {
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
        }
        return list;
    }

function pageView(weatherList:WeatherList) :void {

    let lista = document.querySelector(`#${weatherList.city.name}`);
    let cityInfo, weatherInfo, mainInfo;

    if( lista === null) {
        lista = document.createElement('div');
        lista.className ='weatherList';
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
    } else {
        cityInfo = lista.querySelector('.cityInfo')
        weatherInfo = lista.querySelector('.weatherInfo')
        mainInfo = lista.querySelector('.mainInfo')
    }
    cityInfo.innerHTML = `${weatherList.city.name}, ${weatherList.city.country}, UTC+${weatherList.city.timezone/3600}, ${getDate(weatherList.city.dt)}`
    weatherInfo.innerHTML = `${weatherList.weather.main} - ${weatherList.weather.description}`
    mainInfo.innerHTML = `Temperatura: ${weatherList.main.temp}&degC, ciśnienie ${weatherList.main.pressure} hPa`
    
}

function getDate(timestamp :number) :string {
    let date = new Date(timestamp*1000);
    let hours = date.getHours();
    let minutes = "0" + date.getMinutes();
    let seconds = "0" + date.getSeconds();

    return hours + ':' + minutes.substr(-2);
}
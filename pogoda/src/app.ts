import { IWeather, IWeatherData } from './interface';



export class App {
    apiKey = "a3bc515e60ed338d4c59cc163b1c1f96";
 

    constructor() {
      this.load();

    }
    
    async getCityInfo(city?: string) {
        
        if(city) {
            const weather = await this.getWeather(city);
            if(weather && weather.cod === 200) {
                this.saveData(weather);
            }

            return weather;
        } 
    }

    async getWeather(city: string): Promise<IWeatherData> {
        const openWeatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${this.apiKey}`;
        const weatherResponse = await fetch(openWeatherUrl);
        const weatherData = await weatherResponse.json();

        console.log(weatherData);
  
        return weatherData;
    }

    saveData(data: IWeatherData) {
            localStorage.setItem('weatherData', JSON.stringify(data));
    }

    getData() {
        const data = localStorage.getItem('weatherData');
        if (data) {
            return JSON.parse(data);
        }
        else {
            return{};
        }
    }
    load() {
    const cityButton: HTMLButtonElement = document.querySelector('#cityButton');
    const cityInput = document.getElementById('cityInput') as HTMLInputElement;
   
    
    
    cityButton.addEventListener('click', () => {


        const nameCity: string = cityInput.value;
        console.log(nameCity);
        this.getCityInfo(nameCity);
    });
    }
}




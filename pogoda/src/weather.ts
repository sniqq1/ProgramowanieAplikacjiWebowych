interface City {
    timezone: number,
    id: number,
    name: string,
    country: string,
    dt: number
}

export interface Weather {
    id: number,
    main: string,
    description: string
}

interface Main {
    temp: number,
    pressure: number
}

export interface WeatherList {
    city: City,
    weather: Weather,
    main : Main
}
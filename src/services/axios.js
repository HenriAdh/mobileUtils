import axios from "axios";

const apiCep = axios.create({
    baseURL: 'https://viacep.com.br/ws/'
})

const apiPrice = axios.create({
    baseURL: 'https://economia.awesomeapi.com.br/last/'
})

const apiWeather = axios.create({
    baseURL: 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/'

    // unitGroup=metric&key=ACR62RQ5MMQA829ZFEPDT9MEX&contentType=json
})

export {apiCep, apiPrice, apiWeather};
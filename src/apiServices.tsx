
import axios from 'axios';


export const API_SRC_BASE = 'https://www.metaweather.com/api';
export const IMG_SRC_BASE = 'https://www.metaweather.com/static/img/weather/png/64/';



export const getCityId = async (city: string) =>{
    try{

        return await axios.get(`${API_SRC_BASE}/location/search/?query=${city}`)   
    }catch(e){
        return null
    }
}

export const getCityWeather = async (id: number) =>{
    try{

        return axios.get(`${API_SRC_BASE}/location/${id}`)
    }catch(e){
        return null
    }
}


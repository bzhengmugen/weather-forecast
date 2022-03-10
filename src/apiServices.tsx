import React from 'react'
import axios from 'axios';


export const API_SRC_BASE = 'https://www.metaweather.com/api';
export const IMG_SRC_BASE = 'https://www.metaweather.com/static/img/weather/png/64/';

export const client = axios.create({
    baseURL: API_SRC_BASE,
})
  

export const getCityId = (city: string) =>{
    return client.get(`${API_SRC_BASE}/location/search/?query=${city}`)   
}

export const getCityWeather = (id: number) =>{
    return client.get(`${API_SRC_BASE}/location/${id}`)
}


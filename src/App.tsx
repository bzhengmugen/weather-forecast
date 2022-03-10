import React, {useState, useEffect} from 'react';
import './App.css';
import {getCityId, getCityWeather} from './apiServices'

const IMG_SRC_BASE = 'https://www.metaweather.com/static/img/weather/png/64/';

  


export const cityList = [
  'gothenburg',
'stockholm',
'mountain view',
'london',
'new york',
'berlin',]
// getting info for date
const today = new Date();
const dd = String(today.getDate() + 1).padStart(2, '0');
const mm = String(today.getMonth() + 1).padStart(2, '0');
const yyyy = today.getFullYear();
function App() {
  const [citysData, setCitysData] = useState<any>([])
  useEffect(()=>{
    cityList.map((city) =>{
      loadCityId(city)
    })
  },[])
  // fetch city  id info by searching on api
  const loadCityId = async (city: string) =>{
 
    await getCityId(city).then(({data}: any) => {
      console.log(data[0].woeid)
      loadCityWeather(data[0].woeid)
    }).catch(err =>{
      console.log('Error reading data' + err)
    })
  } 
  //fetch city weather info by city id
  const loadCityWeather = async (id:number) => {
   
    await getCityWeather(id).then(({data}: any)=>{
      setCitysData((prevState: any) => [
              ...prevState,
              // take the city name and the next day's weather info
              { name: data.title, data: data.consolidated_weather[0] },
            ]);
    }).catch(err =>{
      console.log('Error reading data' + err)
    })
  };

  return (
    <div className='app'>
      <h1 className='title'>
        {' '}
        Weather for Tomorrow {yyyy}/{mm}/{dd}{' '}
      </h1>
      <div className='table-container'>
      {citysData.length > 0 && (
        <table className='weather-table'>
          <thead>
            <tr className='table-head'>
              <th > City </th>
              <th> Weather </th>
              <th> Temperatrue </th>
              <th> Wind Speed </th>
            </tr>
          </thead>
          <tbody className='table-body'>
            {citysData.map((city: any) => {
              return (
                <tr key={city.data.woeid} role='ready'>
                  <td> {city.name} </td>
                  <td>
                    {' '}
                    <p> {city.data.weather_state_name} </p>{' '}
                    <img
                      src={`${IMG_SRC_BASE}${city.data.weather_state_abbr}.png`}
                    />
                  </td>
                  <td> {city.data.the_temp} C</td>
                  <td> {Math.round(city.data.wind_speed * 100) / 100} mph</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        
      )}
      </div>
    </div>
  );
}

export default App;

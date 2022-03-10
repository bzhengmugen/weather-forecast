import { promises } from 'stream'
import {getCityId, getCityWeather} from './apiServices'

global.fetch = jest.fn(() =>{
    Promise.resolve({
        json: ()=> Promise.resolve({
            data: [{woeid: 44418}]
        })
    })
}) as jest.Mock;


it('get the city id of london', async ()=>{
    const cityId =await getCityId('london').then(({data}: any) =>{
        return data[0].woeid
    })
    expect(cityId).toEqual(44418)
})
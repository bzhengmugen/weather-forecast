import { promises } from 'stream'
import {getCityId, getCityWeather,API_SRC_BASE} from './apiServices'
import axios from 'axios'


jest.mock('axios', ()=>{
    return {
        get:jest.fn()
    }
})
const mockedAxios = axios as jest.Mocked<typeof axios>;

beforeEach(()=>{
    
})
describe('when get city id call is successful', ()=>{
    it('get the city id of london', async ()=>{
        const resp = {data:[{woeid: 44418}]}
        mockedAxios.get.mockResolvedValueOnce(resp);
        const cityId = await getCityId('london').then(({data}: any) =>{
            return data[0].woeid
        })
        expect(mockedAxios.get).toBeCalledWith(`${API_SRC_BASE}/location/search/?query=london`)
        expect(cityId).toEqual(44418)
    })
})

describe('when get city id call is fails', ()=>{
    it('should return null', async ()=>{

        const message = 'Network Error';
        mockedAxios.get.mockResolvedValueOnce(new Error(message))
        const cityId = await getCityId('london').then(({data}: any) =>{
            return data
        })
        expect(cityId).toBeFalsy()
    })

})

describe('when get city weather call success', () =>{

    it('get the city weather info by city id', async ()=>{
        const resp = {data: [{title: 'london', temp: 7 }]}
        mockedAxios.get.mockResolvedValueOnce(resp);
        const cityInfo = await getCityWeather(44418).then(({data}: any) =>{
            return data[0]
        })
        expect(mockedAxios.get).toBeCalledWith(`${API_SRC_BASE}/location/44418`)
        expect(cityInfo).toEqual({title: 'london', temp: 7 })
    })
})

describe('when get city weather call fails', () =>{

    it('get the city weather info by city id', async ()=>{
        const message = 'Network Error'
        mockedAxios.get.mockResolvedValueOnce(message);
        const cityInfo = await getCityWeather(44418).then(({data}: any) =>{
            return data
        })
        expect(mockedAxios.get).toBeCalledWith(`${API_SRC_BASE}/location/44418`)
        expect(cityInfo).toBeFalsy()
    })
})
import { useState } from 'react';
import axios from 'axios';
import './App.css';
import sxPlant from './assets/PiantaSinistra.svg';
import dxPlant from './assets/PianteDestra.svg';
import sxMenso from './assets/MensolaSinistra.svg';
import dxMenso from './assets/MensolaDestra.svg';
import searchI from './assets/Ricerca.svg';
import defaultNotProvided from './assets/defaultNotProvided.png';

export function App() {
  
  // ! GET Data
  const [query, setQuery] = useState('')

  const handleChange = event => {
    setQuery(event.target.value);
  };
  const [datas, setDatas] = useState([])

  const handleReq = async () => {
    try {
      const response = await axios.request(options);
      setDatas(response.data.data)
      handleData
    } catch (error) {
      console.error(error);
    }
  } // * End handleReq

  const handleData = () => {
    let list = [];
    for (let i = 0; i < datas.length; i++) {
      let item = datas[i]
      item.single = false
      list.push(item)
    }
    setDatas(list)
  }

  const options = {
    method: 'GET',
    url: `https://perenual.com/api/species-list?key=sk-UdnC64514ddaef6e7724&q=${query.toLowerCase()}`,
    headers: {
      'X-RapidAPI-Key': 'sk-UdnC64514ddaef6e7724',
      'X-RapidAPI-Host': 'perenual.com'
    }
  };

  // ! HandleSingle
  const handleSingle = (id) => {
    let list = []
    for (let i = 0; i < datas.length; i++) {
      let item = datas[i]
      if(id === item.id) {item = {...item, single: !item.single}}
      else item = item
      list.push(item)
    } // * End for
    setDatas(list)
  } // * End handleSingle

  return (
    <div className={`App ${datas.length > 1 ? 'h-fit' : 'h-screen'} w-full flex justify-center bg-backG`}>
      <div className="fixed w-full h-screen pointer-events-none flex flex-col justify-between xl:h-fit xl:block">
        <section className="flex justify-between items-start">
            <img src={sxPlant} alt="sx Plant" className="w-1/4 xl:w-1/5" />
            <img src={dxPlant} alt="dx Plant" className="w-1/4 xl:w-1/5" />
        </section>
        <section className="flex justify-between items-baseline">
            <img src={sxMenso} alt="sx Men" className="w-1/4 xl:w-1/5" />
            <img src={dxMenso} alt="dx Men" className="w-1/4 xl:w-1/5" />
        </section>
      </div>
      <section className="mt-24 flex flex-col items-center max-w-xs text-center text-text font-calibri text-base xl:text-lg xl:mt-16 xl:max-w-lg">
        <h1 className="font-cocoGoose text-2xl text-title xl:text-8xl">BOTANY</h1>
        <p>Look for the plant that has attracted your attention and discover its details or find out how to cure yours.</p>
        <section className="mt-16 max-w-lg flex">
            <input type="text" name="plant" id="query" className="w-72 h-10 rounded-full p-5 outline-none capitalize xl:w-96" placeholder="Write the name of a plant..." maxLength="25" onInput={handleChange} value={query}/>
            <img src={searchI} alt="ricerca" className="w-5 relative -translate-x-10 cursor-pointer rounded-full" id="search" onClick={handleReq}/>
        </section>
        <div className="">
          {
            datas.map((data) => {        
              return(
                <section key={data.id} className="mt-10 bg-white w-60 h-60 rounded-xl overflow-hidden text-left hover:shadow-2xl duration-500 xl:w-96 xl:h-96">
                  <img src={data.default_image === null || data.default_image.original_url === null ? defaultNotProvided : data.default_image.original_url} alt={`${data.id} Plant`} className="h-4/6 w-full object-cover"/>
                  <div className="p-2 h-2/6 flex flex-col justify-between items-start">
                    <section className='w-full'>
                      <h1>{data.common_name}</h1>
                      <p className="text-gray-500 overflow-hidden text-ellipsis w-[calc(100%-3rem)] whitespace-nowrap" id="desc">{data.scientific_name}</p>
                    </section>
                    <div className="w-full flex justify-end xl:block">
                      <button className='bg-backG w-5 h-5 flex justify-center font-bold items-center rounded-lg shadow-xl xl:w-fit xl:h-fit xl:font-normal xl:py-2 xl:px-5' onClick={() => {handleSingle(data.id)}}>{window.innerWidth < 1280 ? '+' : 'More Info'}</button>
                    </div>
                    <div className={`fixed inset-0 flex justify-center items-center bg-backSmoked duration-500 ${data.single ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                      <section className='w-11/12 h-4/6 bg-white rounded-2xl overflow-hidden xl:w-1/2 xl:h-1/2'>
                        <div className="relative m-3 float-right cursor-pointer" onClick={() => {handleSingle(data.id)}}>
                          <div className="h-1 w-5 rounded-xl bg-title m-1 rotate-45 translate-y-1"></div>
                          <div className="h-1 w-5 rounded-xl bg-title m-1 -rotate-45 -translate-y-1"></div>
                        </div>
                        <div className="w-full h-1/3 pl-5 pt-5 bg-backG">
                          <img src={data.default_image === null || data.default_image.small_url === null ? defaultNotProvided : data.default_image.small_url} alt={`${data.id} Plant`} className='w-1/3 h-[calc(100%+20px)] object-cover rounded-lg xl:w-1/6 xl:h-[calc(100% + 1rem)]'/>
                        </div>
                        <div className="flex justify-between h-2/3">
                          <section className='pt-6 pl-5 font-bold flex flex-col justify-evenly'>
                            <h1>Name: <span className='text-gray-500 font-normal'>{data.common_name}</span></h1>
                            <h1>Cycle: <span className='text-gray-500 font-normal'>{data.cycle}</span></h1>
                            <h1>Scientific Name: <span className='text-gray-500 font-normal'>{data.scientific_name}</span></h1>
                            <h1 className='flex'>Sunlight: <div className="flex text-gray-500 font-normal">{ data.sunlight > 1 ?
                              data.sunlight.map((sun, i) => {
                                return(
                                  <section>
                                    <h1>&nbsp;{sun}{ i === data.sunlight.length - 1 ? '' : ',\xa0'}</h1>
                                  </section>
                                )
                              })
                              :
                              `\xa0 ${data.sunlight}`
                              }</div></h1>
                            <h1>Watering: <span className='text-gray-500 font-normal'>{data.watering}</span></h1>
                          </section>
                          {window.innerWidth < 1280 ? '' : <img src={dxMenso} alt="" className='w-56'/>}
                        </div>
                      </section>
                    </div>
                  </div>
                </section>
              )
            }) // * End map
          }
        </div>
      </section>
    </div>
  )
}




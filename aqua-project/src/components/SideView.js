import '../App.css';
import { Icon } from '@iconify/react';
import React, { useEffect, useState } from "react";


function SideView() {
  const [date, setDate] = useState(new Date());

    useEffect(() => {
      const intervalId = setInterval(() => {
        setDate(new Date());
      }, 1000);
      return () => clearInterval(intervalId);
    }, []);
    
    const [temperature, setTemperature] = useState(null);
    const [condition, setCondition] = useState(null);

  useEffect(() => {

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=14.70&lon=121.03&appid=5785d4993a0c6b5ba049b85ac0d20a5f`)

      .then(response => response.json())
      .then(data => {
        const temp = Math.round(data.main.temp - 273.15);
        const condition = data.weather[0].description;
        setTemperature(temp);
        setCondition(condition);
      })
      .catch(error => console.error(error));
  }, []);
 return (
    <>
    <div class="sideview">
      <div class="sideview-container"> 
        <div class="time">
            <p class="hours"> <span>{<Icon icon="ic:round-access-time" color="#3f3f3f" />}</span>{date.toLocaleTimeString()}</p>
            <p class="dates">{date.toLocaleDateString()}</p>
        </div>
        <div className='weather'>
          <div class="temp">
            <h1>{temperature}{<Icon icon="tabler:temperature-celsius" color="#3f3f3f" width="24px" height="24px"/>} </h1>
          </div>
          <div className='weather-condition'>
            <p>{condition}</p>
            <p className='place'>Quezon City</p>
          </div>
        </div>
        
      </div>
    </div>
    </>
  );
}

export default SideView;
  
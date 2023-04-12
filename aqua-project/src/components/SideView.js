import '../App.css';
import { Icon } from '@iconify/react';
import React, { useEffect, useState } from "react";
import axios from 'axios';


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

  /// OPEN-METEO  * fetch data error

 

// const [temperature, setTemperature] = useState(null);
// const [weatherCondition, setWeatherCondition] = useState(null);
// const [isLoading, setIsLoading] = useState(true);
// const [errorMessage, setErrorMessage] = useState(null);

//   useEffect(() => {
//     axios.get('https://api.open-meteo.com/v1/forecast?latitude=14.66&longitude=121.02&hourly=temperature_2m,weathercode&daily=weathercode&current_weather=true&past_days=1&forecast_days=1&timezone=Asia%2FSingapore')
//     .then(response => {
//       if (response.data && response.data.data && response.data.data.length > 0) {
//         setTemperature(response.data.data[0].temperature_2m);
//         setWeatherCondition(mapWeatherCondition(response.data.data[0].weathercode));
//       } else {
//         setErrorMessage('No data found.');
//       }
//     })
//     .catch(error => {
//       console.log(error);
//       setErrorMessage('Error fetching data.');
//     })
//     .finally(() => {
//       setIsLoading(false);
//     });
// }, []);
// const mapWeatherCondition = (code) => {
//   switch (code) {
//     case 0:
//       return 'Clear sky';
//     case 1:
//       return 'Mostly clear';
//     case 2:
//       return 'Partly cloudy';
//     case 3:
//       return 'Overcast';
//     case 4:
//       return 'Fog';
//     case 5:
//       return 'Rain showers';
//     case 6:
//       return 'Rain';
//     case 7:
//       return 'Thunderstorm';
//     case 8:
//       return 'Light snow';
//     case 9:
//       return 'Snow';
//     case 10:
//       return 'Heavy snow';
//     default:
//       return 'Unknown';
//   }
// };

// if (isLoading) {
//   return <p>Loading...</p>;
// }

// if (errorMessage) {
//   return <p>{errorMessage}</p>;
// }
 return (
    <>
    
      <div className='sideview-container mt-4'> 
        <div className='weather-row'>
          <div className="temp-column">
            <h1 className='temperature'>{temperature}{<Icon icon="tabler:temperature-celsius" color="#3f3f3f"/>} </h1>
            <p>Temperature</p>
              <div className='time'>
                <p className="hours "> <span>{<Icon icon="ic:round-access-time" color="#3f3f3f" />}</span>{date.toLocaleTimeString([], {hour: '2-digit' , minute:'2-digit'})}</p>
                <p className="dates"><span>{<Icon icon="material-symbols:calendar-month-outline" />}</span>{date.toLocaleDateString([], {month:'long', day:'2-digit', year:'numeric'})}</p>
              </div>
          </div>
          <div className='weather-condition-column'>
          <div className='condition'>{<Icon icon="ic:outline-cloud-queue" width="42px" height="42px"/>}<span className='output'>{condition}</span></div>
            <p className='place'>Quezon City, Philippines</p>
            {/* {temperature && <p>The temperature is {temperature} degrees Celsius.</p>}
            {weatherCondition && <p>The weather condition is {weatherCondition}.</p>} */}
          </div>
        </div>
      </div>

    </>
  );
}

export default SideView;

  
import "../App.css";
import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";

import clearsky from '../img/Clear.png';
import partlycloudy from '../img/partly cloudy.png';
import fog from  '../img/fog.png';
import drizzle from  '../img/Drizzle.png';
import rain from  '../img/rain.png';
import rainshowers from  '../img/showers.png';
import thunderstorm from  '../img/thunderstorm.png';


function getWeatherCategory(code) {

  if (code === 0) {     
    return "Clear Sky";
  } else if (code >= 1 && code <= 44) {
    return " Partly Cloudy";
  } else if (code >= 45 && code <= 47) {
    return "Fog";
  } else if (code >= 48 && code <= 55) {
    return "Drizzle";
  } else if (code >= 56 && code <= 77) {
    return "Rain";
  } else if (code >= 80 && code <= 94) {
    return "Rain Shower";
  } else if (code >= 95 && code <= 99) {
    return "Thunderstorm";
  } else {
    return " ";
  }
}
// function weatherImage({getWeatherCategory.code}) {
//   const imgsrc = {

//   }
// }

function SideView() {


  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDate(new Date());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const [openMeteo, setOpenMeteoState] = useState({});

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const [cordinatesName, setCordinatesName] = useState({});

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const { latitude, longitude } = position.coords;
        setLatitude(latitude);
        setLongitude(longitude);
      });
    } else {
      console.log("Geolocation is not supported by your browser");
    }
  }, []);

  useEffect(() => {
    if (latitude && longitude) {
      fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,weathercode&current_weather=true`
      )
        .then((response) => response.json())
        .then((data) => {
          // console.log(data);
          setOpenMeteoState({
            temp: data.current_weather.temperature,
            code: data.current_weather.weathercode,
          });
        })
        .catch((error) => console.error(error));
    }
  }, [latitude, longitude]);

  useEffect(() => {
    if (latitude && longitude) {
      fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      )
        .then((response) => response.json())
        .then((data) => {
          // console.log(data);
          setCordinatesName({
            cityname: data.address.city,
            countryname: data.address.country,
          });
        })
        .catch((error) => console.error(error));
    }
  }, [latitude, longitude]);

  // const weatherCategory = getWeatherCategory(openMeteo.code);

  let imgURL = ""; 
  let weatherCategory = "";
    
    if(openMeteo.code === 0) {
        imgURL = clearsky;
        weatherCategory = "Clear Sky"

    } else if(openMeteo.code >= 1 && openMeteo.code <=44){
        imgURL = partlycloudy;
        weatherCategory = "Partly Cloudy"
    
    } else if(openMeteo.code >= 45 && openMeteo.code <= 47){
        imgURL = fog;
        weatherCategory = "Fog"
 
    } else if(openMeteo.code >= 48 && openMeteo.code <= 55){
        imgURL = drizzle;
        weatherCategory = "Drizzle";
    
    } else if(openMeteo.code >= 56 && openMeteo.code <= 77){
        imgURL = rain;
        weatherCategory = "Rain";

    } else if(openMeteo.code >= 80 && openMeteo.code <= 94){
        imgURL = rainshowers;
        weatherCategory = "Rain Shower"
    
    } else if(openMeteo.code >= 95 && openMeteo.code <=99){
        imgURL = thunderstorm;
        weatherCategory = "Thunderstorm"
    } else{
        imgURL = " ";
        weatherCategory = " ";
    }
  
return (
    <> 
      <div className="sideview-container mt-4">
        <div className="weather-row">
          <div className="temp-column">
            <h1 className="temperature">
              {openMeteo.temp}
              {<Icon icon="tabler:temperature-celsius" color="#3f3f3f" />}{" "}
            </h1>
            <p>Temperature</p>
            <div className="time">
              <p className="hours ">
                {" "}
                <span>
                  {<Icon icon="ic:round-access-time" color="#3f3f3f" />}
                </span>
                {date.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
              <p className="dates">
                <span>
                  {<Icon icon="material-symbols:calendar-month-outline" />}
                </span>
                {date.toLocaleDateString([], {
                  month: "long",
                  day: "2-digit",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
          <div className="weather-condition-column">
            <div className="condition">
              <img src={imgURL} 
                width= "42px"
                height= "42px"
                alt="Weather Icon"/>
              {/* <img src={weatherCategoryIcon.code} alt="Icon"/>   */}
              <span className="output">{weatherCategory}</span>
            </div>
            <p className="place">
              {cordinatesName.cityname},{" "}
              <span>{cordinatesName.countryname}</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default SideView;

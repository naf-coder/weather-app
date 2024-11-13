import { useEffect, useRef, useState } from "react";
import axios from "axios";

import { IoIosSearch } from "react-icons/io"; // Search icon

//images imported from assets

import cloud from "../assets/cloud.png";
import humidity from "../assets/humidity.png";
import wind from "../assets/wind.png";

const Weather = () => {
  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState({});
  const [isLoading, setLoading] = useState(true);

  const search = async (city) => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=695be842af49c6b63bbd6688a6540a89`
      );

      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        tempreature: Math.floor(data.main.temp),
        location: data.name,
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // setting the current location
  const searchByCoordinates = async (lat, lon) => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=695be842af49c6b63bbd6688a6540a89`
      );

      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        tempreature: Math.floor(data.main.temp),
        location: data.name,
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          searchByCoordinates(latitude, longitude);
        },
        (error) => {
          console.error(error);
          search("");
        }
      );
    } else {
      search("geolocation is not available");
    }
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-[90%] md:w-[60vh] h-auto md:h-[70vh] bg-sky-300/30 rounded-lg p-5 overflow-hidden">
      <form className="flex justify-center items-center">
        <input
          ref={inputRef}
          type="text"
          placeholder="Search your City...."
          className="border border-white md:w-[60%] mt-4 ml-2 p-3 rounded-3xl bg-slate-100"
        />
        <button
          className="w-10 h-10 last:md:w-12 md:h-12 rounded-full mt-4 ml-2 p-3 bg-slate-100 flex justify-center items-center"
          onClick={() => search(inputRef.current.value)}
        >
          <IoIosSearch className="text-black" />
        </button>
      </form>

      <section className="flex flex-col justify-center items-center">
        <div className="">
          <img
            src={cloud}
            className="w-28 h-28 md:w-40 md:h-40 my-2"
            alt="cloud picture"
          />
        </div>
        <p className="mt-2 text-3xl md:text-5xl">{weatherData.tempreature}°c</p>
        <h1 className="text-3xl font-semibold my-2">{weatherData.location}</h1>
      </section>

      <section className="flex justify-between items-center md:mx-10 md:my-10">
        <div>
          <div className="flex items-center">
            <img src={humidity} className="mr-2" alt="PNG of humidity" />
            <p>{weatherData.humidity}°c</p>
          </div>
          <p className="m-2 text-blue-900">Humidity</p>
        </div>
        <div>
          <div className="flex items-center">
            <img src={wind} className="mr-2" alt="PNG of wind" />
            <p>{weatherData.windSpeed} km/h</p>
          </div>
          <p className="m-2 text-blue-900">Wind Speed</p>
        </div>
      </section>
    </div>
  );
};

export default Weather;

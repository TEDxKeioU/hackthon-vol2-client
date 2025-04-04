import { useState, useEffect } from "react";

export default function WeatherInfo() {
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_KEY = "5357ea3fecf3393c86c63b1fbe28fac0"; // ここにAPIキーを設定

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          fetchWeather(latitude, longitude);
        },
        (error) => {
          console.error("位置情報の取得に失敗しました:", error);
          setLoading(false);
        }
      );
    } else {
      console.error("Geolocationはこのブラウザでサポートされていません");
      setLoading(false);
    }
  }, []);

  const fetchWeather = async (lat, lon) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=ja`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setWeather(data);
    } catch (error) {
      console.error("天気情報の取得に失敗しました:", error);
    }
    setLoading(false);
  };

  return (
    <div>
      <h2>現在の天気</h2>
      {loading ? (
        <p>情報を取得中...</p>
      ) : weather ? (
        <>
          <p>位置: {weather.name}（{weather.sys.country}）</p>
          <p>天気: {weather.weather[0].description}</p>
          <p>気温: {weather.main.temp}°C</p>
          <p>湿度: {weather.main.humidity}%</p>
          <p>風速: {weather.wind.speed} m/s</p>
          <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="天気アイコン" />
        </>
      ) : (
        <p>天気情報を取得できませんでした。</p>
      )}
    </div>
  );
};


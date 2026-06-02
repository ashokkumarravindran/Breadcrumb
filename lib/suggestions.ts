import { WeatherSummary } from './weather';

export function generateDayPlan(weather: WeatherSummary): string {
  const code = weather.weatherCode;
  const temp = weather.temperature;

  // Clear/sunny weather
  if ([0, 1].includes(code)) {
    if (temp > 20) {
      return '☀️ Perfect day for a walk or outdoor coffee';
    } else {
      return '☀️ Great day for a hike or picnic';
    }
  }

  // Partly cloudy
  if (code === 2) {
    return '⛅ Ideal day for exploring neighborhoods';
  }

  // Overcast
  if (code === 3) {
    return '☁️ Good day for museum visits or bookshops';
  }

  // Foggy
  if ([45, 48].includes(code)) {
    return '🌫️ Stay cozy indoors, perfect for reading';
  }

  // Light rain
  if ([51, 80].includes(code)) {
    return '🌧️ Quick errands or indoor activities nearby';
  }

  // Moderate to heavy rain
  if ([53, 55, 61, 63, 65, 81, 82].includes(code)) {
    return '🌧️ Stay indoors, great day for indoor hobbies';
  }

  // Snow
  if ([66, 67, 71, 73, 75].includes(code)) {
    return '❄️ Winter fun or cozy indoor time';
  }

  // Thunderstorm
  if ([95, 96, 99].includes(code)) {
    return '⛈️ Stay inside, perfect for indoor projects';
  }

  return '🌤️ Great day to capture memories';
}

export function getLocationName(lat: number, lon: number): string {
  // Simple format based on coordinates
  // You could integrate reverse geocoding here later
  return `${lat.toFixed(2)}°, ${lon.toFixed(2)}°`;
}

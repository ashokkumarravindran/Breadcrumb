export type WeatherSummary = {
  temperature: number;
  windSpeed: number;
  weatherCode: number;
  description: string;
};

const weatherLabels: Record<number, string> = {
  0: 'Clear skies today',
  1: 'Mainly clear',
  2: 'Partly cloudy',
  3: 'Overcast',
  45: 'Foggy',
  48: 'Fog with drizzle',
  51: 'Light rain',
  53: 'Moderate rain',
  55: 'Heavy rain',
  56: 'Sleet',
  57: 'Freezing rain',
  61: 'Rain showers',
  63: 'Heavy rain showers',
  65: 'Storm showers',
  66: 'Light snow',
  67: 'Heavy snow',
  71: 'Snow',
  73: 'Heavy snow',
  75: 'Storm snow',
  80: 'Rain on the way',
  81: 'Rain expected',
  82: 'Heavy showers',
  95: 'Stormy',
  96: 'Thunderstorm',
  99: 'Hail and storm',
};

export async function fetchWeather(lat: number, lon: number) {
  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&timezone=auto`
  );

  if (!response.ok) {
    throw new Error('Unable to load weather');
  }

  const data = await response.json();
  const weather = data.current_weather;
  const description = weatherLabels[weather.weathercode] ?? 'Mild weather';

  return {
    temperature: weather.temperature,
    windSpeed: weather.windspeed,
    weatherCode: weather.weathercode,
    description,
  } as WeatherSummary;
}

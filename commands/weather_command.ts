import axios from "axios";
import chalk from "chalk";

class WeatherCommand {
  private geoUrl = "https://geocoding-api.open-meteo.com/v1/search";
  private weatherUrl = "https://api.open-meteo.com/v1/forecast";

  register(program: any): void {
    program
      .command("weather <city>")
      .description("Get current weather for a city (no API key needed)")
      .option("-u, --units <unit>", "Temperature units: celsius or fahrenheit", "celsius")
      .action(async (city: string, options: any) => {
        await this.getWeather(city, options.units);
      });
  }

  async getWeather(city: string, units: string): Promise<void> {
    try {
      console.log(chalk.cyan(`\n  🌍 Looking up weather for: ${chalk.bold(city)}\n`));

      const geoRes = await axios.get(this.geoUrl, {
        params: { name: city, count: 1, language: "en", format: "json" },
      });

      if (!geoRes.data.results || geoRes.data.results.length === 0) {
        console.log(chalk.red(`  ❌ City "${city}" not found.\n`));
        return;
      }

      const { latitude, longitude, name, country } = geoRes.data.results[0];
      const tempUnit = units === "fahrenheit" ? "fahrenheit" : "celsius";

      const weatherRes = await axios.get(this.weatherUrl, {
        params: {
          latitude,
          longitude,
          current: "temperature_2m,weathercode,windspeed_10m,relative_humidity_2m",
          temperature_unit: tempUnit,
          wind_speed_unit: "kmh",
        },
      });

      const current = weatherRes.data.current;
      const symbol = tempUnit === "celsius" ? "°C" : "°F";
      const desc = this.weatherCode(current.weathercode);

      console.log(`  📍 ${chalk.bold(name)}, ${country}`);
      console.log(`  🌡️  Temperature:  ${chalk.yellowBright(current.temperature_2m + symbol)}`);
      console.log(`  🌤️  Condition:    ${chalk.white(desc)}`);
      console.log(`  💨 Wind Speed:  ${chalk.white(current.windspeed_10m + " km/h")}`);
      console.log(`  💧 Humidity:    ${chalk.white(current.relative_humidity_2m + "%")}\n`);
    } catch (err: any) {
      console.log(chalk.red(`\n  ❌ Error fetching weather: ${err.message}\n`));
    }
  }

  weatherCode(code: number): string {
    const map: Record<number, string> = {
      0: "Clear sky ☀️",
      1: "Mainly clear 🌤️",
      2: "Partly cloudy ⛅",
      3: "Overcast ☁️",
      45: "Foggy 🌫️",
      48: "Icy fog 🌫️❄️",
      51: "Light drizzle 🌦️",
      61: "Slight rain 🌧️",
      63: "Moderate rain 🌧️",
      65: "Heavy rain 🌧️",
      71: "Slight snow 🌨️",
      80: "Rain showers 🌦️",
      95: "Thunderstorm ⛈️",
    };
    return map[code] ?? `Code ${code}`;
  }
}

export default WeatherCommand;
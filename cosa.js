
export default {
  name: 'App',
  data() {
    return {
      city: 'málaga'
    }
  },
  watch: {
    city(newCity){
        this.getWeather(newCity)
    }
  },
  methods: {
    async getGeo(city) {
      const apiKey = "b337a16dddf99c10439a0c405916639c"
      const urlGeocode = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`
      console.info(urlGeocode)
      try {
        const response = await fetch(urlGeocode)
        const geoData = await response.json()
        return { lat: geoData[0].lat, lon: geoData[0].lon }
      } catch (error) {
        console.log("Se ha producido un error al buscar la ciudad")
      }
    },
    async getWeather(city) {
      const apiKey = "b337a16dddf99c10439a0c405916639c"
      const { lat, lon } = await this.getGeo(city)
      try {
        //https://api.openweathermap.org/data/2.5/weather?lat=36.7213028&lon=-4.4216366&appid=b337a16dddf99c10439a0c405916639c&units=metric&lang=es
        const urlWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=es`
        console.info(urlWeather)
        const weatherResponse = await fetch(urlWeather)
        const data = await weatherResponse.json()
        const heading = document.querySelector(".heading")
        const location = document.querySelector(".location")
        const temp = document.querySelector(".temp-value")
        const humidity = document.querySelector(".humidity")
        const wind = document.querySelector(".wind-speed")
        location.innerHTML = data.name
        temp.innerHTML = Math.round(data.main.temp)
        humidity.innerHTML = data.main.humidity
        wind.innerHTML = Math.round(data.wind.speed)
        heading.innerHTML = data.weather[0].description
      } catch (error) {
        console.warn("tenemos una segunda oportunidad")
        alert("No se ha podido obtener el tiempo. Inténtalo más tarde.")
        const location = document.querySelector(".location")
        location.innerHTML = ""
      }
    }
  }
}

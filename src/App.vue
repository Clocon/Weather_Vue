<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <div class="weather-card one">
          <div>
            <CitySelector v-model="city" :options="[
            {id:'malaga', label:'Málaga'},
            {id:'cadiz',  label:'Cádiz'},
            {id: 'cordoba',label:'Córdoba'},
            {id: 'almeria',label:'Almería'},
            {id: 'sevilla',label:'Sevilla'},
            {id: 'jaen',label:'Jaén'},
            {id: 'granada',label:'Granada'},
            {id: 'huelva',label:'Huelva'}
            ]" />

          </div>
          <div>
            <CitySelector v-model="language" :options="[
            {id:'en', label:'English'},
            {id:'es', label:'Español'},
            {id: 'de',label:'Deutsch'},
            {id: 'fr', label:'Français'},
            {id: 'pt',label:'Português'},
            {id: 'zh_tw',label:'中国人'},
            {id: 'ar',label:'عرب'},
            {id: 'uk',label:'українська'}
            ]" />
          </div>
          <div class="top">
            <div class="wrapper">
              <!-- Prueba de componente -->
              <heading :text="weather.heading" />
              <h3 class="location">{{weather.location}}</h3>
              <p class="temp">
                <span class="temp-value">{{weather.temp}}</span>
                <span class="deg">0</span>
                <a><span class="temp-type">C</span></a>
              </p>
            </div>
          </div>
          <div class="bottom">
            <div class="wrapper">
              <ul class="forecast mt-4">
                <li>
                  <span class="date">
                    <i class="fas fa-tint"></i> Humidity
                  </span>
                  <span class="lnr condition">
                    <span class="temp"><span class="humidity">{{weather.humidity}}</span><span class="temp-type">
                        %</span></span>
                  </span>
                </li>
                <li>
                  <span class="date">
                    <i class="fas fa-wind"></i> Wind
                  </span>
                  <span class="lnr condition">
                    <span class="temp"><span class="wind-speed">{{weather.windSpeed}}</span><span class="temp-type">
                        m/s</span></span>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Heading from '@/components/Heading.vue'
import CitySelector from '@/components/CitySelector.vue'
export default {
  name: 'App',
  components: {
    Heading,
    CitySelector
  },
  data() {
    return {
      key: "6d5be153d1845439a14a46ff7b6fd28a",
      city: 'malaga',
      language: 'en',
      weather: {
        heading: '',
        location: '',
        temp: '',
        humidity: '',
        windSpeed: ''
      }
    }
  },
  watch: {
    city() {
      localStorage.setItem("selected_city", this.city)
      this.whatIsMyWeather()
    },
    language() {
      localStorage.setItem("selected_language", this.language)
      this.whatIsMyWeather()
    }
  },
  methods: {
    async getGeo(city) {
      const urlGeocode = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${this.key}`
      try {
        const requestGeo = await fetch(urlGeocode)
        const geoData = await requestGeo.json()
        return { lat: geoData[0].lat, lon: geoData[0].lon }
      } catch (error) {
        console.error("Se ha producido un error al buscar la ciudad", error)
      }
    },
    async whatIsMyWeather() {
      const { lat, lon } = await this.getGeo(this.city)
      try {
        const request = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.key}&units=metric&lang=${this.language}`)
        const data = await request.json()
        this.weather.heading = data.weather[0].description
        this.weather.location = data.name
        this.weather.temp = Math.round(data.main.feels_like)
        this.weather.humidity = data.main.humidity
        this.weather.windSpeed = data.wind.speed
      } catch (error) {
        console.error("Error al intentar pasar los valores de la web, revise los datos introducidos.", error)
      }
    },
    cityChanged(selectedCity) {
      this.city = selectedCity
    }
  },
  mounted() {
    const selectedCity = localStorage.getItem("selected_city")
    const selectedLanguage = localStorage.getItem("selected_language")

    if (selectedCity) {
      this.city = localStorage.getItem("selected_city")
    }
    if (selectedLanguage) {
      this.language = localStorage.getItem("selected_language")
    }
    this.whatIsMyWeather(this.city)
  }
}
</script>
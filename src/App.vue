<template>
  <div class="container">
    <div class="row">
      <div class="col"> 
          <div class="weather-card one">
              <div>
                <CitySelector v-model="city" :value="city" @input="cityChanged">

                </CitySelector>
              </div>
              <div>
                <select name="" class="border-none" id="language">
                  <option value="es">Español</option>
                  <option value="en">English</option>
                  <option value="de">Deutsch</option>
                  <option value="fr">Français</option>
                  <option value="pt">Português</option>
                  <option value="zh_tw">中国人</option>
                  <option value="ar">عرب</option>
                  <option value="uk">українська</option>
                </select>
              </div>
              <div class="top">
                <div class="wrapper">
                  <!-- Prueba de componente -->
                  <heading :text="weather.heading" @clicked="titleClicked" />
                  <h3 class="location">{{weather.location}}</h3>
                  <p class="temp">
                      <span class="temp-value">{{weather.temp}}</span>
                      <span class="deg">0</span>
                      <a href="javascript:;"><span class="temp-type">C</span></a>
                  </p>
                </div>
              </div>
              <div class="bottom">
                <div class="wrapper">
                  <ul class="forecast mt-4">
                    <li>
                      <span class="date">
                        <i class="fas fa-tint"></i> Humedad
                      </span>
                      <span class="lnr condition">
                        <span class="temp"><span class="humidity">{{weather.humidity}}</span><span class="temp-type"> %</span></span>
                      </span>
                    </li>
                    <li>
                      <span class="date">
                        <i class="fas fa-wind"></i> Viento
                      </span>
                      <span class="lnr condition">
                        <span class="temp"><span class="wind-speed">{{weather.windSpeed}}</span><span class="temp-type"> m/s</span></span>
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
  import Heading  from '@/components/Heading.vue'
  import CitySelector  from '@/components/CitySelector.vue'
  export default{
    name: 'App',
    components: {    
      Heading,
      CitySelector
    },
    data(){
      return{
        key: "6d5be153d1845439a14a46ff7b6fd28a",
        city: 'Málaga',
        weather:{
          heading:'sdfsdf',
          location:'dsfsfs',
          temp:'dsffsf',
          humidity:'sdfsdf',
          windSpeed:'fdsff'  
        }
      }
    },
    watch:{
      city(newCity){
        this.whatIsMyWeather(newCity)
      }
    },
    methods: {
      async getGeo(city){
        const urlGeocode= `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${this.key}`

        try {
          const requestGeo = await fetch(urlGeocode)
          const geoData= await requestGeo.json()
          return {lat: geoData[0].lat, lon:geoData[0].lon}
        }catch(error){
          console.log("Se ha producido un error al buscar la ciudad")
        }
      },
      async whatIsMyWeather(city){
        const lengua ="es"
        const {lat, lon}= await this.getGeo(city)
        try{ 
          const request = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.key}&units=metric&lang=${lengua}`)
          const data = await request.json()
          this.weather.heading=data.weather[0].description
          this.weather.location=data.name
          this.weather.temp=Math.round(data.main.feels_like)
          this.weather.humidity=data.main.humidity
          this.weather.windSpeed  =data.wind.speed
        }catch(error){
          console.log ("error man")
        } 
      },
      titleClicked(){
        this.whatIsMyWeather(this.city)
      },
      CityChanged(selectedCity){
        console.log(selectedCity)
        this.city=selectedCity
      }
    },
    mounted(){
      this.whatIsMyWeather(this.city)
/*       setInterval(()=>{
        this.whatIsMyWeather(this.city, 5000)
      }) */
    }
  }
</script>
<template>
  <div class="container">
    <div class="row">
      <div class="col"> 
          <div class="weather-card one">
              <div>
                <select class="border-none" id="ciudades" v-model="city" >
                  <option>Seleccione Ciudad</option>
                  <option value="Málaga">Málaga</option>
                  <option value="Huelva">Huelva</option>
                  <option value="Cádiz">Cádiz</option>
                  <option value="Córdoba">Córdoba</option>
                  <option value="Almería">Almería</option>
                  <option value="Sevilla">Sevilla</option>
                  <option value="Jaen">Jaen</option>
                  <option value="Granada">Granada</option>
                </select>
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
                  <h1 class="heading">XXX</h1>
                  <h3 class="location">XXX</h3>
                  <p class="temp">
                      <span class="temp-value">XX</span>
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
                        <span class="temp"><span class="humidity">XX</span><span class="temp-type"> %</span></span>
                      </span>
                    </li>
                    <li>
                      <span class="date">
                        <i class="fas fa-wind"></i> Viento
                      </span>
                      <span class="lnr condition">
                        <span class="temp"><span class="wind-speed">XX</span><span class="temp-type"> m/s</span></span>
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
  export default{
    name: 'App',
    data(){
      return{
        city: 'Málaga'
      }
    },
    watch:{
      city(newCity){
        this.whatIsMyWeather(newCity)
      }
    },
    method: {
      async getGeo(city){
        const key = "6d5be153d1845439a14a46ff7b6fd28a"
        const urlGeocode= `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${key}`

        try {
          const requestGeo = await fetch(urlGeocode)
          const geoData= await requestGeo.json()
          return {lat: geoData[0].lat, lon:geoData[0].lon}
        }catch(error){
          console.log("Se ha producido un error al buscar la ciudad")
        }
      },
      
      async whatIsMyWeather(city){
        const key = "6d5be153d1845439a14a46ff7b6fd28a"
        const lengua ="es"
        const {lat, lon}= await this.getGeo(city)
        try{ 
          const request = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric&lang=${lengua}`)
          const data = await request.json()
        
          document.querySelector(".heading").innerHTML=data.weather[0].description
          document.querySelector(".location").innerHTML=data.name
          document.querySelector(".temp-value").innerHTML=Math.round(data.main.feels_like)
          document.querySelector(".humidity").innerHTML=data.main.humidity
          document.querySelector(".wind-speed").innerHTML=data.wind.speed
        }catch(error){
          console.log ("error man")
        }
      }
    }
  }
</script>

<style scoped></style>
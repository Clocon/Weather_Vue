  const lengua ="es";
  const key = "6d5be153d1845439a14a46ff7b6fd28a"

  async function getGeo(city){
    const urlGeocode= `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${key}`

    try {
      const requestGeo = await fetch(urlGeocode)
      const geoData= await requestGeo.json()
      return {lat: geoData[0].lat, lon:geoData[0].lon}
    }catch(error){
      console.log("Se ha producido un error al buscar la ciudad")
    }
  }
  
  async function whatIsMyWeather(city){
    const {lat, lon}= await getGeo(city)
/*     let lat,lon
    getGeo(city)
    .then((result)=>{
      lat = result.lat
      lon = result.lon
    }) */
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

  const selector = document.querySelector("#ciudades")
   selector.addEventListener("change",function(e){
   const city=e.target.value
      whatIsMyWeather(city)
  })

  whatIsMyWeather("Málaga")
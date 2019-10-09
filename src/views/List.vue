<template>
  <div class="wrapper">
    <Loading v-if="!isLoad" />
    <div class="container">
      <input type="text" v-model.lazy="cityName" v-debounce="delay" placeholder="Şehrin Adını Yazın" />
      
      <div v-if="result" class="weather-info">
        <div class="temp">{{ cityWeather.main.temp.toFixed() }} °C</div>
        <div class="max-temp">En Yüksek: {{ cityWeather.main.temp_max.toFixed() }} °C</div>
        <div class="min-temp">En Düşük: {{ cityWeather.main.temp_min.toFixed() }} °C</div>
        <div class="humidity">Nem: % {{ cityWeather.main.humidity }}</div>
        <div class="humidity">Rüzgar: {{ cityWeather.wind.speed }} m/s</div>
        <div class="map-button">
          <button @click="showMap">Haritada Göster</button>
        </div>
      </div>

      <City :weathers="weathers" />
    </div>
  </div>
</template>

<script>
import City from '@/components/City'
import Loading from '@/components/Loading'
import axios from 'axios'
import debounce from 'v-debounce'

export default {
  name: 'List',
  data () {
    return {
      cities: [
        { name: 'İstanbul', id: '745044' },
        { name: 'London', id: '2643743' },
        { name: 'Paris', id: '2968815' },
        { name: 'Berlin', id: '2950159' },
        { name: 'Madrid', id: '6359304' }
      ],
      url: 'http://api.openweathermap.org/data/2.5/weather',
      apiKey: '1de6a3f387dc018df3912ee07fda4c41',
      unit: 'metric',
      weathers: [],
      cityWeather: {},
      cityMap: {},
      isLoad: false,
      result: false,
      cityName: '',
      delay: 2000,
    }
  },
  components: {
    City,
    Loading
  },
  created () {
    const logPosts = async () => {
      try {
        let data = this.cities.map(city => axios(`${this.url}?id=${city.id}&units=${this.unit}&APPID=${this.apiKey}`));
        let weather = await Promise.all(data);
        weather.forEach(weath => {
          this.weathers.push({
            name: weath.data.name,
            temp: weath.data.main.temp,
            wind: weath.data.wind.speed,
            id: weath.data.id,
            icon: weath.data.weather[0].icon
          });
          this.isLoad = true;
        });
      }
      catch (error) {
        return error;
      }
    };
    logPosts();
  },
  methods: {
    getCityWeather () {
        if (this.cityName.length > 2) {
          axios.get(`${this.url}?q=${this.cityName}&units=${this.unit}&APPID=${this.apiKey}`)
          .then(response => {
            this.cityWeather = response.data
            this.result = true
          })
          .catch(e => {
            return e
          })
        } else {
          this.result = false
        }
    },
    showMap () {
      axios.get(`http://maps.openweathermap.org/maps/2.0/weather/TA2/10/${this.cityWeather.coord.lat}/${this.cityWeather.coord.lon}?APPID=${this.apiKey}`)
      .then(response => {
        this.cityMap = response.data
      })
      .catch(e => {
        return e
      })
    }
  },
  directives: {
    debounce
  },
  watch: {
    cityName () {
      this.getCityWeather()
    }
  }
}
</script>

<style>
  .weather-info {
      margin-bottom: 20px;
  }

  .weather-info > div.temp {
      font-size: 60px;
      font-weight: 700;
      margin-bottom: 10px;
      color: #2c3e50;
      line-height: 80px;
  }

  .weather-info > div {
      color: #7d7d7d;
      font-size: 14px;
      line-height: 23px;
  }
</style>
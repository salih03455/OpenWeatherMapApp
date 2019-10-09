<template>
  <div class="wrapper">
    <Loading v-if="!isLoad" />
    <div class="container">
      <div class="container-top">
        <router-link to="/" class="return-back">Şehir Listesine Dön</router-link>
        <h2>{{ cityName }}</h2>
      </div>
      <div class="hours-weather-wrapper">
        <div class="weather-detail" v-for="(date, index) in weatherDate" :key="date.id">
          <div class="date">
            <b>{{ date }}</b>
          </div>
          <div class="hours">
            <div v-for="wh in weatherHour[index]" :key="wh.id">
              <span>{{ wh.hour }}</span>
              <span>{{ wh.temp }} °C</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Loading from '@/components/Loading'

export default {
  components: {
    Loading
  },
  data () {
    return {
      url: 'http://api.openweathermap.org/data/2.5/forecast',
      apiKey: '1de6a3f387dc018df3912ee07fda4c41',
      cityId: this.$route.params.id,
      cityName: '',
      errorMessage: '',
      weatherDate: [],
      weatherHour: [],
      isLoad: false
    }
  },
  created () {
    axios.get(`${this.url}?id=${this.cityId}&units=metric&APPID=${this.apiKey}`)
    .then((response) => {
      this.cityName = response.data.city.name;
      response.data.list.forEach((list) => {
        let date = list.dt_txt.split(' ')[0].split('-').join('.');
        let hour = list.dt_txt.split(' ')[1].split('').splice(0,5).join('');
        let temp = list.main.temp.toFixed();
        if (!this.weatherDate.includes(date)) {
          this.weatherDate.push(date);
          this.weatherHour.push([{ hour, temp }]);
        } else {
          this.weatherHour[this.weatherHour.length -1].push({ hour, temp });
        }
      });
    })
    .catch((error) => {
      this.errorMessage = error;
    })
    .then(() => {
      this.isLoad = true;
    });
  }
}
</script>

<style lang="less">
@import  '../assets/less/variables.less';

.container-top {
  margin-bottom: 20px;
  .return-back {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    text-align: center;
    background-color: @green;
    color: #fff;
    padding: 4px;
  }
}

.hours-weather-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  .weather-detail {
    width: 33.3333%;
    text-align: left;
    margin-bottom: 20px;
    background: #f1f1f1;
    padding-bottom: 5px;
    border-bottom: 1px solid #ccc;
    &:nth-child(odd) {
      background-color: #e4e4e4;
    }
    @media @mobile {
      width: 50%;
    }
    .date {
      background-color: #d2d2d2;
      padding: 8px 20px;
      margin-bottom: 6px;
      text-align: center;
    }
    .hours {
      div {
        padding: 10px 20px;
        display: flex;
        justify-content: space-between;
      }
    }
  }
}
</style>

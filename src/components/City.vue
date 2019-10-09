<template>
<div class="weather-wrapper">
  <div class="weather-title flex">
    <div class="col1">ŞEHİR</div>
    <div class="col2">SICAKLIK</div>
    <div class="col3">RÜZGAR</div>
  </div>
  <div class="weather-list">
    <router-link :to="weather.id.toString()" class="weather flex" v-for="weather in weathers" :key="weather.id">
      <div class="col1 name">{{ weather.name }}</div>
      <div class="col2 temp">
        <div><img :src="iconUrl(weather.icon)" ></div>
        <div>{{ weather.temp.toFixed() }} <span>°C</span></div>
      </div>
      <div class="col3 wind">{{ weather.wind }} m/sn</div>
    </router-link>
  </div>
</div>
</template>

<script>
export default {
  name: 'City',
  methods: {
    iconUrl (icon) {
      return `http://openweathermap.org/img/w/${icon}.png`;
    }
  },
  props: {
    weathers: Array
  }
}
</script>

<style lang="less">
@import  '../assets/less/variables.less';

.weather-title {
  margin-bottom: 25px;
  padding: 14px 16px;
  font-weight: 700;
  color: #5f5f5f;
  background: #f6f6f6;
  box-shadow: 1px 1px 2px #ccc;
  @media @mobile {
    padding: 12px 10px;
  }
}

.flex {
  display: flex;
  align-items: center;
  .col1 {
    text-align: left;
    flex: 1;
  }
  .col2 {
    flex: 2;
    &.temp {
      letter-spacing: -2px;
      color: #9f9f9f;
      span {
        font-size: 17px;
        letter-spacing: 0;
      }
      div {
        display: inline-block;
        vertical-align: middle;
        font-weight: 700;
        &:first-child {
          width: 50px;
          @media @mobile {
            width: 40px;
          }
        }
        &:last-child {
          width: 100px;
          font-size: 40px;
          @media @mobile {
            width: 75px;
            font-size: 30px;
          }
        }
        img {
          max-width: 100%;
        }
      }
    }
  }
  .col3 {
    text-align: right;
    flex: 1;
  }
}

.weather {
  padding: 5px 10px;
  border-bottom: 1px solid #ddd;
  &:last-child {
    border: none;
  }
  &:hover * {
    color: @green;
  }
}
</style>

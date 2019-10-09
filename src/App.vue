<template>
  <div id="app">
    <Header />
    <router-view/>
  </div>
</template>

<script>
import Header from '@/components/Header'

export default {
  components: {
    Header
  }
}
</script>

<style lang="less">
@import  './assets/less/variables.less';

* {
  padding: 0;
  margin: 0;
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
  color: #0091ff;
}

h2 {
  font-size: 40px;
}

a {
  color: #555;
  text-decoration: none;
  outline: none;
}

img {
  display: block;
}

input {
  padding: 15px;
  border-radius: 3px;
  outline: none;
  box-shadow: none;
  border: 1px solid #ddd;
  width: 350px;
  margin-bottom: 20px;
}

button {
  padding: 8px 24px;
  border: none;
  outline: none;
  border-radius: 20px;
  background: green;
  color: #fff;
  font-weight: 400;
  margin-top: 15px;
  cursor: pointer;
}

body {
  font-size: 18px;
  @media @mobile {
    font-size: 16px;
  }
}

#app {
  font-family: 'Lato', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 40px;
}

.container {
  width: 768px;
  margin: auto;
  max-width: 100%;
}
</style>

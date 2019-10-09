<template>
  <div class="loading-wrapper">
    <i class="loading" />
  </div>
</template>

<style lang="less">
.loading-wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: #fff;
  .loading {
    border: 5px solid #f3f3f3;
    border-top: 5px solid #292b2c;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
  }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
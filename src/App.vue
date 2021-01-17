<template>
  <div id="app">    
    <div class="b-header d-flex align-items-center justify-content-center">     
      <router-link to='/'>
        <h1 class="b-header-title m-0">Pokedex</h1>
      </router-link>
    </div>

    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #323232;
}

.b-header {
  position: fixed;
  top: 0;
  width: 100%;
  height: 62px;
  background-color: #f5f5f5;
  box-shadow: 1px 1px 5px 0px rgba(43, 36, 36, 0.75);
  -webkit-box-shadow: 1px 1px 5px 0px rgba(43, 36, 36, 0.75);
  -moz-box-shadow: 1px 1px 5px 0px rgba(43, 36, 36, 0.75);
  z-index: 10;

  a {
    color: #323232;

    &:hover {
      text-decoration: none;
      color: #323232;
    }
  }
}
</style>

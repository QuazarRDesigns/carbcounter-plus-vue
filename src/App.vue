<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home&nbsp;</router-link>|
      <router-link to="/carbcalc">CarbCalc&nbsp;</router-link>|
      <router-link to="/dosecalc">DoseCalc&nbsp;</router-link>|
      <router-link to="/settings">Settings&nbsp;</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
@import "@/scss/variables.scss";

body {
  background: $yellow;
  margin: 0;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-flow: column nowrap;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  background-color: #fff;
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.bg-blue {
  background-color: $blue;

  &:hover,
  &:focus {
    background-color: lighten($color: $blue, $amount: 10);
  }
}

.bg-green {
  background-color: $green;

  &:hover,
  &:focus {
    background-color: lighten($color: $green, $amount: 10);
  }
}

.bg-pink {
  background-color: $pink;

  &:hover,
  &:focus {
    background-color: lighten($color: $pink, $amount: 10);
  }
}
</style>

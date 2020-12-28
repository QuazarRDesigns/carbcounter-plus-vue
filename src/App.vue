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

* {
  box-sizing: border-box;
}

body {
  background: $yellow;
  margin: 0;
}

button {
  background-color: #fff;
  border: none;
  font-size: 1.2rem;
  height: 3rem;
  padding: 0 1rem;

  &.bg-blue,
  &.bg-green,
  &.bg-pink {
    color: #fff;
  }

  &:hover,
  &:focus {
    background-color: #ddd;
  }
}

label {
  display: block;
  font-size: 1.2rem;
  font-weight: bold;
  text-align: left;
  margin: 0;
}

select,
input {
  background: #ddd;
  border: none;
  font-size: 1rem;
  height: 1.3rem;
  margin-top: 0.5rem;
  outline: none;
  width: 100%;
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

.view-container {
  width: $container-width;
  min-width: 320px;
  margin: 0 auto;
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

.text-blue {
  color: $blue;
}

.text-green {
  color: $green;
}

.text-pink {
  color: $pink;
}
</style>

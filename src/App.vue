<template>
  <div id="app">
    <Header />
    <router-view />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
export default {
  components: {
    Header
  }
};
</script>

<style lang="scss">
@import "@/scss/variables.scss";

:root {
  font-size: #{"clamp(1rem, 1.6vw, 1.5rem)"};
}

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

label,
legend {
  display: block;
  font-size: 1.2rem;
  font-weight: bold;
  text-align: left;
  margin: 0;
}

fieldset {
  padding: 0;
  border: none;
  margin: 0;
}

select,
input {
  background: #ddd;
  border: none;
  font-size: 1.125rem;
  height: 1.5rem;
  margin-top: 0.5rem;
  outline: none;
  width: 100%;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-flow: column nowrap;
  font-family: "Montserrat", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.view-container {
  width: $container-width;
  min-width: 320px;
  margin: 0 auto;
  padding: 0 1rem 1rem;
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

<template>
  <div id="app">
    <AppHeader />
    <router-view />
  </div>
</template>

<script setup>
import AppHeader from "@/components/AppHeader.vue";
</script>

<style lang="scss">
@use "sass:color";
@use "@/scss/variables.scss" as vars;

:root {
  font-size: #{"clamp(1rem, 1.6vw, 1.5rem)"};
}

* {
  box-sizing: border-box;
}

body {
  background: vars.$yellow;
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
  width: vars.$container-width;
  min-width: 320px;
  margin: 0 auto;
  padding: 0 1rem 1rem;
}

.bg-blue {
  background-color: vars.$blue;

  &:hover,
  &:focus {
    background-color: color.adjust(vars.$blue, $lightness: 10%);
  }
}

.bg-green {
  background-color: vars.$green;

  &:hover,
  &:focus {
    background-color: color.adjust(vars.$green, $lightness: 10%);
  }
}

.bg-pink {
  background-color: vars.$pink;

  &:hover,
  &:focus {
    background-color: color.adjust(vars.$pink, $lightness: 10%);
  }
}

.text-blue {
  color: vars.$blue;
}

.text-green {
  color: vars.$green;
}

.text-pink {
  color: vars.$pink;
}
</style>

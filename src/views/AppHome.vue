<template>
  <div class="view-container home">
    <div class="menu">
      <MenuButton title="CarbCalc" color="blue" :svg="carbCalcIcon" />
      <MenuButton title="DoseCalc" color="green" :svg="doseCalcIcon" />
      <MenuButton title="Settings" color="pink" :svg="settingsIcon" />
      <span class="version">Carb Counter+: v0.5.0</span>
    </div>
  </div>
</template>

<script setup>
import MenuButton from "@/components/MenuButton.vue";
import carbCalcIcon from "@/assets/svgs/carbcalc.svg";
import doseCalcIcon from "@/assets/svgs/dosecalc.svg";
import settingsIcon from "@/assets/svgs/settings.svg";
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  flex-flow: column nowrap;
  flex: 1 1 auto;
  height: 100%;
  padding: 1rem;
}

.menu {
  display: flex;
  flex-flow: row wrap;
  width: 100%;
  padding: 0.625rem;
  margin: auto;
  background-color: #fff;
}

.version {
  align-self: flex-end;
  flex: none;
  width: 100%;
  font-size: 0.875rem;
}

@media screen and (min-width: 600px) {
  .menu {
    flex: none;
  }
}
</style>

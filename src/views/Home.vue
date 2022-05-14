<template>
  <div class="view-container home">
    <div class="menu">
      <MenuButton
        title="CarbCalc"
        color="blue"
        :svg="require('@/assets/svgs/carbcalc.svg')"
      />
      <MenuButton
        title="DoseCalc"
        color="green"
        :svg="require('@/assets/svgs/dosecalc.svg')"
      />
      <MenuButton
        title="Settings"
        color="pink"
        :svg="require('@/assets/svgs/settings.svg')"
      />
      <span class="version">Carb Counter+: v0.5.0</span>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import MenuButton from "@/components/MenuButton.vue";

export default {
  name: "home",
  components: {
    MenuButton
  }
};
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

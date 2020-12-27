<template>
  <div class="view-container home">
    <div class="menu">
      <MenuButton title="CarbCalc" color="blue" />
      <MenuButton title="DoseCalc" color="green" />
      <MenuButton title="Settings" color="pink" />
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
  flex: 1 1 auto;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
}

.menu {
  display: flex;
  flex-flow: column nowrap;
  flex: 1;
  background-color: #fff;
  margin: 1.25rem;
  padding: 0.625rem;
}
</style>

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

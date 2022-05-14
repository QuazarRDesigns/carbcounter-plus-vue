<template>
  <router-link
    class="menu-button"
    :class="colorClass"
    :to="title.toLowerCase()"
  >
    <img :src="svg" />
    {{ title }}
  </router-link>
</template>

<script>
export default {
  name: "MenuButton",
  props: {
    title: {
      type: String,
      default: "Menu Item",
    },
    color: {
      default: "blue",
      validator: function (value) {
        // The value must match one of these strings
        return ["blue", "green", "pink"].indexOf(value) !== -1;
      },
    },
    svg: {
      type: String,
      default: "",
    },
  },
  computed: {
    colorClass: function () {
      return "bg-" + this.color;
    },
  },
};
</script>

<style lang="scss" scoped>
.menu-button {
  display: flex;
  flex-flow: column nowrap;
  flex: 1 0 auto;
  padding: 1.25rem;
  justify-content: center;
  align-items: center;
  margin: 0.625rem;
  color: #fff;
  text-decoration: none;
  font-size: 1.5rem;
  gap: 0.5em;

  &:hover,
  &:focus {
    outline: 1px solid black;
  }

  img {
    width: 5em;
  }
}
</style>

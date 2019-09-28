<template>
  <router-link class="menu-button" :class="colorClass" :to="title.toLowerCase()">
    {{
    title
    }}
  </router-link>
</template>

<script>
export default {
  name: "MenuButton",
  props: {
    title: String,
    color: {
      validator: function(value) {
        // The value must match one of these strings
        return ["blue", "green", "pink"].indexOf(value) !== -1;
      }
    }
  },
  computed: {
    colorClass: function() {
      return "bg-" + this.color;
    }
  }
};
</script>

<style lang="scss" scoped>
.menu-button {
  display: flex;
  flex: 1 0 auto;
  padding: 10px;
  justify-content: center;
  align-items: center;
  margin: 0.625rem;
  color: #fff;
  text-decoration: none;
  font-weight: bold;

  &:hover,
  &:focus {
    outline: 1px solid black;
  }
}
</style>

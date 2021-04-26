<template>
  <div class="container">
    <label :class="this.color ? 'text-' + this.color : ''" for="this.id">{{
      this.title
    }}</label>
    <div class="input-wrapper">
      <select id="this.id" @change="change" :value="value">
        <option
          :key="option.name"
          :value="index"
          v-for="(option, index) in options"
          >{{ option.name }}</option
        >
      </select>
    </div>
  </div>
</template>

<script>
export default {
  name: "SelectInput",
  model: {
    prop: "value",
    event: "change"
  },
  props: {
    title: String,
    color: {
      validator: function(value) {
        return ["blue", "green", "pink"].indexOf(value) !== -1;
      }
    },
    id: String,
    options: Array
  },
  data: function() {
    return {
      value: this.$attrs.value
    };
  },
  methods: {
    change: function($event) {
      this.$emit("change", {
        id: this.id,
        value: $event.target.value
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/scss/variables.scss";

.container {
  background: #fff;
  padding: 0.5rem;
  margin: 1rem auto;
}

.input-wrapper {
  display: flex;
  align-items: center;
}

.unit {
  font-weight: bold;
  margin: 0.5rem 0 0 0.5rem;
}
</style>

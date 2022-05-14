<template>
  <div class="container">
    <label :class="'text-' + color" for="this.id">{{ title }}</label>
    <div class="input-wrapper">
      <input
        id="this.id"
        type="number"
        :step="step"
        :value="computedValue"
        @input="input"
      />
      <!-- eslint-disable-next-line vue/no-v-html -->
      <p class="unit" v-html="unit"></p>
    </div>
  </div>
</template>

<script>
export default {
  name: "NumberInput",
  props: {
    title: {
      type: String,
      default: "Label",
    },
    color: {
      default: "",
      validator: function (value) {
        return value === "" || ["blue", "green", "pink"].indexOf(value) !== -1;
      },
    },
    id: {
      type: String,
      default: "",
    },
    value: {
      type: Number,
      default: 0,
    },
    unit: {
      type: String,
      default: "",
    },
    step: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    computedValue: function () {
      return Number(this.value.toFixed(1));
    },
  },
  methods: {
    input: function ($event) {
      this.$emit("input", {
        id: this.id,
        value: $event.target.value,
      });
    },
    clamp: function (value, min, max) {
      return Math.min(Math.max(min, value), max);
    },
  },
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
  white-space: nowrap;
}
</style>

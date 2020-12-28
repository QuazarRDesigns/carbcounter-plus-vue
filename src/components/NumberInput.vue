<template>
  <div class="container">
    <label :class="'text-' + this.color" for="this.id">{{ this.title }}</label>
    <div class="input-wrapper">
      <input
        id="this.id"
        type="number"
        :step="step"
        @input="input"
        v-model="value"
      />
      <p class="unit">{{ this.unit }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "NumberInput",
  props: {
    title: String,
    color: {
      validator: function(value) {
        return ["blue", "green", "pink"].indexOf(value) !== -1;
      }
    },
    id: String,
    unit: String,
    step: Number,
    min: Number,
    max: Number
  },
  data: function() {
    return {
      value: 0
    };
  },
  methods: {
    input: function($event) {
      this.clamp(this.min, this.max);
      this.$emit("input", $event.target.value);
    },
    clamp: function(min, max) {
      this.$data.value = Math.min(Math.max(min, this.$data.value), max);
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

<template>
  <div class="wrapper">
    <p :class="'title ' + 'text-' + color">
      {{ title }}
      <span v-if="ratio">(Ratio {{ ratio }})</span>
      <span v-if="target">(Target {{ target }})</span>
    </p>
    <p class="result">
      <span :class="'stat ' + 'text-' + color">{{ returnValue }}</span>
      <span class="unit">{{ unit }}</span>
    </p>
    <small>{{ rounded }} (rounded)</small>
  </div>
</template>

<script setup>
import { defineProps, computed } from "vue";

const props = defineProps({
  title: {
    type: String,
    default: "Total",
  },
  color: {
    default: "blue",
    validator: function (value) {
      return ["blue", "green", "pink"].indexOf(value) !== -1;
    },
  },
  value: {
    type: Number,
    default: 0,
  },
  unit: {
    type: String,
    default: "IU",
  },
  ratio: {
    default: "",
    validator: function (value) {
      return value === "" || /\d:\d/.test(value);
    },
  },
  target: {
    type: Number,
    default: 0,
  },
});

const returnValue = computed(() => Math.max(0, props.value));
const rounded = computed(() => Math.round(props.value));
</script>

<style lang="scss" scoped>
.wrapper {
  text-align: left;
}

.title {
  margin-bottom: 0.25em;
}

.result {
  margin: 0;
}

.stat {
  font-size: 3em;
  font-weight: bold;
}

.unit {
  font-weight: bold;
}
</style>

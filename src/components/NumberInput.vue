<template>
  <div class="container">
    <label :class="'text-' + color" :for="id">{{ title }}</label>
    <div class="input-wrapper">
      <input
        :id="id"
        type="number"
        :max="max"
        :min="min"
        :step="step"
        :value="computedValue"
        @input="input"
      />
      <!-- eslint-disable-next-line vue/no-v-html -->
      <p class="unit" v-html="unit"></p>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
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
  min: {
    type: Number,
    default: 0,
  },
  max: {
    type: Number,
    default: 5000,
  },
});

const emit = defineEmits(["input"]);

const computedValue = computed(() => clamp(props.value));

function input($event) {
  emit("input", {
    id: props.id,
    value: clamp(Number($event.target.value)),
  });
}

function clamp(value) {
  const { min, max } = props;
  return Math.min(Math.max(min, value), max);
}
</script>

<style lang="scss" scoped>
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

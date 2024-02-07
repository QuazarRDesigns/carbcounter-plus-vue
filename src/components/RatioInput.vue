<template>
  <div class="container">
    <fieldset>
      <legend :class="'text-' + color">
        {{ title }}
      </legend>
      <div class="input-wrapper">
        <input
          id="leftInput"
          ref="leftInput"
          aria-label="Left Ratio"
          type="number"
          :step="step"
          :value="left"
          @input="input"
          @blur="blur"
        />
        <span class="colon">&#58;</span>
        <input
          id="rightInput"
          ref="rightInput"
          aria-label="Right Ratio"
          type="number"
          :step="step"
          :value="right"
          @input="input"
          @blur="blur"
        />
      </div>
    </fieldset>
  </div>
</template>

<script setup>
import CarbRatio from "../classes/CarbRatio";

import { defineProps, defineEmits, ref, computed } from "vue";

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
  step: {
    type: Number,
    default: 1,
  },
  value: CarbRatio,
});

const emit = defineEmits(["input", "blur"]);

const leftInput = ref(null);
const rightInput = ref(null);

const left = computed(() => props.value.insulin);

const right = computed(() => props.value.carbs);

function input() {
  const leftValue = leftInput.value.value,
    rightValue = rightInput.value.value;

  const ratio = new CarbRatio(leftValue, rightValue);

  emit("input", {
    id: props.id,
    value: ratio,
  });
}

function blur() {
  emit("blur");
}
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

.colon {
  font-weight: bold;
  margin: 0.5rem 0.5rem 0 0.5rem;
  white-space: nowrap;
}
</style>

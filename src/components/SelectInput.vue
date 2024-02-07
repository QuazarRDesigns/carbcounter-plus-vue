<template>
  <div class="container">
    <label :class="color ? 'text-' + color : ''" for="this.id">{{
      title
    }}</label>
    <div class="input-wrapper">
      <select id="this.id" :value="value" @change="change">
        <option
          v-for="(option, index) in options"
          :key="option.name"
          :value="index"
        >
          {{ option.name }}
        </option>
      </select>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  value: {
    type: [Number],
  },
  title: { type: String, default: "Label" },
  color: {
    default: "",
    validator: function (value) {
      return value === "" || ["blue", "green", "pink"].indexOf(value) !== -1;
    },
  },
  id: { type: String, default: "" },
  options: { type: Array, default: () => [] },
});

const emit = defineEmits(["change"]);

function change($event) {
  emit("change", {
    id: props.id,
    value: $event.target.value,
  });
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

.unit {
  font-weight: bold;
  margin: 0.5rem 0 0 0.5rem;
}
</style>

<template>
  <div>
    <button ref="button" class="bg-green" @click="click">{{ title }}</button>
    <p v-if="saved">Your settings have been saved!</p>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref } from "vue";

defineProps({
  title: {
    type: String,
    default: "Submit",
  },
  saved: Boolean,
});

const emit = defineEmits(["click"]);

const button = ref(null);

function click() {
  emit("click");
  button.value.blur();
}
</script>

<style></style>

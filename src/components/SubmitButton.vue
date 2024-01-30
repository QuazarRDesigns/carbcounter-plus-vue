<template>
  <div>
    <button ref="button" class="bg-green" @click="click">{{ title }}</button>
    <p v-if="saved">Your settings have been saved!</p>
  </div>
</template>

<script>
export default {
  name: "SubmitButton",
  props: {
    title: {
      type: String,
      default: "Submit",
    },
    saved: Boolean,
  },
  emits: ["click"],
  methods: {
    click: function () {
      this.$emit("click");
      this.$refs.button.blur();
    },
  },
};
</script>

<style></style>

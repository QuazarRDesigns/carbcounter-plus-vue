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

<script>
export default {
  name: "SelectInput",
  model: {
    prop: "value",
    event: "change",
  },
  props: {
    title: { type: String, default: "Label" },
    color: {
      default: "",
      validator: function (value) {
        return value === "" || ["blue", "green", "pink"].indexOf(value) !== -1;
      },
    },
    id: { type: String, default: "" },
    options: { type: Array, default: () => [] },
  },
  data: function () {
    return {
      value: this.$attrs.value,
    };
  },
  methods: {
    change: function ($event) {
      this.$emit("change", {
        id: this.id,
        value: $event.target.value,
      });
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
}
</style>

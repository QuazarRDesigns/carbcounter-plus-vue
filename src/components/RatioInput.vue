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

<script>
import CarbRatio from "../classes/CarbRatio";
export default {
  name: "RatioInput",
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
    step: {
      type: Number,
      default: 1,
    },
    value: CarbRatio,
  },
  emits: ["input", "blur"],
  computed: {
    left: function () {
      return this.value.insulin;
    },
    right: function () {
      return this.value.carbs;
    },
  },
  methods: {
    input: function () {
      const leftValue = this.$refs.leftInput.value,
        rightValue = this.$refs.rightInput.value;

      const ratio = new CarbRatio(leftValue, rightValue);

      this.$emit("input", {
        id: this.id,
        value: ratio,
      });
    },
    blur: function () {
      this.$emit("blur");
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

.colon {
  font-weight: bold;
  margin: 0.5rem 0.5rem 0 0.5rem;
  white-space: nowrap;
}
</style>

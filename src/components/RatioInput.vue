<template>
  <div class="container">
    <fieldset>
      <legend :class="'text-' + this.color">
        {{ this.title }}
      </legend>
      <div class="input-wrapper">
        <input
          ref="leftInput"
          id="leftInput"
          aria-label="Left Ratio"
          type="number"
          :step="step"
          @input="input"
          @blur="blur"
          :value="left"
        />
        <span class="colon">&#58;</span>
        <input
          ref="rightInput"
          id="rightInput"
          aria-label="Right Ratio"
          type="number"
          :step="step"
          @input="input"
          @blur="blur"
          :value="right"
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
    title: String,
    color: {
      validator: function(value) {
        return ["blue", "green", "pink"].indexOf(value) !== -1;
      }
    },
    id: String,
    step: Number,
    value: CarbRatio
  },
  computed: {
    left: function() {
      return this.value.insulin;
    },
    right: function() {
      return this.value.carbs;
    }
  },
  methods: {
    input: function() {
      const leftValue = this.$refs.leftInput.value,
        rightValue = this.$refs.rightInput.value;

      const ratio = new CarbRatio(leftValue, rightValue);

      this.$emit("input", {
        id: this.id,
        value: ratio
      });
    },
    blur: function() {
      this.$emit("blur");
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

.colon {
  font-weight: bold;
  margin: 0.5rem 0.5rem 0 0.5rem;
  white-space: nowrap;
}
</style>

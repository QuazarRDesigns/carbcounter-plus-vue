<template>
  <div class="wrapper">
    <p :class="'title ' + 'text-' + this.color">
      {{ this.title }}
      <span v-if="ratio">(Ratio {{ this.ratio }})</span>
      <span v-if="target">(Target {{ this.target }})</span>
    </p>
    <p class="result">
      <span :class="'stat ' + 'text-' + this.color">{{
        this.returnValue
      }}</span>
      <span class="unit">{{ this.unit }}</span>
    </p>
    <small>{{ this.rounded }} (rounded)</small>
  </div>
</template>

<script>
export default {
  name: "DosageResult",
  props: {
    title: String,
    color: {
      validator: function(value) {
        return ["blue", "green", "pink"].indexOf(value) !== -1;
      }
    },
    value: Number,
    unit: String,
    ratio: {
      validator: function(value) {
        return /\d:\d/.test(value);
      }
    },
    target: Number
  },
  computed: {
    returnValue: function() {
      return Math.max(0, this.value);
    },
    rounded: function() {
      return Math.round(this.value);
    }
  }
};
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

<template>
  <div class="container">
    <h2 class="text-pink">Insulin Dose</h2>
    <DosageResult
      title="Carb Coverage"
      color="green"
      :value="ratioResult"
      unit="IU"
      :ratio="carbRatio.view"
    />
    <DosageResult
      title="Correctional"
      color="blue"
      :value="correctionResult"
      unit="IU"
      :target="target"
    />
    <DosageResult title="Total" color="pink" :value="resultTotal" unit="IU" />
  </div>
</template>

<script setup>
import DosageResult from "../components/DosageResult.vue";
import CarbRatio from "../classes/CarbRatio.js";

defineProps({
  carbRatio: CarbRatio,
  target: {
    type: Number,
    default: 0,
  },
  correctionResult: { type: Number, default: 0 },
  ratioResult: {
    type: Number,
    default: 0,
  },
  resultTotal: {
    type: Number,
    default: 0,
  },
});
</script>

<style lang="scss" scoped>
h2 {
  font-size: 1.2rem;
  text-align: left;
  margin: 0;
}

.container {
  background: #fff;
  padding: 0.5rem;
  margin: 1rem auto;
}
</style>

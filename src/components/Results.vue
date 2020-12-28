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

<script>
import DosageResult from "../components/DosageResult";
import CarbRatio from "../classes/CarbRatio.js";

export default {
  name: "Results",
  components: {
    DosageResult
  },
  props: {
    carbRatio: CarbRatio,
    target: Number,
    correctionResult: Number,
    ratioResult: Number,
    resultTotal: Number
  }
};
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

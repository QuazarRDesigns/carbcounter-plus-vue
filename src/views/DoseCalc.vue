<template>
  <div class="view-container">
    <h1>Dosage Calculator</h1>
    <NumberInput
      title="Blood Glucose"
      id="glucose"
      color="blue"
      :unit="BGUnit.name"
      :step="0.1"
      :min="0"
      :max="50"
      v-model="glucose"
      @input="getResult"
    />
    <NumberInput
      title="Carbohydrates"
      id="carbs"
      color="green"
      :unit="carbUnit.name"
      :step="1"
      :min="0"
      :max="1000"
      v-model="carbs"
      @input="getResult"
    />
    <Results
      :carbRatio="carbRatio"
      :target="target"
      :correctionResult="correctionResult"
      :ratioResult="ratioResult"
      :resultTotal="resultTotal"
    />
  </div>
</template>

<script>
import NumberInput from "../components/NumberInput";
import Results from "../components/Results";
import CarbRatio from "../classes/CarbRatio.js";
import CarbUnit from "../classes/CarbUnit.js";
import BGUnit from "../classes/BGUnit.js";

export default {
  name: "dosecalc",
  components: {
    NumberInput,
    Results
  },
  data: function() {
    return {
      glucose: 0,
      carbs: 0,
      ratioResult: 0,
      correctionResult: 0,
      resultTotal: 0,
      carbRatio: new CarbRatio(1, 7),
      carbUnit: new CarbUnit("g", 1),
      BGUnit: new BGUnit("mmol/L", 1),
      target: 6.7,
      correctionFactor: 2
    };
  },
  methods: {
    getResult: function() {
      var carbsum = this.$data.carbs / this.$data.carbRatio.value;
      var correctionsum =
        (this.$data.glucose - this.$data.target) / this.$data.correctionFactor;
      // Calculate Carb Insulin
      this.$data.ratioResult = Number(carbsum.toFixed(1));

      // Calculate Correctional Insulin
      this.$data.correctionResult = Number(correctionsum.toFixed(1));

      if (
        Number.isNaN(this.$data.correctionResult) ||
        this.$data.correctionResult < 0
      ) {
        this.$data.correctionResult = 0;
      }
      if (Number.isNaN(this.$data.ratioResult) || this.$data.ratioResult < 0) {
        this.$data.ratioResult = 0;
      }

      var total = this.$data.correctionResult + this.$data.ratioResult;

      // Calculate Total Insulin
      this.$data.resultTotal = Number(total.toFixed(1));
    }
  }
};
</script>

<style></style>

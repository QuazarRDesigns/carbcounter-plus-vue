<template>
  <div class="v">
    <h1>Dosage Calculator</h1>
    <NumberInput
      title="Blood Glucose"
      id="glucose"
      color="blue"
      :unit="BGUnit"
      :step="0.1"
      v-model.number="glucose"
      @input="getResult"
    />
    <NumberInput
      title="Carbohydrates"
      id="carbs"
      color="green"
      :unit="carbUnit"
      :step="1"
      v-model.number="carbs"
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

export default {
  name: "dosecalc",
  components: {
    NumberInput,
    Results
  },
  computed: {
    BGUnit: function() {
      return this.$store.getters["settings/BGUnit"].name;
    },
    carbUnit: function() {
      return this.$store.getters["settings/carbUnit"].name;
    }
  },
  data: function() {
    return {
      glucose: 0,
      carbs: this.$store.getters["carbcalc/total"],
      ratioResult: 0,
      correctionResult: 0,
      resultTotal: 0,
      carbRatio: this.$store.state.settings.carbRatio,
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

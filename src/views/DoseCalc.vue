<template>
  <div class="view-container">
    <h1>Dosage Calculator</h1>
    <NumberInput
      id="glucose"
      title="Blood Glucose"
      color="blue"
      :unit="BGUnit.name"
      :step="0.1"
      :value="glucose"
      @input="updateNumberInput"
    />
    <NumberInput
      id="carbs"
      title="Carbohydrates"
      color="green"
      :unit="carbUnit.name"
      :step="1"
      :value="carbs"
      @input="updateNumberInput"
    />
    <DosageResults
      :carb-ratio="carbRatio"
      :target="target"
      :correction-result="correctionResult"
      :ratio-result="ratioResult"
      :result-total="resultTotal"
    />
  </div>
</template>

<script>
import NumberInput from "../components/NumberInput";
import DosageResults from "../components/DosageResults";
import { createNamespacedHelpers } from "vuex";

const { mapState, mapGetters, mapActions } =
  createNamespacedHelpers("dosecalc");

export default {
  name: "DoseCalc",
  components: {
    NumberInput,
    DosageResults,
  },
  data: function () {
    return {
      carbRatio: this.$store.state.settings.carbRatio,
      target: this.$store.state.settings.target,
    };
  },
  computed: {
    carbUnit: function () {
      return this.$store.getters["settings/carbUnit"];
    },
    BGUnit: function () {
      return this.$store.getters["settings/BGUnit"];
    },
    ...mapState(["glucose", "carbs"]),
    ...mapGetters(["ratioResult", "correctionResult", "resultTotal"]),
  },
  methods: {
    ...mapActions(["updateNumberInput"]),
  },
};
</script>

<style></style>

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
import { mapState, mapActions } from "pinia";

import { useSettingsStore } from "../stores/settings";
import { useDoseCalcStore } from "../stores/dosecalc";

import NumberInput from "../components/NumberInput.vue";
import DosageResults from "../components/DosageResults.vue";

export default {
  name: "DoseCalc",
  components: {
    NumberInput,
    DosageResults,
  },
  computed: {
    ...mapState(useSettingsStore, [
      "carbRatio",
      "target",
      "carbUnit",
      "BGUnit",
    ]),
    ...mapState(useDoseCalcStore, [
      "glucose",
      "carbs",
      "ratioResult",
      "correctionResult",
      "resultTotal",
    ]),
  },
  methods: {
    ...mapActions(useDoseCalcStore, ["updateNumberInput"]),
  },
};
</script>

<style></style>

<template>
  <div class="view-container">
    <h1>Dosage Calculator</h1>
    <NumberInput
      id="glucose"
      title="Blood Glucose"
      color="blue"
      :unit="settingsStore.BGUnit.name"
      :step="0.1"
      :value="doseCalcStore.glucose"
      @input="updateNumberInput"
    />
    <NumberInput
      id="carbs"
      title="Carbohydrates"
      color="green"
      :unit="settingsStore.carbUnit.name"
      :step="0.1"
      :value="doseCalcStore.carbs"
      @input="updateNumberInput"
    />
    <DosageResults
      :carb-ratio="settingsStore.carbRatio"
      :target="settingsStore.target"
      :correction-result="doseCalcStore.correctionResult"
      :ratio-result="doseCalcStore.ratioResult"
      :result-total="doseCalcStore.resultTotal"
    />
  </div>
</template>

<script setup>
import { useSettingsStore } from "../stores/settings";
import { useDoseCalcStore } from "../stores/dosecalc";

import NumberInput from "../components/NumberInput.vue";
import DosageResults from "../components/DosageResults.vue";

const settingsStore = useSettingsStore();
const doseCalcStore = useDoseCalcStore();

function updateNumberInput(payload) {
  const property = payload.id;
  const value = payload.value;
  doseCalcStore.$patch({
    [property]: value,
  });
}
</script>

<style></style>

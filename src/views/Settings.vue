<template>
  <div class="view-container settings">
    <h1>Settings</h1>
    <RatioInput
      id="carbRatio"
      title="Insulin to Carb Ratio"
      :step="0.5"
      :value="settingsStore.carbRatio"
      @input="updateRatioInput"
      @blur="settingsStore.carbRatio.simplify()"
    />
    <SelectInput
      id="carbUnit"
      title="Carbohydrate Unit"
      :options="settingsStore.carbUnitOptions"
      :value="settingsStore.carbUnitIndex"
      @change="updateSelectInput"
    />
    <SelectInput
      id="BGUnit"
      title="Blood Glucose Unit"
      :options="settingsStore.BGUnitOptions"
      :value="settingsStore.BGUnitIndex"
      @change="updateSelectInput"
    />
    <NumberInput
      id="target"
      title="Target Value"
      :unit="settingsStore.BGUnit.name"
      :step="0.1"
      :value="settingsStore.target"
      @input="updateNumberInput"
    />
    <NumberInput
      id="correctionFactor"
      title="Correction Factor"
      :unit="settingsStore.correctionNumber + ' &#58; TDI'"
      :step="0.001"
      :max="100"
      :value="settingsStore.correctionFactor"
      @input="updateNumberInput"
    />
    <SubmitButton
      title="Save Settings"
      :saved="settingsStore.saved"
      @click="settingsStore.saveSettings"
    />
  </div>
</template>

<script setup>
import { useSettingsStore } from "../stores/settings";
import { useDoseCalcStore } from "../stores/dosecalc";

import RatioInput from "../components/RatioInput.vue";
import NumberInput from "../components/NumberInput.vue";
import SelectInput from "../components/SelectInput.vue";
import SubmitButton from "../components/SubmitButton.vue";

const settingsStore = useSettingsStore();
const doseCalcStore = useDoseCalcStore();

function updateRatioInput(payload) {
  const property = payload.id;
  const value = payload.value;
  settingsStore.$patch({
    [property]: value,
  });
}

function updateNumberInput(payload) {
  const property = payload.id;
  const value = payload.value;
  settingsStore.$patch({
    [property]: value,
  });
}

function updateSelectInput(payload) {
  if (payload.id === "BGUnit") {
    settingsStore.convertTarget(payload.value);
    doseCalcStore.convertGlucose({
      previousBGUnitValue: Number(
        settingsStore.BGUnitOptions[settingsStore.BGUnitIndex].value
      ),
      newBGUnitValue: Number(settingsStore.BGUnitOptions[payload.value].value),
    });
  }
  if (payload.id === "carbUnit") {
    settingsStore.convertCarbRatio(payload.value);
    doseCalcStore.convertCarbs({
      previousCarbUnitValue: Number(
        settingsStore.carbUnitOptions[settingsStore.carbUnitIndex].value
      ),
      newCarbUnitValue: Number(
        settingsStore.carbUnitOptions[payload.value].value
      ),
    });
  }
  settingsStore.$patch({
    [payload.id + "Index"]: Number(payload.value),
  });
}
</script>

<style lang="scss" scoped></style>

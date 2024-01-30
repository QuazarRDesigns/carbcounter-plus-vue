<template>
  <div class="view-container settings">
    <h1>Settings</h1>
    <RatioInput
      id="carbRatio"
      title="Insulin to Carb Ratio"
      :step="1"
      :value="carbRatio"
      @input="updateRatioInput"
      @blur="carbRatio.simplify()"
    />
    <SelectInput
      id="carbUnit"
      title="Carbohydrate Unit"
      :options="carbUnitOptions"
      :value="carbUnitIndex"
      @change="updateSelectInput"
    />
    <SelectInput
      id="BGUnit"
      title="Blood Glucose Unit"
      :options="BGUnitOptions"
      :value="BGUnitIndex"
      @change="updateSelectInput"
    />
    <NumberInput
      id="target"
      title="Target Value"
      :unit="BGUnit.name"
      :step="0.1"
      :value="target"
      @input="updateNumberInput"
    />
    <NumberInput
      id="correctionFactor"
      title="Correction Factor"
      :unit="correctionNumber + ' &#58; TDI'"
      :step="1"
      :value="correctionFactor"
      @input="updateNumberInput"
    />
    <SubmitButton title="Save Settings" :saved="saved" @click="saveSettings" />
  </div>
</template>

<script>
import { mapState, mapActions } from "pinia";

import { useSettingsStore } from "../stores/settings";

import RatioInput from "../components/RatioInput.vue";
import NumberInput from "../components/NumberInput.vue";
import SelectInput from "../components/SelectInput.vue";
import SubmitButton from "../components/SubmitButton.vue";

export default {
  name: "AppSettings",
  components: {
    RatioInput,
    SelectInput,
    NumberInput,
    SubmitButton,
  },
  computed: {
    ...mapState(useSettingsStore, [
      "carbRatio",
      "carbUnitIndex",
      "carbUnitOptions",
      "BGUnitIndex",
      "BGUnitOptions",
      "target",
      "correctionFactor",
      "correctionNumber",
      "saved",
      "BGUnit",
    ]),
  },
  methods: {
    ...mapActions(useSettingsStore, [
      "updateRatioInput",
      "updateNumberInput",
      "updateSelectInput",
      "saveSettings",
    ]),
  },
};
</script>

<style lang="scss" scoped></style>

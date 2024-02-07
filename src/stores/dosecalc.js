import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { useSettingsStore } from "./settings";

export const useDoseCalcStore = defineStore("dosecalc", () => {
  const glucose = ref(0);
  const carbs = ref(0);

  function convertGlucose({ previousBGUnitValue, newBGUnitValue }) {
    const newGlucose = (glucose.value / previousBGUnitValue) * newBGUnitValue;

    glucose.value = newGlucose;
  }

  function convertCarbs({ previousCarbUnitValue, newCarbUnitValue }) {
    let newCarbs = carbs.value;

    if (previousCarbUnitValue === 1) {
      newCarbs = carbs.value / newCarbUnitValue;
    } else {
      newCarbs = (carbs.value * previousCarbUnitValue) / newCarbUnitValue;
    }

    carbs.value = newCarbs;
  }

  const ratioResult = computed(() => {
    const settingsStore = useSettingsStore();
    let carbRatio = settingsStore.carbRatio.value;

    // Calculate Carb Insulin
    const carbsum = carbs.value / carbRatio;
    let ratioResult = Number(carbsum.toFixed(1));

    if (Number.isNaN(ratioResult) || ratioResult < 0) {
      ratioResult = 0;
    }

    return ratioResult;
  });

  const correctionResult = computed(() => {
    const settingsStore = useSettingsStore();
    const glucoseDiff = glucose.value - settingsStore.target;
    const correctionFactor = settingsStore.correctionFactor;

    // Calculate Correctional Insulin
    const correctionsum = glucoseDiff / correctionFactor;
    let correctionResult = Number(correctionsum.toFixed(1));

    if (Number.isNaN(correctionResult) || correctionResult < 0) {
      correctionResult = 0;
    }

    return correctionResult;
  });

  const resultTotal = computed(() => {
    const total = correctionResult.value + ratioResult.value;

    // Calculate Total Insulin
    return Number(total.toFixed(1));
  });

  return {
    glucose,
    carbs,
    convertGlucose,
    convertCarbs,
    ratioResult,
    correctionResult,
    resultTotal,
  };
});

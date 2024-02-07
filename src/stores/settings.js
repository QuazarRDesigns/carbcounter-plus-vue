import { ref, computed, reactive } from "vue";
import { defineStore } from "pinia";

import CarbRatio from "../classes/CarbRatio";
import CarbUnit from "../classes/CarbUnit";
import { default as BGUnitConstructor } from "../classes/BGUnit";

const useSettingsStore = defineStore("settings", () => {
  const defaultSettings = {
    carbRatio: new CarbRatio(1, 10),
    carbUnitIndex: 2,
    carbUnitOptions: [
      new CarbUnit("BU", 12),
      new CarbUnit("CU", 15),
      new CarbUnit("g", 1),
    ],
    BGUnitIndex: 0,
    BGUnitOptions: [
      new BGUnitConstructor("mmol/L", 1),
      new BGUnitConstructor("mg/dL", 18.0182),
    ],
    target: 6.5,
    correctionFactor: 2,
    correctionNumber: 100,
  };

  let settingsData = defaultSettings;

  if (typeof Storage !== "undefined") {
    if (localStorage.getItem("settings")) {
      const savedSettings = JSON.parse(localStorage.getItem("settings"));
      const savedCarbRatio = new CarbRatio(
        savedSettings.carbRatio.insulin,
        savedSettings.carbRatio.carbs
      );

      savedSettings.carbRatio = savedCarbRatio;

      settingsData = savedSettings;
    }
  }

  const carbUnitOptions = defaultSettings.carbUnitOptions;
  const BGUnitOptions = defaultSettings.BGUnitOptions;
  // Don't pass user data into correctionNumber

  const carbRatio = reactive(settingsData.carbRatio);
  const carbUnitIndex = ref(settingsData.carbUnitIndex);
  const BGUnitIndex = ref(settingsData.BGUnitIndex);
  const target = ref(settingsData.target);
  const correctionFactor = ref(settingsData.correctionFactor);
  const correctionNumber = ref(defaultSettings.correctionNumber);
  const saved = ref(false);

  const carbUnit = computed(() => {
    return carbUnitOptions[carbUnitIndex.value];
  });
  const BGUnit = computed(() => {
    return BGUnitOptions[BGUnitIndex.value];
  });

  function convertTarget(newBGUnitIndex) {
    const previousBGUnitValue = Number(
      BGUnitOptions[BGUnitIndex.value].value
    ).toFixed(0);
    const newBGUnitValue = Number(BGUnitOptions[newBGUnitIndex].value).toFixed(
      0
    );
    target.value = (target.value / previousBGUnitValue) * newBGUnitValue;
    correctionNumber.value =
      (correctionNumber.value / previousBGUnitValue) * newBGUnitValue;
    correctionFactor.value =
      (correctionFactor.value / previousBGUnitValue) * newBGUnitValue;
  }

  function convertCarbRatio(newCarbUnitIndex) {
    const previousCarbUnitValue = Number(
      carbUnitOptions[carbUnitIndex.value].value
    );
    const newCarbUnitValue = Number(carbUnitOptions[newCarbUnitIndex].value);
    const newCarbRatio = carbRatio.convert(
      previousCarbUnitValue,
      newCarbUnitValue
    );
    carbRatio.value = newCarbRatio;
  }

  function saveSettings() {
    saved.value = false;
    const { ...saveState } = this.$state;
    if (typeof Storage !== "undefined") {
      localStorage.setItem("settings", JSON.stringify({ ...saveState }));
      saved.value = true;
    }
    setTimeout(function () {
      saved.value = false;
    }, 3000);
  }

  return {
    carbRatio,
    carbUnitIndex,
    carbUnitOptions,
    BGUnitIndex,
    BGUnitOptions,
    target,
    correctionFactor,
    correctionNumber,
    saved,
    carbUnit,
    BGUnit,
    convertTarget,
    convertCarbRatio,
    saveSettings,
  };
});

export { useSettingsStore };

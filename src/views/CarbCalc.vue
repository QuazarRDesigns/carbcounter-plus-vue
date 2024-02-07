<template>
  <div class="view-container">
    <h1>Carb Calculator</h1>
    <div class="selectgroup">
      <input
        v-if="!customCarb"
        id="searchTerm"
        type="text"
        placeholder="Enter a search term"
        :value="carbCalcStore.searchTerm"
        @input="search"
      />
      <DropdownInput
        v-if="!customCarb"
        id="selectedCategoryName"
        :value="selectedCategoryName"
        empty-string="Select a Category"
        :list="carbCalcStore.categoriesList"
        @change="selectedCategoryNameChange"
      />
      <DropdownInput
        v-if="selectedCategoryName"
        id="selectedCarbName"
        :value="selectedCarbName"
        empty-string="Select a Carb"
        :list="carbsList"
        @change="selectedCarbNameChange"
      />
      <DropdownInput
        v-if="selectedCarbName"
        id="selectedAmountName"
        :value="selectedAmountName"
        empty-string="Select an Amount"
        :list="amountsList"
        @change="selectedAmountNameChange"
      />
      <input
        v-if="customCarb"
        v-model="customCarbName"
        type="text"
        placeholder="Enter custom name (optional)"
      />
      <input
        v-if="!selectedCategoryName"
        v-model="customCarb"
        type="number"
        placeholder="Or enter custom value"
      />
    </div>
    <button class="bg-blue" @click="add">Add to list</button>
    <CarbTotal />
    <CarbList />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

import { useSettingsStore } from "../stores/settings";
import { useCarbCalcStore } from "../stores/carbcalc";

import DropdownInput from "@/components/DropdownInput.vue";
import CarbTotal from "@/components/CarbTotal.vue";
import CarbList from "@/components/CarbList.vue";

const settingsStore = useSettingsStore();
const carbCalcStore = useCarbCalcStore();

const selectedAmountName = ref("");
const selectedCarbName = ref("");
const selectedCategoryName = ref("");
const customCarb = ref("");
const customCarbName = ref("");

const selectedCategory = computed(() => {
  const subCategories = carbCalcStore.categoriesList.reduce(
    (accumulator, current) => accumulator.concat(current.subcategories),
    []
  );

  return subCategories.find(
    (category) => category.name === selectedCategoryName.value
  );
});

const carbsList = computed(() => {
  if (selectedCategory.value) {
    return selectedCategory.value.carbs;
  }

  return [];
});

const selectedCarb = computed(() => {
  return carbsList.value.find((carb) => carb.name === selectedCarbName.value);
});

const amountsList = computed(() => {
  if (selectedCarb.value) {
    return selectedCarb.value.amounts;
  }

  return [];
});

const selectedAmount = computed(() => {
  return amountsList.value.find(
    (amount) => amount.name === selectedAmountName.value
  );
});

function add() {
  let amount = customCarb.value
      ? customCarb.value + settingsStore.carbUnit.name
      : "",
    amountMultiplier = settingsStore.carbUnit.value,
    carbs = customCarb.value,
    subcategory = "",
    name = customCarbName.value ? customCarbName.value : "Custom Entry";

  if (selectedAmount.value) {
    amount = selectedAmount.value.name;
    amountMultiplier = selectedAmount.value.value;
    subcategory = selectedCategory.value.name;
    name = selectedCarb.value.name;
    carbs = selectedCarb.value.carb;
  }

  const item = {
    amount,
    amountMultiplier,
    carbs,
    subcategory,
    name,
  };

  if (amount) {
    carbCalcStore.addItem(item);
  }
}

function selectedCategoryNameChange(value) {
  selectedCategoryName.value = value;
  selectedCarbNameChange("");
}

function selectedCarbNameChange(value) {
  selectedCarbName.value = value;
  selectedAmountNameChange("");
}

function selectedAmountNameChange(value) {
  selectedAmountName.value = value;
}

function search($event) {
  carbCalcStore.search($event.target.value);
  selectedCategoryNameChange("");
}
</script>

<style lang="scss" scoped>
button {
  display: block;
  margin: 0 auto;
}

.selectgroup {
  background: #fff;
  padding: 0 0.5rem 0.5rem;
  margin: 1rem auto;
}
</style>

<template>
  <div class="container">
    <span class="stat">
      <span class="number">{{ carbCalcStore.total.toFixed(1) }}</span>
      <span class="unit">{{ settingsStore.carbUnit.name }}</span>
    </span>
    <a
      href="#/dosecalc/"
      class="button bg-green"
      @click.prevent="calculateDosage"
    >
      Calculate Dosage
    </a>
  </div>
</template>

<script setup>
import { useSettingsStore } from "../stores/settings";
import { useDoseCalcStore } from "../stores/dosecalc";
import { useCarbCalcStore } from "../stores/carbcalc";

import { useRouter } from "vue-router";

const settingsStore = useSettingsStore();
const doseCalcStore = useDoseCalcStore();
const carbCalcStore = useCarbCalcStore();

const router = useRouter();

function calculateDosage() {
  doseCalcStore.$patch({
    carbs: carbCalcStore.total,
  });

  router.push("dosecalc");
}
</script>

<style lang="scss" scoped>
@use "@/scss/variables.scss" as vars;

.container {
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 2rem;
  margin: 1rem auto;

  .button {
    color: #fff;
    text-decoration: none;
    margin-left: 1rem;
    padding: 0.5rem 1rem;
  }
}

.stat {
  color: vars.$blue;
  font-size: 3rem;

  .number {
    font-weight: 700;
  }
}
</style>

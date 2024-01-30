<template>
  <div class="container">
    <span class="stat">
      <span class="number">{{ total.toFixed(1) }}</span>
      <span class="unit">{{ carbUnit.name }}</span>
    </span>
    <a href="#/dosecalc/" class="button bg-green" @click="calculateDosage">
      Calculate Dosage
    </a>
  </div>
</template>

<script>
import { mapActions } from "pinia";

import { useSettingsStore } from "../stores/settings";
import { useDoseCalcStore } from "../stores/dosecalc";

export default {
  name: "CarbTotal",
  props: {
    total: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    carbUnit: function () {
      const settingsStore = useSettingsStore();
      return settingsStore.carbUnit;
    },
  },
  methods: {
    ...mapActions(useDoseCalcStore, ["update"]),
    calculateDosage($event) {
      $event.preventDefault();
      this.update({
        property: "carbs",
        index: this.total,
      });

      this.$router.push("dosecalc");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/variables.scss";

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
  color: $blue;
  font-size: 3rem;

  .number {
    font-weight: 700;
  }
}
</style>

<template>
  <div class="container">
    <span class="amount">{{ items.length }} items in list</span>
    <div v-for="item in items" :key="item.index" class="item">
      <div class="item-info">
        <p>
          <b class="item-subcategory">{{ item.subcategory }}</b>
          <br />
          <span class="item-name">{{ item.name }}</span>
        </p>
        <span class="item-amount">{{ item.amount }}</span>
      </div>
      <button @click="remove($event, item)">X</button>
    </div>
  </div>
</template>

<script>
import { useCarbCalcStore } from "../stores/carbcalc.js";
import { useSettingsStore } from "../stores/settings.js";

export default {
  name: "CarbList",
  computed: {
    items: function () {
      const carbCalcStore = useCarbCalcStore();
      return carbCalcStore.selectedItems;
    },
    carbUnit: function () {
      const settingsStore = useSettingsStore();
      return settingsStore.carbUnit;
    },
  },
  methods: {
    remove: function (event, item) {
      const carbCalcStore = useCarbCalcStore();
      carbCalcStore.removeItem(item);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/variables.scss";

.container {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.item {
  display: flex;
  flex: 0;
  align-items: center;
  margin: 0.25rem 0;
  padding: 1rem;
  flex-flow: row nowrap;
  background-color: #fff;
}

.item-info {
  display: flex;
  flex: 1;
  flex-flow: wrap;
  align-items: center;
}

.item-subcategory {
  font-weight: bold;
  flex: 1 0 auto;
}

.item-name {
  color: $green;
  font-weight: bold;
  flex: 0 1 auto;
  padding: 0 1rem;
}

.item-amount {
  color: $green;
  flex: 0 1 auto;
  margin: 0 auto;
}
</style>

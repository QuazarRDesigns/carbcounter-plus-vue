<template>
  <div class="container">
    <span class="amount">{{ items.length }} items in list</span>
    <button
      class="item"
      @click="remove($event, item)"
      v-for="item in items"
      :key="item.index"
    >
      <span class="item-title">
        <b class="item-subcategory">{{ item.subcategory }}</b>
        <span class="item-name">{{ item.name }}</span>
      </span>
      <span class="item-amount">{{ item.amount }}</span>
    </button>
  </div>
</template>

<script>
export default {
  name: "CarbList",
  computed: {
    items: function() {
      return this.$store.state.carbcalc.selectedItems;
    },
    carbUnit: function() {
      return this.$store.getters["settings/carbUnit"];
    }
  },
  methods: {
    remove: function(event, item) {
      this.$store.commit("carbcalc/remove", item);
    }
  }
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
  justify-content: center;
  margin: 0.25rem 0;
  padding: 1rem;
  flex-flow: row wrap;
}

.item-title {
  display: flex;
  flex-flow: row wrap;
}

.item-subcategory {
  font-weight: bold;
  flex: 1 0 auto;
}

.item-name {
  color: $green;
  font-weight: bold;
  flex: 0 1 auto;
  text-align: center;
  padding: 0 1rem;
}

.item-amount {
  color: $green;
  flex: 0 1 auto;
}
</style>

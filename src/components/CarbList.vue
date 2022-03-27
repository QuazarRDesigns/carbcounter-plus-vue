<template>
  <div class="container">
    <span class="amount">{{ items.length }} items in list</span>
    <div class="item" v-for="item in items" :key="item.index">
      <div class="item-info">
        <p>
          <b class="item-subcategory">{{ item.subcategory }}</b>
          <br />
          <span class="item-name">{{ item.name }}</span>
        </p>
        <span class="item-amount">{{ item.amount }}</span>
      </div>
      <button @click="remove($event, item)">
        X
      </button>
    </div>
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
      this.$store.commit("carbcalc/removeItem", item);
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

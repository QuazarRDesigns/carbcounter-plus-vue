<template>
  <div class="container">
    <span class="stat">
      <span class="number">{{ total.toFixed(1) }}</span>
      <span class="unit">g</span>
    </span>
    <router-link class="button bg-green" to="dosecalc"
      >Calculate Dosage</router-link
    >
  </div>
</template>

<script>
export default {
  name: "CarbTotal",
  computed: {
    total: function() {
      const reducer = (accumulator, currentValue) => currentValue + accumulator;
      return this.items
        .map(item => item.carbs * item.amountMultiplier)
        .reduce(reducer, 0);
    },
    items: function() {
      return this.$store.state.carbcalc.selectedItems;
    }
  }
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

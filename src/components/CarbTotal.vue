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
export default {
  name: "CarbTotal",
  props: {
    total: Number
  },
  computed: {
    carbUnit: function() {
      return this.$store.getters["settings/carbUnit"];
    }
  },
  methods: {
    calculateDosage($event) {
      $event.preventDefault();

      this.$store.commit("dosecalc/update", {
        property: "carbs",
        index: this.total
      });

      this.$router.push("dosecalc");
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

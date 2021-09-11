<template>
  <div class="view-container">
    <h1>Dosage Calculator</h1>
    <NumberInput
      title="Blood Glucose"
      id="glucose"
      color="blue"
      :unit="BGUnit.name"
      :step="0.1"
      :value="glucose"
      @input="updateNumberInput"
    />
    <NumberInput
      title="Carbohydrates"
      id="carbs"
      color="green"
      :unit="carbUnit.name"
      :step="1"
      :value="carbs"
      @input="updateNumberInput"
    />
    <Results
      :carbRatio="carbRatio"
      :target="target"
      :correctionResult="correctionResult"
      :ratioResult="ratioResult"
      :resultTotal="resultTotal"
    />
  </div>
</template>

<script>
import NumberInput from "../components/NumberInput";
import Results from "../components/Results";
import { createNamespacedHelpers } from "vuex";

const { mapState, mapGetters, mapActions } = createNamespacedHelpers(
  "dosecalc"
);

export default {
  name: "dosecalc",
  components: {
    NumberInput,
    Results
  },
  computed: {
    carbUnit: function() {
      return this.$store.getters["settings/carbUnit"];
    },
    BGUnit: function() {
      return this.$store.getters["settings/BGUnit"];
    },
    ...mapState(["glucose", "carbs"]),
    ...mapGetters(["ratioResult", "correctionResult", "resultTotal"])
  },
  data: function() {
    return {
      carbRatio: this.$store.state.settings.carbRatio,
      target: this.$store.state.settings.target
    };
  },
  methods: {
    ...mapActions(["updateNumberInput"])
  }
};
</script>

<style></style>

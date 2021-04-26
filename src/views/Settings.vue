<template>
  <div class="view-container">
    <SelectInput
      title="Carbohydrate Unit"
      id="carbUnit"
      :options="carbUnitOptions"
      :value="carbUnitIndex"
      @change="updateSelectInput"
    />
    <SelectInput
      title="Blood Glucose Unit"
      id="BGUnit"
      :options="BGUnitOptions"
      :value="BGUnitIndex"
      @change="updateSelectInput"
    />
    <NumberInput
      title="Target Value"
      id="target"
      :unit="BGUnit.name"
      :step="0.1"
      :value="target"
      @input="updateNumberInput"
    />
    <NumberInput
      title="Correction Factor"
      id="correctionFactor"
      :unit="correctionNumber + ' &#247; TDI'"
      :step="1"
      :value="correctionFactor"
      @input="updateNumberInput"
    />
  </div>
</template>

<script>
import NumberInput from "../components/NumberInput.vue";
import SelectInput from "../components/SelectInput.vue";
import { createNamespacedHelpers } from "vuex";

const { mapState, mapGetters, mapActions } = createNamespacedHelpers(
  "settings"
);

export default {
  name: "settings",
  components: {
    SelectInput,
    NumberInput
  },
  computed: {
    ...mapState([
      "carbUnitIndex",
      "carbUnitOptions",
      "BGUnitIndex",
      "BGUnitOptions",
      "target",
      "correctionFactor",
      "correctionNumber"
    ]),
    ...mapGetters(["BGUnit"])
  },
  methods: {
    ...mapActions(["updateNumberInput", "updateSelectInput"])
  }
};
</script>

<style lang="scss" scoped></style>

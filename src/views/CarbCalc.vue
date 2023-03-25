<template>
  <div class="view-container">
    <h1>Carb Calculator</h1>
    <div class="selectgroup">
      <input
        v-if="!customCarb"
        id="searchTerm"
        type="text"
        placeholder="Enter a search term"
        :value="searchTerm"
        @input="search"
      />
      <DropdownInput
        v-if="!customCarb"
        id="selectedCategoryName"
        :value="selectedCategoryName"
        empty-string="Select a Category"
        :list="categoriesList"
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
    <CarbTotal :total="total" />
    <CarbList />
  </div>
</template>

<script>
import DropdownInput from "@/components/DropdownInput.vue";
import CarbTotal from "@/components/CarbTotal.vue";
import CarbList from "@/components/CarbList.vue";

export default {
  name: "CarbCalc",
  components: {
    DropdownInput,
    CarbTotal,
    CarbList,
  },
  data: function () {
    return {
      selectedAmountName: "",
      selectedCarbName: "",
      selectedCategoryName: "",
      customCarb: "",
      customCarbName: "",
    };
  },
  computed: {
    searchTerm: function () {
      return this.$store.getters["carbcalc/searchTerm"];
    },
    categoriesList: function () {
      return this.$store.getters["carbcalc/categoriesList"];
    },
    selectedCategory: function () {
      const subCategories = this.categoriesList.reduce(
        (accumulator, current) => accumulator.concat(current.subcategories),
        []
      );

      return subCategories.find(
        (category) => category.name === this.$data.selectedCategoryName
      );
    },
    carbsList: function () {
      const selectedCategory = this.selectedCategory;

      if (selectedCategory) {
        return selectedCategory.carbs;
      }

      return [];
    },
    selectedCarb: function () {
      return this.carbsList.find(
        (carb) => carb.name === this.$data.selectedCarbName
      );
    },
    amountsList: function () {
      const selectedCarb = this.selectedCarb;

      if (selectedCarb) {
        return selectedCarb.amounts;
      }

      return [];
    },
    selectedAmount: function () {
      return this.amountsList.find(
        (amount) => amount.name === this.$data.selectedAmountName
      );
    },
    carbUnit: function () {
      return this.$store.getters["settings/carbUnit"];
    },
    total: function () {
      return this.$store.getters["carbcalc/total"];
    },
    items: function () {
      return this.$store.state.carbcalc.selectedItems;
    },
  },
  methods: {
    add: function () {
      let amount = this.$data.customCarb
          ? this.$data.customCarb + this.carbUnit.name
          : "",
        amountMultiplier = this.carbUnit.value,
        carbs = this.$data.customCarb,
        subcategory = "",
        name = this.$data.customCarbName
          ? this.$data.customCarbName
          : "Custom Entry";

      if (this.selectedAmount) {
        amount = this.selectedAmount.name;
        amountMultiplier = this.selectedAmount.value;
        subcategory = this.selectedCategory.name;
        name = this.selectedCarb.name;
        carbs = this.selectedCarb.carb;
      }

      const item = {
        amount,
        amountMultiplier,
        carbs,
        subcategory,
        name,
      };

      if (amount) {
        this.$store.commit("carbcalc/addItem", item);
      }
    },
    selectedCategoryNameChange: function (value) {
      this.selectedCategoryName = value;
      this.$data.selectedCarbName = "";
      this.selectedCarbNameChange("");
    },
    selectedCarbNameChange: function (value) {
      this.$data.selectedCarbName = value;
      this.selectedAmountNameChange("");
    },
    selectedAmountNameChange: function (value) {
      this.$data.selectedAmountName = value;
    },
    search: function ($event) {
      this.$store.commit("carbcalc/search", $event.target.value);
      this.selectedCategoryNameChange("");
    },
  },
};
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

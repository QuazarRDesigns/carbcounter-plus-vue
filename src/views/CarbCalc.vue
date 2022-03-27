<template>
  <div class="view-container">
    <h1>Carb Calculator</h1>
    <div class="selectgroup">
      <input
        id="searchTerm"
        type="text"
        placeholder="Enter a search term"
        v-if="!customCarb"
        :value="searchTerm"
        @input="search"
      />
      <DropdownInput
        id="selectedCategoryName"
        v-if="!customCarb"
        :value="selectedCategoryName"
        emptyString="Select a Category"
        :list="categoriesList"
        @change="selectedCategoryNameChange"
      />
      <DropdownInput
        id="selectedCarbName"
        v-if="selectedCategoryName"
        :value="selectedCarbName"
        emptyString="Select a Carb"
        :list="carbsList"
        @change="selectedCarbNameChange"
      />
      <DropdownInput
        id="selectedAmountName"
        v-if="selectedCarbName"
        :value="selectedAmountName"
        emptyString="Select an Amount"
        :list="amountsList"
        @change="selectedAmountNameChange"
      />
      <input
        v-if="customCarb"
        type="text"
        placeholder="Enter custom name (optional)"
        v-model="customCarbName"
      />
      <input
        v-if="!selectedCategoryName"
        type="number"
        placeholder="Or enter custom value"
        v-model="customCarb"
      />
    </div>
    <button class="bg-blue" @click="add">Add to list</button>
    <CarbTotal :total="total" />
    <CarbList />
  </div>
</template>

<script>
import DropdownInput from "@/components/DropdownInput";
import CarbTotal from "@/components/CarbTotal";
import CarbList from "@/components/CarbList";

export default {
  name: "carbcalc",
  components: {
    DropdownInput,
    CarbTotal,
    CarbList
  },
  data: function() {
    return {
      selectedAmountName: "",
      selectedCarbName: "",
      selectedCategoryName: "",
      customCarb: "",
      customCarbName: ""
    };
  },
  computed: {
    searchTerm: function() {
      return this.$store.getters["carbcalc/searchTerm"];
    },
    categoriesList: function() {
      return this.$store.getters["carbcalc/categoriesList"];
    },
    selectedCategory: function() {
      const subCategories = this.categoriesList.reduce(
        (accumulator, current) => accumulator.concat(current.subcategories),
        []
      );

      return subCategories.find(
        category => category.name === this.$data.selectedCategoryName
      );
    },
    carbsList: function() {
      const selectedCategory = this.selectedCategory;

      if (selectedCategory) {
        return selectedCategory.carbs;
      }

      return [];
    },
    selectedCarb: function() {
      return this.carbsList.find(
        carb => carb.name === this.$data.selectedCarbName
      );
    },
    amountsList: function() {
      const selectedCarb = this.selectedCarb;

      if (selectedCarb) {
        return selectedCarb.amounts;
      }

      return [];
    },
    selectedAmount: function() {
      return this.amountsList.find(
        amount => amount.name === this.$data.selectedAmountName
      );
    },
    carbUnit: function() {
      return this.$store.getters["settings/carbUnit"];
    },
    total: function() {
      return this.$store.getters["carbcalc/total"];
    },
    items: function() {
      return this.$store.state.carbcalc.selectedItems;
    }
  },
  methods: {
    add: function() {
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
        name
      };

      if (amount) {
        this.$store.commit("carbcalc/addItem", item);
      }
    },
    selectedCategoryNameChange: function(value) {
      this.selectedCategoryName = value;
      this.$data.selectedCarbName = "";
      this.selectedCarbNameChange("");
    },
    selectedCarbNameChange: function(value) {
      this.$data.selectedCarbName = value;
      this.selectedAmountNameChange("");
    },
    selectedAmountNameChange: function(value) {
      this.$data.selectedAmountName = value;
    },
    search: function($event) {
      this.$store.commit("carbcalc/search", $event.target.value);
      this.selectedCategoryNameChange("");
    }
  }
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

  select,
  input {
    background: #ddd;
    border: none;
    font-size: 1rem;
    height: 1.3rem;
    margin-top: 0.5rem;
    outline: none;
    width: 100%;
  }
}
</style>

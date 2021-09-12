<template>
  <div class="view-container">
    <div class="selectgroup">
      <select
        v-if="!customCarb"
        v-model="selectedCategory"
        @change="selectedCategoryChange"
      >
        <option value="" selected>Select a Category</option>
        <option
          v-for="category in categories"
          :key="category.index"
          :value="category"
          >{{ category }}</option
        >
      </select>
      <select
        v-if="selectedCategory"
        v-model="selectedCarb"
        @change="selectedCarbChange"
      >
        <option value="" selected>Select a Carb</option>
        <optgroup
          v-for="subcategory in subCategories"
          :key="subcategory.index"
          :label="subcategory.name"
        >
          <option
            v-for="carb in subcategory.carbs"
            :key="carb.index"
            :value="subcategory.name + ':' + carb.name + ':' + carb.carb"
            >{{ carb.name }}</option
          >
        </optgroup>
      </select>
      <select v-if="selectedCarb" v-model="selectedAmount">
        <option value="" selected>Select an Amount</option>
        <option
          v-for="amount in amounts"
          :key="amount.index"
          :value="amount.key + ':' + amount.value"
          >{{ amount.key }}</option
        >
      </select>
      <input
        v-if="customCarb"
        type="text"
        placeholder="Enter custom name (optional)"
        v-model="customCarbName"
      />
      <input
        v-if="!selectedCategory"
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
import carbs from "../carbs";
import CarbTotal from "@/components/CarbTotal";
import CarbList from "@/components/CarbList";

export default {
  name: "carbcalc",
  components: {
    CarbTotal,
    CarbList
  },
  data: function() {
    const categories = new Set(carbs.map(carb => carb.category));

    return {
      categories: Array.from(categories),
      selectedAmount: "",
      selectedCarb: "",
      selectedCategory: "",
      customCarb: "",
      customCarbName: ""
    };
  },
  computed: {
    carbUnit: function() {
      return this.$store.getters["settings/carbUnit"];
    },
    subCategories: function() {
      return carbs.filter(
        carb => carb.category === this.$data.selectedCategory
      );
    },
    amounts: function() {
      const [
        selectedSubcategory,
        selectedCarbName,
        ,
      ] = this.$data.selectedCarb.split(":");

      const carbItems = this.subCategories.filter(
        subCategory => subCategory.name === selectedSubcategory
      );

      if (carbItems.length) {
        const carbItem = carbItems[0].carbs.filter(
          carbItem => carbItem.name === selectedCarbName
        );

        return carbItem[0].amounts;
      }

      return [];
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

      if (this.$data.selectedAmount) {
        [amount, amountMultiplier] = this.$data.selectedAmount.split(":");
        [subcategory, name, carbs] = this.$data.selectedCarb.split(":");
      }

      const item = {
        amount,
        amountMultiplier,
        carbs,
        subcategory,
        name
      };

      if (amount) {
        this.$store.commit("carbcalc/add", item);
      }
    },
    selectedCategoryChange: function() {
      this.$data.selectedCarb = "";
      this.selectedCarbChange();
    },
    selectedCarbChange: function() {
      this.$data.selectedAmount = "";
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

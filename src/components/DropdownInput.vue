<template>
  <select @change="input" v-if="list.length !== 0">
    <option selected>{{ emptyString }}</option>
    <template v-if="list[0].class === 'CarbCategory'">
      <optgroup
        v-for="category in list"
        :key="category.uuid"
        :label="category.name"
      >
        <option
          v-for="subcategory in category.subcategories"
          :key="subcategory.uuid"
          :value="subcategory.name"
          >{{ subcategory.name }}</option
        >
      </optgroup>
    </template>
    <option
      v-else-if="list[0].class === 'Carb'"
      v-for="item in list"
      :key="item.uuid"
      :value="item.name"
      >{{ (item.variant ? item.variant + ", " : "") + item.name }}</option
    >
    <option
      v-else-if="list[0].class === 'CarbAmount'"
      v-for="item in list"
      :key="item.uuid"
      :value="item.name"
      >{{ item.name }}</option
    >
  </select>
</template>

<script>
export default {
  name: "DropdownInput",
  props: {
    value: [String],
    emptyString: String,
    list: Array
  },
  methods: {
    input: function($event) {
      const value =
        $event.target.value !== this.emptyString ? $event.target.value : "";
      this.$emit("change", value);
    }
  }
};
</script>

<style lang="scss" scoped></style>

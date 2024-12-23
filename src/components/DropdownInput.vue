<template>
  <select v-if="list.length !== 0" @change="input">
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
        >
          {{ subcategory.name }}
        </option>
      </optgroup>
    </template>
    <option
      v-for="item in list"
      v-else-if="list[0].class === 'Carb'"
      :key="item.uuid"
      :value="item.name"
    >
      {{ (item.variant ? item.variant + ", " : "") + item.name }}
    </option>
    <option
      v-for="item in list"
      v-else-if="list[0].class === 'CarbAmount'"
      :key="item.uuid"
      :value="item.name"
    >
      {{ item.name }}
    </option>
  </select>
</template>

<script setup>
const props = defineProps({
  value: {
    type: [String],
    default: "",
  },
  emptyString: { type: String, default: "Select an option" },
  list: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["change"]);

function input($event) {
  const value =
    $event.target.value !== props.emptyString ? $event.target.value : "";
  emit("change", value);
}
</script>

<style lang="scss" scoped></style>

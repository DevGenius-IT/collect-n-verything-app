<template>
  <h3 class="font-bold text-lg mb-4">{{ title }}</h3>
  <ul class="space-y-3">
    <DetailsListItem v-for="(item, index) in listItems" :label="item.label" :value="item.value" :key="index"/>

    <Separator v-if="datesList" class="!my-5"/>

    <DetailsListItem
      v-if="datesList"
      v-for="(item, index) in datesList"
      :label="item.label"
      :value="item.value"
      :key="index"
    />
  </ul>
</template>

<script setup lang="ts">

import type {DetailsListProps} from "~/types/components/props";
import DetailsListItem from "~/components/details/DetailsListItem.vue";

const {title, listItems, datesList} = defineProps<DetailsListProps>();

</script>

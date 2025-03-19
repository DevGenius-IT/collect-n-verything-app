<template>
  <li class="flex">
    <span class="w-[120px] sm:w-[150px] pr-5 font-light">{{ label }}</span>

    <ul v-if="Array.isArray(value)" class="list-none">
      <li v-for="(item, index) in value" :key="index">
        <span>{{ item }}</span>
      </li>
    </ul>

    <span v-else>{{ value }}</span>
  </li>
</template>

<script setup lang="ts">

import type {DetailsListItemProps} from "~/types/components/props";

const {label, value} = defineProps<DetailsListItemProps>();

</script>

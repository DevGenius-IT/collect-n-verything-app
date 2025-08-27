<template>
  <div>
    <Service/>
    <Prices/>
    <Contact/>
  </div>
</template>

<script setup lang="ts">

import {Contact, Prices, Service} from "~/components/sections";

definePageMeta({
  layout: "default",
  title: "app.title",
});

</script>

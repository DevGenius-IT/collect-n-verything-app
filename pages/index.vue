<template>
  <div>
    <Service/>
    <Contact/>
  </div>
</template>

<script setup lang="ts">

import {Contact, Service} from "~/components/sections";

definePageMeta({
  layout: "default",
  title: "app.title",
});

</script>

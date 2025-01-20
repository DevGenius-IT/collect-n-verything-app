import { defineStore } from "pinia";
import { ref } from "vue";

export const designStore = defineStore(
  "design",
  () => {
    const state = ref<{
      toggleRetract: boolean;
    }>({
      toggleRetract: false,
    });

    const toggle = (): void => {
      state.value.toggleRetract = !state.value.toggleRetract;
    };

    return { state, toggle };
  },
  {
    persist: true,
  },
);

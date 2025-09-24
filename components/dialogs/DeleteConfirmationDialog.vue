<template>
  <AlertDialog :open="open" @update:open="emit('update:open', $event)">
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>{{ t("components.delete-confirmation-dialog.title") }}</AlertDialogTitle>
        <AlertDialogDescription>
          {{ t("components.delete-confirmation-dialog.description") }}
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel @click="closeDialog">{{
            t("components.delete-confirmation-dialog.actions.cancel")
          }}
        </AlertDialogCancel>
        <AlertDialogAction class="bg-red-600 hover:bg-red-700 text-white" @click="confirmDelete">
          {{ t("components.delete-confirmation-dialog.actions.delete") }}
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>

<script setup>

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction
} from "@/components/ui/alert-dialog";

const {t} = useI18n();

const props = defineProps({
  open: Boolean,
});

const emit = defineEmits(["update:open", "confirm"]);

const closeDialog = () => emit("update:open", false);
const confirmDelete = () => {
  emit("confirm");
  closeDialog();
};

</script>

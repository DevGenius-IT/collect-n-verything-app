<template>
  <form :validation-schema="formSchema" @submit="onSubmit">
    <div class="flex flex-col md:flex-row gap-x-5 gap-y-2 items-start md:items-center w-full">
      <FormField v-slot="{ componentField }" name="old_password">
        <FormItem class="w-full">
          <div class="flex items-center">
            <FormLabel for="old_password">{{
                t("forms.update-password.fields.old-password.label")
              }}
            </FormLabel>
          </div>
          <FormControl>
            <Input
              id="old_password"
              type="password"
              autocomplete="current-password"
              :placeholder="t('forms.update-password.fields.old-password.placeholder')"
              v-bind="componentField"
              required
            />
          </FormControl>
          <FormDescription/>
          <FormMessage/>
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="password">
        <FormItem class="w-full">
          <div class="flex items-center">
            <FormLabel for="password">{{
                t("forms.update-password.fields.new-password.label")
              }}
            </FormLabel>
          </div>
          <FormControl>
            <Input
              id="password"
              type="password"
              autocomplete="new-password"
              :placeholder="t('forms.update-password.fields.new-password.placeholder')"
              v-bind="componentField"
              required
            />
          </FormControl>
          <FormDescription/>
          <FormMessage/>
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="password_confirmation">
        <FormItem class="w-full">
          <div class="flex items-center">
            <FormLabel for="password_confirmation">{{
                t("forms.update-password.fields.password-confirmation.label")
              }}
            </FormLabel>
          </div>
          <FormControl>
            <Input
              id="password_confirmation"
              type="password"
              autocomplete="new-password"
              :placeholder="
                t('forms.update-password.fields.password-confirmation.placeholder')
              "
              v-bind="componentField"
              required
            />
          </FormControl>
          <FormDescription/>
          <FormMessage/>
        </FormItem>
      </FormField>
      <Button :aria-label="t('forms.update-password.submit')" type="submit" class="md:ml-5 mt-2 md:mt-0 md:mb-2">
        {{ t("forms.update-password.submit") }}
      </Button>
    </div>
  </form>
</template>

<script setup lang="ts">
import {useForm} from 'vee-validate';
import {toTypedSchema} from '@vee-validate/zod';
import {z} from 'zod';
import {useI18n} from 'vue-i18n';
import {toast} from "~/components/ui/toast";
import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "~/components/ui/form";
import {Input} from "~/components/ui/input";
import {Button} from "~/components/ui/button";

const {t} = useI18n();
const apiUrl = process.env.NUXT_API_URL ?? 'http://localhost:8000/v1/api';
const auth = authStore();

const formSchema = toTypedSchema(
  z.object({
    old_password: z
      .string()
      .min(6, t("forms.update-password.fields.password.error"))
      .regex(/[A-Z]/, t("forms.update-password.fields.password.error"))
      .regex(/[a-z]/, t("forms.update-password.fields.password.error"))
      .regex(/\d/, t("forms.update-password.fields.password.error"))
      .regex(/[\W_]/, t("forms.update-password.fields.password.error")),
    password: z
      .string()
      .min(6, t("forms.update-password.fields.password.error"))
      .regex(/[A-Z]/, t("forms.update-password.fields.password.error"))
      .regex(/[a-z]/, t("forms.update-password.fields.password.error"))
      .regex(/\d/, t("forms.update-password.fields.password.error"))
      .regex(/[\W_]/, t("forms.update-password.fields.password.error")),
    password_confirmation: z
      .string()
      .min(6, t("forms.update-password.fields.password-confirmation.error")),
  }).refine((data) => data.password === data.password_confirmation, {
    message: t("forms.update-password.fields.password-confirmation.error"),
    path: ["password_confirmation"],
  })
);

const {handleSubmit} = useForm({
  validationSchema: formSchema,
});

const onSubmit = handleSubmit(async (values) => {
  if (!auth.state.user?.username) return;

  try {
    await $fetch(`${apiUrl}/auth/reset-password`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: {
        ...values,
        email: auth.state.user.email
      },
    });

    toast({description: t('forms.update-password.success'), variant: 'success'});
  } catch {
    toast({
      description: t("forms.update-password.error"),
      variant: "destructive"
    });
  }
});
</script>

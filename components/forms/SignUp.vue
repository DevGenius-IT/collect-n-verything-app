<template>
  <TabsContent value="register">
    <div class="grid gap-4 text-center">
      <h1 class="text-3xl font-bold">{{ t("forms.sign-up.title") }}</h1>
      <p class="text-balance text-muted-foreground">
        {{ t("forms.sign-up.description") }}
      </p>
    </div>
    <form class="grid pt-5 gap-4" @submit="onSubmit">
      <FormField v-slot="{ componentField }" name="firstname">
        <FormItem v-auto-animate>
          <FormLabel for="firstname">{{
            t("forms.sign-up.fields.firstname.label")
          }}</FormLabel>
          <FormControl>
            <Input
              id="firstname"
              type="text"
              :placeholder="t('forms.sign-up.fields.firstname.placeholder')"
              v-bind="componentField"
              required
            />
          </FormControl>
          <FormDescription />
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="lastname">
        <FormItem v-auto-animate>
          <FormLabel for="lastname">{{
            t("forms.sign-up.fields.lastname.label")
          }}</FormLabel>
          <FormControl>
            <Input
              id="lastname"
              type="text"
              :placeholder="t('forms.sign-up.fields.lastname.placeholder')"
              v-bind="componentField"
              required
            />
          </FormControl>
          <FormDescription />
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="username">
        <FormItem v-auto-animate>
          <FormLabel for="username">{{
            t("forms.sign-up.fields.username.label")
          }}</FormLabel>
          <FormControl>
            <Input
              id="username"
              type="text"
              autocomplete="username"
              :placeholder="t('forms.sign-up.fields.username.placeholder')"
              v-bind="componentField"
              required
            />
          </FormControl>
          <FormDescription />
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="email">
        <FormItem v-auto-animate>
          <FormLabel for="email">{{
            t("forms.sign-up.fields.email.label")
          }}</FormLabel>
          <FormControl>
            <Input
              id="email"
              type="email"
              :placeholder="t('forms.sign-up.fields.email.placeholder')"
              v-bind="componentField"
              required
            />
          </FormControl>
          <FormDescription />
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="phone_number">
        <FormItem v-auto-animate>
          <FormLabel for="phone_number">{{
            t("forms.sign-up.fields.phone-number.label")
          }}</FormLabel>
          <FormControl>
            <Input
              id="phone_number"
              type="tel"
              autocomplete="tel"
              :placeholder="t('forms.sign-up.fields.phone-number.placeholder')"
              v-bind="componentField"
            />
          </FormControl>
          <FormDescription />
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="password">
        <FormItem v-auto-animate>
          <div class="flex items-center">
            <FormLabel for="password">{{
              t("forms.sign-up.fields.password.label")
            }}</FormLabel>
          </div>
          <FormControl>
            <Input
              id="password"
              type="password"
              autocomplete="new-password"
              :placeholder="t('forms.sign-up.fields.password.placeholder')"
              v-bind="componentField"
              required
            />
          </FormControl>
          <FormDescription />
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="password_confirmation">
        <FormItem v-auto-animate>
          <div class="flex items-center">
            <FormLabel for="password_confirmation">{{
              t("forms.sign-up.fields.password-confirmation.label")
            }}</FormLabel>
          </div>
          <FormControl>
            <Input
              id="password_confirmation"
              type="password"
              autocomplete="new-password"
              :placeholder="
                t('forms.sign-up.fields.password-confirmation.placeholder')
              "
              v-bind="componentField"
              required
            />
          </FormControl>
          <FormDescription />
          <FormMessage />
        </FormItem>
      </FormField>
      <Button type="submit" class="w-full">
        {{ t("forms.sign-up.submit") }}
      </Button>
      <Button variant="outline" class="w-full">
        {{ t("forms.sign-up.google") }} <Google />
      </Button>
    </form>
    <div class="mt-4 text-center text-sm cursor-pointer">
      {{ t("forms.sign-up.already-have-account") }}
      <a @click="changeTab('login')" class="underline">
        {{ t("forms.sign-up.login-here") }}
      </a>
    </div>
  </TabsContent>
</template>

<script setup lang="ts">
import { Google } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TabsContent } from "@/components/ui/tabs";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/toast";
import type { SignUpProps } from "@/types/components/props";
import { vAutoAnimate } from "@formkit/auto-animate/vue";

import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import * as z from "zod";

const { changeTab, redirectAfterLogin = true } = defineProps<SignUpProps>();

const { t } = useI18n();

const auth = authStore();

const formSchema = toTypedSchema(
  z.object({
    firstname: z.string().min(3, t("forms.sign-up.fields.firstname.error")),
    lastname: z.string().min(3, t("forms.sign-up.fields.lastname.error")),
    username: z.string().min(3, t("forms.sign-up.fields.username.error")),
    email: z.string().email(t("forms.sign-up.fields.email.error")),
    phone_number: z
      .string()
      .optional()
      .refine(
        (val) => !val || /^\+?\d{2,15}$/.test(val),
        t("forms.sign-up.fields.phone-number.error")
      ),
    password: z
      .string()
      .min(6, t("forms.sign-up.fields.password.error"))
      .regex(/[A-Z]/, t("forms.sign-up.fields.password.error"))
      .regex(/[a-z]/, t("forms.sign-up.fields.password.error"))
      .regex(/\d/, t("forms.sign-up.fields.password.error"))
      .regex(/[\W_]/, t("forms.sign-up.fields.password.error")),
    password_confirmation: z
      .string()
      .min(6, t("forms.sign-up.fields.password-confirmation.error")),
  }).refine((data) => data.password === data.password_confirmation, {
    message: t("forms.sign-up.fields.password-confirmation.error"),
    path: ["password_confirmation"],
  })
);

const { handleSubmit } = useForm({
  validationSchema: formSchema,
});

const onSubmit = handleSubmit(async (values) => {
  await auth.signUp(values, redirectAfterLogin);
  if (auth.state.isError && auth.state.error)
    toast({
      description: t("toasts.error"),
      variant: "destructive",
    });
});
</script>

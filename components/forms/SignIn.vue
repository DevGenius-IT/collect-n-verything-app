<template>
  <TabsContent value="login">
    <div class="grid gap-4 text-center">
      <h1 class="text-3xl font-bold">{{ t("forms.sign-in.title") }}</h1>
      <p class="text-balance text-muted-foreground">
        {{ t("forms.sign-in.description") }}
      </p>
    </div>
    <form class="grid pt-5 gap-4" @submit="onSubmit">
      <FormField v-slot="{ componentField }" name="email">
        <FormItem v-auto-animate>
          <FormLabel for="email">{{
            t("forms.sign-in.fields.email.label")
          }}</FormLabel>
          <FormControl>
            <Input
              id="email"
              type="email"
              :placeholder="t('forms.sign-in.fields.email.placeholder')"
              v-bind="componentField"
              required
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
              t("forms.sign-in.fields.password.label")
            }}</FormLabel>
            <a
              href="/forgot-password"
              class="ml-auto inline-block text-sm underline"
            >
              {{ t("forms.sign-in.forgot-password") }}
            </a>
          </div>
          <FormControl>
            <Input
              id="password"
              type="password"
              :placeholder="t('forms.sign-in.fields.password.placeholder')"
              v-bind="componentField"
              required
            />
          </FormControl>
          <FormDescription />
          <FormMessage />
        </FormItem>
      </FormField>
      <Button type="submit" class="w-full">
        {{ t("forms.sign-in.submit") }}
      </Button>
      <Button variant="outline" class="w-full">
        {{ t("forms.sign-in.google") }} <Google />
      </Button>
    </form>
    <div class="mt-4 text-center text-sm cursor-pointer">
      {{ t("forms.sign-in.dont-have-account") }}
      <a @click="changeTab('register')" class="underline">
        {{ t("forms.sign-in.register-here") }}
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
import type { SignInProps } from "@/types/components/props";
import { vAutoAnimate } from "@formkit/auto-animate/vue";

import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import * as z from "zod";

const { changeTab } = defineProps<SignInProps>();

const { t } = useI18n();

const auth = authStore();

const formSchema = toTypedSchema(
  z.object({
    email: z.string().email(t("forms.sign-in.fields.email.error")),
    password: z.string().min(6, t("forms.sign-in.fields.password.error")),
  }),
);

const { handleSubmit } = useForm({
  validationSchema: formSchema,
});

const onSubmit = handleSubmit(async (values) => {
  await auth.signIn(values.email, values.password);
  if (auth.state.isError && auth.state.error)
    toast({
      title: t("toasts.error.title"),
      description: auth.state.error,
      variant: "destructive"
    })
});
</script>

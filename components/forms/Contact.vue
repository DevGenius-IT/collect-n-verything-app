<template>
  <form class="grid pt-5 gap-4" @submit="onSubmit">
    <FormField v-slot="{ componentField }" name="subject">
      <FormItem v-auto-animate>
        <FormLabel for="subject">{{ t("forms.contact.fields.subject.label") }}</FormLabel>
        <FormControl>
          <Select id="subject" v-bind="componentField">
            <SelectTrigger>
              <SelectValue :placeholder="t('forms.contact.fields.subject.placeholder')"/>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem
                  v-for="(value, key) in ContactSubject"
                  :key="key"
                  :value="value"
                >
                  {{ t(`forms.contact.fields.subject.options.${value}`) }}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </FormControl>
        <FormDescription/>
        <FormMessage/>
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="email">
      <FormItem v-auto-animate>
        <FormLabel for="email">{{ t("forms.contact.fields.email.label") }}</FormLabel>
        <FormControl>
          <Input
            id="email"
            type="email"
            autocomplete="email"
            :placeholder="t('forms.contact.fields.email.placeholder')"
            v-bind="componentField"
            required
          />
        </FormControl>
        <FormDescription/>
        <FormMessage/>
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="message">
      <FormItem v-auto-animate>
        <FormLabel for="message">{{ t("forms.contact.fields.message.label") }}</FormLabel>
        <FormControl>
          <textarea
            id="message"
            v-bind="componentField"
            class="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            :placeholder="t('forms.contact.fields.message.placeholder')"
            required
          ></textarea>
        </FormControl>
        <FormDescription/>
        <FormMessage/>
      </FormItem>
    </FormField>
    <Button type="submit" class="w-full">
      {{ t("forms.contact.submit") }}
    </Button>
  </form>
</template>

<script setup lang="ts">
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {toast} from "@/components/ui/toast";
import {vAutoAnimate} from "@formkit/auto-animate/vue";

import {toTypedSchema} from "@vee-validate/zod";
import {useForm} from "vee-validate";
import * as z from "zod";

const {t} = useI18n();
const apiUrl = process.env.NUXT_API_URL ?? 'http://localhost:8000/v1/api';

enum ContactSubject {
  GENERAL_INQUIRY = "general-inquiry",
  TECHNICAL_SUPPORT = "technical-support",
  ACCOUNT_ISSUE = "account-issue",
  BUG_REPORT = "bug-report",
  FEEDBACK = "feedback",
  JOB_APPLICATION = "job-application",
  OTHER = "other"
}

const formSchema = toTypedSchema(
  z.object({
    subject: z.string().min(1, t("forms.contact.fields.subject.error")),
    email: z.string().email(t("forms.contact.fields.email.error")),
    message: z.string().min(1, t("forms.contact.fields.message.error")),
  }),
);

const {handleSubmit} = useForm({
  validationSchema: formSchema,
});

const onSubmit = handleSubmit(async (values) => {
  try {
    await $fetch(`${apiUrl}/contacts`, {
      method: 'POST',
      body: {
        subject: values.subject,
        email: values.email,
        body: values.message
      }
    });

    toast({
      description: t("forms.contact.success-message"),
      variant: "success"
    });
  } catch (error) {
    toast({
      description: t("toasts.error"),
      variant: "destructive"
    });
  }
});
</script>
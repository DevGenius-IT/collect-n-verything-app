<template>
  <div v-if="id && isPending" class="space-y-5">
    <div v-for="n in 6" :key="n" class="flex w-full flex-col gap-y-2.5">
      <Skeleton class="w-1/3 h-[20px] rounded-md"/>
      <Skeleton class="w-full h-[40px] rounded-md"/>
    </div>
  </div>
  <form v-else :validation-schema="formSchema" @submit="onSubmit">
    <div class="space-y-4">
      <FormField v-slot="{ componentField }" name="firstname">
        <FormItem>
          <FormLabel for="firstname">{{ t('forms.user.fields.firstname.label') }}</FormLabel>
          <FormControl>
            <Input id="firstname" :placeholder="t('forms.user.fields.firstname.placeholder')" v-bind="componentField"
                   required/>
          </FormControl>
          <FormDescription/>
          <FormMessage/>
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="lastname">
        <FormItem>
          <FormLabel for="lastname">{{ t('forms.user.fields.lastname.label') }}</FormLabel>
          <FormControl>
            <Input id="lastname" :placeholder="t('forms.user.fields.lastname.placeholder')" v-bind="componentField"
                   required/>
          </FormControl>
          <FormDescription/>
          <FormMessage/>
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="username">
        <FormItem>
          <FormLabel for="username">{{ t('forms.user.fields.username.label') }}</FormLabel>
          <FormControl>
            <Input id="username" autocomplete="username" :placeholder="t('forms.user.fields.username.placeholder')"
                   v-bind="componentField"
                   required/>
          </FormControl>
          <FormDescription/>
          <FormMessage/>
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="email">
        <FormItem>
          <FormLabel for="email">{{ t('forms.user.fields.email.label') }}</FormLabel>
          <FormControl>
            <Input id="email" type="email" :placeholder="t('forms.user.fields.email.placeholder')"
                   v-bind="componentField" required/>
          </FormControl>
          <FormDescription/>
          <FormMessage/>
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="phone_number">
        <FormItem>
          <FormLabel for="phone_number">{{ t('forms.user.fields.phone-number.label') }}</FormLabel>
          <FormControl>
            <Input id="phone_number" type="tel" autocomplete="tel"
                   :placeholder="t('forms.user.fields.phone-number.placeholder')"
                   v-bind="componentField"/>
          </FormControl>
          <FormDescription/>
          <FormMessage/>
        </FormItem>
      </FormField>

      <FormField v-if="isForAdmin" v-slot="{ componentField }" name="password">
        <FormItem>
          <FormLabel for="password">
            {{ t("forms.user.fields.password.label") }}
          </FormLabel>
          <FormControl>
            <Input
              id="password"
              type="password"
              autocomplete="new-password"
              :placeholder="t('forms.user.fields.password.placeholder')"
              v-bind="componentField"
            />
          </FormControl>
          <FormDescription/>
          <FormMessage/>
        </FormItem>
      </FormField>
    </div>

    <Button :aria-label=" id ? t('forms.actions.update') : t('forms.actions.add')" type="submit" class="mt-8">
      {{ id ? t('forms.actions.update') : t('forms.actions.add') }}
    </Button>
  </form>
</template>

<script setup lang="ts">
import {useForm} from 'vee-validate';
import {toTypedSchema} from '@vee-validate/zod';
import {z} from 'zod';
import {useI18n} from 'vue-i18n';
import {useQuery} from '@tanstack/vue-query';
import type {User} from '~/types/models';
import {toast} from "~/components/ui/toast";
import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "~/components/ui/form";
import {Input} from "~/components/ui/input";

const {id, isForAdmin} = defineProps<{ id: number | null, isForAdmin: boolean }>();
const emit = defineEmits(['submitted']);
const {t} = useI18n();
const auth = authStore();
const config = useRuntimeConfig();
const apiUrl = config.public.apiUrl;

const schema = z.object({
  firstname: z.string().min(3, t("forms.user.fields.firstname.error")),
  lastname: z.string().min(3, t("forms.user.fields.lastname.error")),
  username: z.string().min(3, t("forms.user.fields.username.error")),
  email: z.string().email(t("forms.user.fields.email.error")),
  phone_number: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^\+?\d{2,15}$/.test(val),
      t("forms.user.fields.phone-number.error")
    ),
  password: id
    ? z
      .string()
      .min(6, t("forms.user.fields.password.error"))
      .regex(/[A-Z]/, t("forms.user.fields.password.error"))
      .regex(/[a-z]/, t("forms.user.fields.password.error"))
      .regex(/\d/, t("forms.user.fields.password.error"))
      .regex(/[\W_]/, t("forms.user.fields.password.error"))
      .optional()
    : z
      .string()
      .min(6, t("forms.user.fields.password.error"))
      .regex(/[A-Z]/, t("forms.user.fields.password.error"))
      .regex(/[a-z]/, t("forms.user.fields.password.error"))
      .regex(/\d/, t("forms.user.fields.password.error"))
      .regex(/[\W_]/, t("forms.user.fields.password.error"))
});

const formSchema = toTypedSchema(schema);

type FormValues = z.infer<typeof schema>;

const {handleSubmit, setValues} = useForm<FormValues>({
  validationSchema: formSchema
});

const {data, isPending} = useQuery<User>({
  queryKey: computed(() => [id]),
  queryFn: () =>
    $fetch(`${apiUrl}/users/${id}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${auth.state.token}`,
      },
    }),
  enabled: computed(() => !!id),
});

watchEffect(() => {
  const user = data.value;

  if (!user) return;

  setValues({
    firstname: user.firstname,
    lastname: user.lastname,
    username: user.username,
    email: user.email,
    phone_number: user.phone_number ?? undefined,
  });
});

const onSubmit = handleSubmit(async (values: FormValues) => {
  try {
    let method: 'POST' | 'PUT' = 'POST';
    let url = `${apiUrl}/users`;
    let successToastMessage = 'toasts.add';

    if (id) {
      method = 'PUT';
      url = `${apiUrl}/users/${id}`;
      successToastMessage = 'toasts.update';
    }

    await $fetch(url, {
      method,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${auth.state.token}`,
      },
      body: values,
    });

    toast({description: t(successToastMessage), variant: 'success'});
    emit('submitted');
  } catch {
    toast({
      description: t("toasts.error"),
      variant: "destructive"
    });
  }
});
</script>

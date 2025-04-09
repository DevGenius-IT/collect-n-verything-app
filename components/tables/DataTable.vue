<template>
  <div v-if="apiPath" class="w-full my-4">
    <Card>
      <CardHeader class="pb-1">
        <CardTitle class="flex items-start justify-between">
          <div class="pr-10 flex items-baseline">
            {{ t(`components.data-table.${apiPath}.title`) }}
            <span v-if="data?.meta" class="font-light text-base ml-1.5">
              {{ `(${data.meta.total})` }}
            </span>
          </div>
          <div class="flex flex-col items-end">
            <div class="flex items-center justify-end gap-2 mb-2 flex-wrap">
              <DropdownMenu>
                <DropdownMenuTrigger as-child>
                  <Button variant="outline" size="sm" class="h-7 gap-1">
                    <Icon name="ListFilter" class="h-3.5 w-3.5"/>
                    <span class="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      {{ t(`components.data-table.filters.filter`) }}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>{{ t(`components.data-table.filters.filter-by`) }}</DropdownMenuLabel>
                  <DropdownMenuSeparator/>
                  <DropdownMenuItem
                    :checked="selectedTrashFilter === 'with'"
                    @click="handleTrashFilterChange('with')"
                  >
                    {{ t(`components.data-table.filters.all`) }}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    :checked="selectedTrashFilter === ''"
                    @click="handleTrashFilterChange('')"
                  >
                    {{ t(`components.data-table.filters.active`) }}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    :checked="selectedTrashFilter === 'only'"
                    @click="handleTrashFilterChange('only')"
                  >
                    {{ t(`components.data-table.filters.archived`) }}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button size="sm" variant="outline" class="h-7 gap-1">
                <Icon name="File" class="h-3.5 w-3.5"/>
                <span class="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  {{ t(`components.data-table.export`) }}
                </span>
              </Button>
              <Button @click="openUpdateOrCreateSheet(null)" size="sm" class="h-7 gap-1">
                <Icon name="PlusCircle" class="h-3.5 w-3.5"/>
                <span class="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  {{ t(`components.data-table.${apiPath}.add-title`) }}
                </span>
              </Button>
            </div>
            <div class="font-light text-sm flex items-center text-muted-foreground">
              {{ t(`components.data-table.display`) }}
              <Select default-value="10" @update:model-value="handleItemPerPageChange">
                <SelectTrigger class="w-[44px] mx-1 p-1 h-6">
                  <SelectValue/>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="15">15</SelectItem>
                    <SelectItem value="25">25</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              {{ t(`components.data-table.items`) }}
            </div>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent>
        <Table v-if="fields">
          <TableHeader>
            <TableRow>
              <TableHead
                v-for="field in fields"
                :key="`th-${field}`"
                @click="sortByColumn(field)"
                class="cursor-pointer hover:text-neutral-50 hover:fill-neutral-50"
              >
                <span class="flex items-center">
                  {{ t(`components.data-table.${apiPath}.${field}`) }}
                  <Icon v-if="sortColumn === field" name="ArrowUpDown" class="ml-2 h-4 w-4 min-h-4 min-w-4"/>
                </span>
              </TableHead>
              <TableHead>
                <Icon name="Shield" class="h-5 w-5 min-h-5 min-w-5"/>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow
              v-if="isPending"
              v-for="index in (parseInt(queryParams.limit) || 10)"
              :key="`skeleton-${index}`"
            >
              <TableCell v-for="field in fields" :key="`row${index}-skeleton-${field}`">
                <Skeleton class="w-full h-[21px]"/>
              </TableCell>
            </TableRow>
            <TableRow v-else-if="isError">
              <TableCell :colspan="fields.length" class="text-red-500">
                {{ t("components.fetch-error") }}
              </TableCell>
            </TableRow>
            <TableRow v-else-if="data?.items" v-for="(item, indexRow) in data?.items">
              <TableCell
                v-for="field in fields"
                :key="`row${indexRow}-${field}`"
                class="font-medium"
              >
                {{
                  typeof item[field] === 'boolean' ?
                    t(`dichotomous-answers.${item[field] ? 'yes' : 'no'}`) :
                    item[field]
                }}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger class="flex items-center">
                    <Icon name="EllipsisVertical" class="h-5 w-5 min-h-5 min-w-5"/>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>
                      {{ t("components.data-table.actions.title") }}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator/>
                    <DropdownMenuItem @click="openDetails(item.id ?? 0)" class="cursor-pointer">
                      <Icon name="Eye" class="h-4 w-4"/>
                      {{ t("components.data-table.actions.details") }}
                    </DropdownMenuItem>
                    <DropdownMenuItem @click="openUpdateOrCreateSheet(item.id ?? 0)" class="cursor-pointer">
                      <Icon name="Pencil" class="h-4 w-4"/>
                      {{ t("components.data-table.actions.edit") }}
                    </DropdownMenuItem>
                    <DropdownMenuItem v-if="!item.deleted_at" @click="confirmDelete(item.id ?? 0)"
                                      class="bg-red-900 focus:bg-red-800 cursor-pointer">
                      <Icon name="Trash2" class="h-4 w-4"/>
                      {{ t("components.data-table.actions.delete") }}
                    </DropdownMenuItem>
                    <DropdownMenuItem v-else @click="restore(item.id ?? 0)"
                                      class="bg-green-900 focus:bg-green-800 cursor-pointer">
                      <Icon name="History" class="h-4 w-4"/>
                      {{ t("components.data-table.actions.restore") }}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>

      <CardFooter v-if="data?.meta">
        <div class="flex mt-2 w-full justify-center">
          <PaginationC
            v-slot="{ page }"
            :total="data.meta.total"
            :sibling-count="1"
            show-edges
            :items-per-page="data.meta.limit"
            :default-page="data.meta.current_page"
            @update:page="handlePageChange"
          >
            <PaginationList v-slot="{ items }" class="flex items-center gap-1">
              <PaginationPrev/>

              <template v-for="(item, index) in items">
                <PaginationListItem v-if="item.type === 'page'" :key="index" :value="item.value" as-child>
                  <Button class="w-10 h-10 p-0" :variant="item.value === page ? 'default' : 'outline'">
                    {{ item.value }}
                  </Button>
                </PaginationListItem>
                <PaginationEllipsis v-else :key="item.type" :index="index"/>
              </template>

              <PaginationNext/>
            </PaginationList>
          </PaginationC>
        </div>
      </CardFooter>
    </Card>

    <Details :id="selectedId" :apiPath="apiPath" :isOpen="isSheetOpen" :onClose="closeSheet"/>

    <Sheet v-model:open="isUpdateOrCreateSheetOpen">
      <SheetContent class="w-full sm:min-w-[480px] max-h-screen overflow-y-auto" aria-description="test">
        <SheetHeader class="mb-5">
          <SheetTitle>
            {{
              selectedId ?
                t("components.data-table.actions.edit") :
                t(`components.data-table.${apiPath}.add-title`)
            }}
          </SheetTitle>
          <SheetDescription/>
        </SheetHeader>

        <UserForm v-if="apiPath === 'users'" :id="selectedId"
                  @submitted="() => {
                    refetch();
                    closeSheet();
                  }"
        />
      </SheetContent>
    </Sheet>

    <DeleteConfirmationDialog
      :open="isDeleteDialogOpen"
      @update:open="isDeleteDialogOpen = $event"
      @confirm="deleteItem"
    />
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import type {DataTableProps} from "@/types/components/props";
import {
  Pagination as PaginationC,
} from '@/components/ui/pagination'
import {useMutation, useQuery} from '@tanstack/vue-query'
import type {Pagination} from "~/types/constants";
import type {User} from "~/types/models";
import {Details} from "~/components/details";
import {toast} from "~/components/ui/toast";
import {UserForm} from "~/components/forms";
import {DeleteConfirmationDialog} from "~/components/dialogs";

const {t} = useI18n();

const {apiPath, fields} = defineProps<DataTableProps<User>>();

const apiUrl = process.env.NUXT_API_URL ?? 'http://localhost:8000/v1';
const auth = authStore();
const url = new URL(`${apiUrl}/admin/${apiPath}`)

const sortColumn = ref<keyof User | ''>('');
const selectedTrashFilter = ref<'with' | 'only' | ''>('');
const queryParams = ref({
  limit: '10',
  page: '1',
  orderBy: sortColumn.value,
  order: 'asc',
  trash: selectedTrashFilter.value
});

const {isPending, isError, data, refetch} = useQuery<Pagination<User>>({
  queryKey: [apiPath, queryParams],
  queryFn: () => {
    setUrlSearchParams(url, queryParams.value);

    return $fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'fields': 'id,deleted_at,' + fields.join(','),
        'Authorization': `Bearer ${auth.state.token}`,
      },
    });
  },
});

const setUrlSearchParams = (url: URL, params: Record<string, string>) => {
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });
}

const handleTrashFilterChange = (newTrashFilter: 'with' | 'only' | '') => {
  selectedTrashFilter.value = newTrashFilter;
  queryParams.value.trash = newTrashFilter;
};

const handleItemPerPageChange = (newItemPerPage: string) => {
  queryParams.value.limit = newItemPerPage;
};

const handlePageChange = (newPage: number) => {
  queryParams.value.page = newPage.toString();
};

const sortByColumn = (column: keyof User) => {
  let sortDirection = 'asc';

  if (sortColumn.value === column) {
    if (queryParams.value.order === 'asc') {
      sortDirection = 'desc'
    } else {
      sortColumn.value = '';
    }
  } else {
    sortColumn.value = column;
  }

  queryParams.value = {
    ...queryParams.value,
    orderBy: sortColumn.value,
    order: sortDirection,
  };
};

const selectedId = ref<number | null>(null);
const isSheetOpen = ref(false);
const isUpdateOrCreateSheetOpen = ref(false);

const openDetails = (id: number | null) => {
  selectedId.value = id;
  isSheetOpen.value = true;
};

const openUpdateOrCreateSheet = (id: number | null) => {
  selectedId.value = id;
  isUpdateOrCreateSheetOpen.value = true;
};

const closeSheet = () => {
  selectedId.value = null;
  isSheetOpen.value = false;
  isUpdateOrCreateSheetOpen.value = false;
};

const isDeleteDialogOpen = ref(false);

const confirmDelete = (id: number) => {
  selectedId.value = id;
  isDeleteDialogOpen.value = true;
};

const deleteItemMutation = useMutation({
  mutationFn: async () => {
    if (!selectedId.value) throw new Error();

    return $fetch(`${apiUrl}/admin/${apiPath}`, {
      method: "DELETE",
      body: {
        ids: [selectedId.value]
      },
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${auth.state.token}`,
      },
    });
  },
  onSuccess: () => {
    toast({description: t("toasts.delete"), variant: "success"});
    refetch();
  },
  onError: () => {
    toast({
      description: t("toasts.error"),
      variant: "destructive"
    });
  },
  onSettled: () => {
    selectedId.value = null;
    isDeleteDialogOpen.value = false;
  }
});

const deleteItem = () => {
  deleteItemMutation.mutate();
};

const restoreItemMutation = useMutation({
  mutationFn: (id: number) =>
    $fetch(`${apiUrl}/admin/${apiPath}/restore`, {
      method: "PATCH",
      body: {
        ids: [id],
      },
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${auth.state.token}`,
      },
    }),
  onSuccess: () => {
    toast({description: t("toasts.restore"), variant: "success"});
    refetch();
  },
  onError: () => {
    toast({
      description: t("toasts.error"),
      variant: "destructive",
    });
  },
});

const restore = (id: number | null) => {
  if (!id) return;
  restoreItemMutation.mutate(id);
};


</script>
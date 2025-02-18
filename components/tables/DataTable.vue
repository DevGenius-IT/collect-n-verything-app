<template>
  <main class="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
    <Tabs default-value="all">
      <div class="flex items-center">
        <TabsList>
          <TabsTrigger value="all">
            All
          </TabsTrigger>
          <TabsTrigger value="active">
            Active
          </TabsTrigger>
          <TabsTrigger value="archived" class="hidden sm:flex">
            Archived
          </TabsTrigger>
        </TabsList>
        <div class="ml-auto flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <Button variant="outline" size="sm" class="h-7 gap-1">
                <Icon name="ListFilter" class="h-3.5 w-3.5"/>
                <span class="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Filter
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by</DropdownMenuLabel>
              <DropdownMenuSeparator/>
              <DropdownMenuItem checked>
                Active
              </DropdownMenuItem>
              <DropdownMenuItem>
                Archived
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button size="sm" variant="outline" class="h-7 gap-1">
            <Icon name="File" class="h-3.5 w-3.5"/>
            <span class="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Export
            </span>
          </Button>
          <Button size="sm" class="h-7 gap-1">
            <Icon name="PlusCircle" class="h-3.5 w-3.5"/>
            <span class="sr-only sm:not-sr-only sm:whitespace-nowrap">
              {{ t(`components.data-table.add-btn`) }} {{ t(`components.data-table.${users.$id}.btn-title`) }}
            </span>
          </Button>
        </div>
      </div>
      <TabsContent value="all">
        <Card>
          <CardHeader>
            <CardTitle>{{ t(`components.data-table.${users.$id}.title`) }}</CardTitle>
            <CardDescription>
              {{ t(`components.data-table.${users.$id}.description`) }}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead
                      v-for="col in columnsToDisplay"
                      :key="col.propertyName"
                      @click="sortByColumn(col.propertyName)"
                  >
                    <span>{{ col.displayName }}</span>
                    <span v-if="sortColumn === col.propertyName">
                      {{ sortDirection === 'asc' ? '🔼' : '🔽' }}
                    </span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow v-for="item in paginatedData" :key="item.id">
                  <TableCell
                      v-for="col in columnsToDisplay"
                      :key="col.propertyName"
                      class="font-medium"
                  >
                    {{ item[col.propertyName] }}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter>
            <div class="pagination mt-4 flex justify-between">
              <button @click="prevPage" :disabled="paginationState.currentPage === 1">Précédent</button>
              <span>Page {{ paginationState.currentPage }} sur {{ totalPages }}</span>
              <button @click="nextPage" :disabled="paginationState.currentPage === totalPages">Suivant</button>
            </div>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  </main>
</template>

<script setup lang="ts">
import {ref, computed} from 'vue';
import type {DataTableProps} from "@/types/components/props";
import Icon from "@/components/Icon.vue";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import type {User} from "~/types/models";

const {t} = useI18n();
const {columnsToDisplay, itemsPerPage} = defineProps<DataTableProps<User>>();

const users = userStore();
users.getAll()
const data: User[] = users.state.index ?? [];

interface PaginationState {
  currentPage: number;
  itemsPerPage: number;
}

const paginationState: PaginationState = {
  currentPage: 1,
  itemsPerPage: itemsPerPage || 10,
};

const sortColumn = ref<keyof User | null>(null);
const sortDirection = ref<'asc' | 'desc'>('asc');

const sortByColumn = (column: keyof User) => {
  if (sortColumn.value === column) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortColumn.value = column;
    sortDirection.value = 'asc';
  }
};

const sortedData = computed(() => {
  if (!sortColumn.value) return data;

  return [...data].sort((a, b) => {
    if (!sortColumn.value) return 0;

    if (a[sortColumn.value] > b[sortColumn.value]) {
      return sortDirection.value === 'asc' ? 1 : -1;
    } else if (a[sortColumn.value] < b[sortColumn.value]) {
      return sortDirection.value === 'asc' ? -1 : 1;
    }
    return 0;
  });
});

const totalPages = computed(() =>
    Math.ceil(sortedData.value.length / paginationState.itemsPerPage)
);
const paginatedData = computed(() =>
    sortedData.value.slice(
        (paginationState.currentPage - 1) * paginationState.itemsPerPage,
        paginationState.currentPage * paginationState.itemsPerPage
    )
);

const nextPage = () => {
  if (paginationState.currentPage < totalPages.value) {
    paginationState.currentPage++;
  }
};

const prevPage = () => {
  if (paginationState.currentPage > 1) {
    paginationState.currentPage--;
  }
};
</script>
export type DataTableProps<T> = {
  fields: (keyof T)[];
  apiPath: string;
};

export default DataTableProps;
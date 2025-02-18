export type DataTableProps<T> = {
  columnsToDisplay: {
    propertyName: keyof T;
    displayName: string;
  }[],
  itemsPerPage?: number;
};

export default DataTableProps;
export type Pagination<T> = {
  items: T[];
  meta: {
    total: number
    pages_count: number
    current_page: number
    limit: number
    selected_fields: string[] | null
  }
};

export default Pagination;
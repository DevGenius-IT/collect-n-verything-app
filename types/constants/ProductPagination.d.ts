import type {Product} from "~/types/models";

export type ProductPagination = {
  data: Product[];
  current_page: number;
  per_page: number;
  has_more: boolean;
  next_page_url: string | null;
};

export default ProductPagination;
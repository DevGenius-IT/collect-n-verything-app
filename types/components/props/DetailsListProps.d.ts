import DetailsListItem from "~/components/details/DetailsListItem.vue";

export type DetailsListProps = {
  title: string;
  listItems: DetailsListItem[];
  datesList?: DetailsListItem[];
};

export default DetailsListProps;
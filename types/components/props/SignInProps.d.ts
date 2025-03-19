import type { Tabs } from "~/types/pages/auth/values";

export type SignUpProps = {
  changeTab: (tab: Tabs) => void;
};

export default SignUpProps;
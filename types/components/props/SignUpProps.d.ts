import type { Tabs } from "~/types/pages/auth/values";

export type SignUpProps = {
  changeTab: (tab: Tabs) => void;
  redirectAfterLogin?: boolean;
};

export default SignUpProps;
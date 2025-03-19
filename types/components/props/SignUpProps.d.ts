import type { Tabs } from "~/types/pages/auth/values";

export type SignInProps = {
  changeTab: (tab: Tabs) => void;
};

export default SignInProps;
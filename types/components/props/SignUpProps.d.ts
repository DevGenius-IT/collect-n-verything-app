import type { Tabs } from "~/types/pages/auth/values";

type SignInProps = {
  changeTab: (tab: Tabs) => void;
};

export default SignInProps;
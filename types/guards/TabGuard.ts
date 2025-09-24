import type {Tabs} from "~/types/pages/auth/values";

export const isValidTabValue = (value: unknown): value is Tabs => {
  return value === "login" || value === "register";
};

export default isValidTabValue;
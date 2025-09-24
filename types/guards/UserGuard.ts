import type {User} from "~/types/models";

export const isUser = (data: any): data is User => {
  return (data as User).username !== undefined && (data as User).email !== undefined;
}

export default isUser;
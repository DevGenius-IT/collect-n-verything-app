export type User = {
  id?: number;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  phone_number?: string | null;
  has_newsletter?: boolean;
  roles?: string[];
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
};

export default User;
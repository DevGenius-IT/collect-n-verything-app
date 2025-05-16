export type User = {
  id: number;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  phone_number?: string | null;
  stripe_id?: string | null;
  type: 'admin'| 'superadmin' | 'client';
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
};

export default User;
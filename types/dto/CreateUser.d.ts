export type CreateUser = {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  phone_number?: string | null;
  type?: 'admin'| 'superadmin' | 'client';
};

export default CreateUser;
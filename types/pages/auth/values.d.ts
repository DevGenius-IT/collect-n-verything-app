export type Credentials = {
  email: string;
  password: string;
}

export type SignUpCredentials = {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  phone: string;
  password: string;
  passwordConfirmation: string;
}

export type Tabs = "login" | "register";
type Credentials = {
  email: string;
  password: string;
}

type SignUpCredentials = {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  phone: string;
  password: string;
  passwordConfirmation: string;
}

type Tabs = "login" | "register";

export { Credentials, SignUpCredentials, Tabs };

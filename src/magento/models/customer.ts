export class MagentoCustomer {
  email: string;
  firstname: string;
  lastname: string;
  password: string;

  constructor({
    email,
    firstname,
    lastname,
    password,
  }: {
    email: string;
    firstname: string;
    lastname: string;
    password: string;
  }) {
    this.email = email;
    this.firstname = firstname;
    this.lastname = lastname;
    this.password = password;
  }

  toRequestData = () => {
    return {
      customer: { email: this.email, firstname: this.firstname, lastname: this.lastname },
      password: this.password,
    };
  };
}

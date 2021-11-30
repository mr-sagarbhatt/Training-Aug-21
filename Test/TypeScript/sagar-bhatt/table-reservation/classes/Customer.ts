import { iCustomer } from "../interfaces";
import { eGender } from "../enum";

// * Customer
class Customer implements iCustomer {
  constructor(
    public id: number,
    public firstName: string,
    public lastName: string,
    public gender: eGender,
    public email: string,
    public phone: number,
    public nationality: string
  ) {
    console.log("Customer constructor invoked!");
  }

  getCustomer() {
    return {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      gender: eGender[this.gender],
      email: this.email,
      phone: this.phone,
      nationality: this.nationality,
    };
  }
}

export { Customer };

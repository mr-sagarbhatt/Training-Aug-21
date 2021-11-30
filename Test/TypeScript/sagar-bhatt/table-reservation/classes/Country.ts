import { iCountry } from "../interfaces";

// * Customer
class Country implements iCountry {
  constructor(public id: number, public countryName: string) {
    console.log("Country constructor invoked!");
  }

  getCountry() {
    return {
      id: this.id,
      countryName: this.countryName,
    };
  }
}

export { Country };

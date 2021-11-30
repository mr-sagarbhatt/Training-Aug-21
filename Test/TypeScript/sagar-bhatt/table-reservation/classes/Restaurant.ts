import { iRestaurant } from "../interfaces";

// * Restaurant
class Restaurant implements iRestaurant {
  constructor(
    public id: number,
    public name: string,
    public location: string,
    public countryId: number
  ) {
    console.log("Restaurant constructor invoked!");
  }

  getRestaurant() {
    return {
      id: this.id,
      name: this.name,
      location: this.location,
      countryId: this.countryId,
    };
  }
}

export { Restaurant };

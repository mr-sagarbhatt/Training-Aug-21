"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Restaurant = void 0;
// * Restaurant
class Restaurant {
    constructor(id, name, location, countryId) {
        this.id = id;
        this.name = name;
        this.location = location;
        this.countryId = countryId;
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
exports.Restaurant = Restaurant;

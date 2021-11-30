"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Country = void 0;
// * Customer
class Country {
    constructor(id, countryName) {
        this.id = id;
        this.countryName = countryName;
        console.log("Country constructor invoked!");
    }
    getCountry() {
        return {
            id: this.id,
            countryName: this.countryName,
        };
    }
}
exports.Country = Country;

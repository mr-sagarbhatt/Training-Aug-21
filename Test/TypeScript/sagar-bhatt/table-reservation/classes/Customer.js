"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Customer = void 0;
const enum_1 = require("../enum");
// * Customer
class Customer {
    constructor(id, firstName, lastName, gender, email, phone, nationality) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.email = email;
        this.phone = phone;
        this.nationality = nationality;
        console.log("Customer constructor invoked!");
    }
    getCustomer() {
        return {
            id: this.id,
            firstName: this.firstName,
            lastName: this.lastName,
            gender: enum_1.eGender[this.gender],
            email: this.email,
            phone: this.phone,
            nationality: this.nationality,
        };
    }
}
exports.Customer = Customer;

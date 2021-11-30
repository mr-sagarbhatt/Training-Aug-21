"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Booking = void 0;
const enum_1 = require("../enum");
const functions_1 = require("../functions");
// * Booking
class Booking {
    constructor(id, tableId, customerId, mealPlan, date, fromTime, toTime, token, noOfPersons, status) {
        this.id = id;
        this.tableId = tableId;
        this.customerId = customerId;
        this.mealPlan = mealPlan;
        this.date = date;
        this.fromTime = fromTime;
        this.toTime = toTime;
        this.token = token;
        this.noOfPersons = noOfPersons;
        this.status = status;
        console.log("Booking constructor invoked!");
    }
    getBooking() {
        if (this.date > new Date()) {
            if ((0, functions_1.monthDiff)(new Date(), this.date) <= 1) {
                return {
                    id: this.id,
                    tableId: this.tableId,
                    customerId: this.customerId,
                    mealPlan: enum_1.eMealPlan[this.mealPlan],
                    date: this.date,
                    fromTime: this.fromTime,
                    toTime: this.toTime,
                    token: this.token,
                    noOfPersons: this.noOfPersons,
                    status: enum_1.eBookingStatus[this.status],
                };
            }
            else {
                throw new Error("Can book table within 1 month only!");
            }
        }
        else {
            throw new Error("Please enter proper date");
        }
    }
    getToken() {
        return {
            bookingId: this.id,
            token: this.token,
        };
    }
}
exports.Booking = Booking;

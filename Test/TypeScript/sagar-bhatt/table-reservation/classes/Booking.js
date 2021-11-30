"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Booking = void 0;
const enum_1 = require("../enum");
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
    getToken() {
        return {
            bookingId: this.id,
            token: this.token,
        };
    }
}
exports.Booking = Booking;

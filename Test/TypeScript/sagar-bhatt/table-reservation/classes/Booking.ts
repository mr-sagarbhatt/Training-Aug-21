import { iBooking } from "../interfaces";
import { eMealPlan, eBookingStatus } from "../enum";
import { monthDiff } from "../functions";

// * Booking
class Booking implements iBooking {
  constructor(
    public id: number,
    public tableId: number,
    public customerId: number,
    public mealPlan: eMealPlan,
    public date: Date,
    public fromTime: string,
    public toTime: string,
    public token: number,
    public noOfPersons: number,
    public status: eBookingStatus
  ) {
    console.log("Booking constructor invoked!");
  }

  getBooking() {
    if (this.date > new Date()) {
      if (monthDiff(new Date(), this.date) <= 1) {
        return {
          id: this.id,
          tableId: this.tableId,
          customerId: this.customerId,
          mealPlan: eMealPlan[this.mealPlan],
          date: this.date,
          fromTime: this.fromTime,
          toTime: this.toTime,
          token: this.token,
          noOfPersons: this.noOfPersons,
          status: eBookingStatus[this.status],
        };
      } else {
        throw new Error("Can book table within 1 month only!");
      }
    } else {
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

export { Booking };

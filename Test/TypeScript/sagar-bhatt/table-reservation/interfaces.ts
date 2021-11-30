import {
  eGender,
  eRoom,
  eMealPlan,
  eTableStatus,
  eBookingStatus,
} from "./enum";

// * Customer
interface iCustomer {
  id: Number;
  firstName: string;
  lastName: string;
  gender: eGender;
  email: string;
  phone: number;
  nationality: string;
}

// * Country
interface iCountry {
  id: number;
  countryName: string;
}

// * Restaurant
interface iRestaurant {
  id: number;
  name: string;
  location: string;
  countryId: number;
}

// * Room
interface iRoom {
  id: number;
  restaurantId: number;
  room: eRoom;
}

// * Table
interface iTable {
  id: number;
  roomId: number;
  status: eTableStatus;
  noOfPersons: number;
}

// * Booking:
interface iBooking {
  id: number;
  tableId: number;
  customerId: number;
  mealPlan: eMealPlan;
  date: Date;
  fromTime: string;
  toTime: string;
  token: number;
  noOfPersons: number;
  status: eBookingStatus;
}

export { iCustomer, iCountry, iRestaurant, iRoom, iTable, iBooking };

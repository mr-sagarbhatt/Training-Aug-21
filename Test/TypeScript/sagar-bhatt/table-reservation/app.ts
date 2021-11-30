import {
  eGender,
  eRoom,
  eMealPlan,
  eTableStatus,
  eBookingStatus,
} from "./enum";
import { generateToken, monthDiff } from "./functions";

import { Customer } from "./classes/Customer";
import { Country } from "./classes/Country";
import { Restaurant } from "./classes/Restaurant";
import { Room } from "./classes/Room";
import { Table } from "./classes/Table";
import { Booking } from "./classes/Booking";
import { iCustomer, iRestaurant, iTable } from "./interfaces";

// * Customer
const objCustomer1: Customer = new Customer(
  1,
  "sagar",
  "bhatt",
  eGender.male,
  "bhattsagar112@gmail.com",
  7600608432,
  "Indian"
);
const objCustomer2: Customer = new Customer(
  2,
  "harsh",
  "bhatt",
  eGender.male,
  "bhattharsh19@gmail.com",
  7600608432,
  "Indian"
);

const customer1 = objCustomer1.getCustomer();
const customer2 = objCustomer2.getCustomer();
const arrCustomers = [customer1, customer2];

// * Country
const objCountry1: Country = new Country(1, "India");
const objCountry2: Country = new Country(2, "USA");

const country1 = objCountry1.getCountry();
const country2 = objCountry2.getCountry();
const arrCountries = [country1, country2];

// * Restaurant
const objRestaurant1: Restaurant = new Restaurant(1, "Marutinandan", "RTO", 1);
const objRestaurant2: Restaurant = new Restaurant(
  2,
  "Portobanco",
  "Los Angeles",
  2
);

const restaurant1 = objRestaurant1.getRestaurant();
const restaurant2 = objRestaurant2.getRestaurant();
const arrRestaurants = [restaurant1, restaurant2];

// * Room
const objRoom1: Room = new Room(1, 1, eRoom.Meeting);
const objRoom2: Room = new Room(2, 2, eRoom.Casual);

const room1 = objRoom1.getRoom();
const room2 = objRoom2.getRoom();
const arrRooms = [room1, room2];

// * Table
const objTable1: Table = new Table(1, 1, 5, eTableStatus.available);
const objTable2: Table = new Table(2, 2, 8, eTableStatus.available);

const table1 = objTable1.getTable();
const table2 = objTable2.getTable();
const arrTables = [table1, table2];

// * Booking:
const objBooking1: Booking = new Booking(
  1,
  1,
  1,
  eMealPlan.launch,
  new Date("2021-12-3"),
  "11.20",
  "12.20",
  generateToken(),
  5,
  eBookingStatus.pending
);
const objBooking2: Booking = new Booking(
  2,
  2,
  2,
  eMealPlan.dinner,
  new Date("2021-12-3"),
  "11.20",
  "12.20",
  generateToken(),
  5,
  eBookingStatus.pending
);
const objBooking3: Booking = new Booking(
  3,
  2,
  2,
  eMealPlan.dinner,
  new Date("2021-12-1"),
  "11.20",
  "12.20",
  generateToken(),
  5,
  eBookingStatus.pending
);

const booking1 = objBooking1.getBooking();
const booking2 = objBooking2.getBooking();
const booking3 = objBooking3.getBooking();
const arrBookings = [booking1, booking2, booking3];
console.log(arrBookings);

// *------------------------------------------------------------------------------*
// ? 1: Provide the list of restaurants in the country so that the user can choose accordingly.
const listOfRestaurants = (arrRestaurants, countryId): void => {
  const restaurants = arrRestaurants.filter(
    (elem) => elem.countryId === countryId
  );
  console.log("List of Restaurants: ", restaurants);
};
listOfRestaurants(arrRestaurants, 1);

// ? 2: Provide the list of tables available for online reservation at different dining rooms in the restaurant.
// ? 3: Mention the number of guests that can be accommodated on the particular table.
// * Available tables
const availableTables = (arrTables, roomId): void => {
  const tables = arrTables.filter(
    (elem) =>
      elem.status === eTableStatus[eTableStatus.available] &&
      elem.roomId === roomId
  );
  if (tables.length !== 0) {
    console.log(`List of available Tables for ${eRoom[roomId]}: `, tables);
  }
};
availableTables(arrTables, eRoom.Casual);
availableTables(arrTables, eRoom.Meeting);
availableTables(arrTables, eRoom.couple);
availableTables(arrTables, eRoom.family);

// ? 4: Accept the booking for tables.
const acceptBooking = (arrBookings, bookingId): void => {
  const booking = arrBookings.find((elem) => elem.id === bookingId);
  booking.status = eBookingStatus[eBookingStatus.accepted];
  console.log("Booking Accepted: ", booking);
};
acceptBooking(arrBookings, 1);

// ? 7: Give a token number to the customer as an acknowledgement of booking.
const token1 = objBooking1.getToken();
const token2 = objBooking2.getToken();
console.log(token1, token2);

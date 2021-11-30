"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enum_1 = require("./enum");
const Customer_1 = require("./classes/Customer");
const Country_1 = require("./classes/Country");
const Restaurant_1 = require("./classes/Restaurant");
const Room_1 = require("./classes/Room");
const Table_1 = require("./classes/Table");
const Booking_1 = require("./classes/Booking");
// * Customer
const objCustomer1 = new Customer_1.Customer(1, "sagar", "bhatt", enum_1.eGender.male, "bhattsagar112@gmail.com", 7600608432, "Indian");
const objCustomer2 = new Customer_1.Customer(2, "harsh", "bhatt", enum_1.eGender.male, "bhattharsh19@gmail.com", 7600608432, "Indian");
const customer1 = objCustomer1.getCustomer();
const customer2 = objCustomer2.getCustomer();
const arrCustomers = [customer1, customer2];
// * Country
const objCountry1 = new Country_1.Country(1, "India");
const objCountry2 = new Country_1.Country(2, "USA");
const country1 = objCountry1.getCountry();
const country2 = objCountry2.getCountry();
const arrCountries = [country1, country2];
// * Restaurant
const objRestaurant1 = new Restaurant_1.Restaurant(1, "Marutinandan", "RTO", 1);
const objRestaurant2 = new Restaurant_1.Restaurant(2, "Portobanco", "Los Angeles", 2);
const restaurant1 = objRestaurant1.getRestaurant();
const restaurant2 = objRestaurant2.getRestaurant();
const arrRestaurants = [restaurant1, restaurant2];
// * Room
const objRoom1 = new Room_1.Room(1, 1, enum_1.eRoom.Meeting);
const objRoom2 = new Room_1.Room(2, 2, enum_1.eRoom.Casual);
const room1 = objRoom1.getRoom();
const room2 = objRoom2.getRoom();
const arrRooms = [room1, room2];
// * Table
const objTable1 = new Table_1.Table(1, 1, 5, enum_1.eTableStatus.available);
const objTable2 = new Table_1.Table(2, 2, 8, enum_1.eTableStatus.available);
const table1 = objTable1.getTable();
const table2 = objTable2.getTable();
const arrTables = [table1, table2];
// * Booking:
const objBooking1 = new Booking_1.Booking(1, 1, 1, enum_1.eMealPlan.launch, new Date("2021-12-3"), "11:20pm", "12:20pm", generateToken(), 5, enum_1.eBookingStatus.pending);
const objBooking2 = new Booking_1.Booking(2, 2, 2, enum_1.eMealPlan.dinner, new Date("2021-12-3"), "11:20pm", "12:20pm", generateToken(), 5, enum_1.eBookingStatus.pending);
const booking1 = objBooking1.getBooking();
const booking2 = objBooking2.getBooking();
const arrBookings = [booking1, booking2];
// *------------------------------------------------------------------------------*
// ? 1: Provide the list of restaurants in the country so that the user can choose accordingly.
const listOfRestaurants = (arrRestaurants, countryId) => {
    const restaurants = arrRestaurants.filter((elem) => elem.countryId === countryId);
    console.log("List of Restaurants: ", restaurants);
};
listOfRestaurants(arrRestaurants, 1);
// ? 2: Provide the list of tables available for online reservation at different dining rooms in the restaurant.
// ? 3: Mention the number of guests that can be accommodated on the particular table.
// * Available tables
const availableTables = (arrTables, roomId) => {
    const tables = arrTables.filter((elem) => elem.status === enum_1.eTableStatus[enum_1.eTableStatus.available] &&
        elem.roomId === roomId);
    if (tables.length !== 0) {
        console.log(`List of available Tables for ${enum_1.eRoom[roomId]}: `, tables);
    }
};
availableTables(arrTables, enum_1.eRoom.Casual);
availableTables(arrTables, enum_1.eRoom.Meeting);
availableTables(arrTables, enum_1.eRoom.couple);
availableTables(arrTables, enum_1.eRoom.family);
// ? 4: Accept the booking for tables.
const acceptBooking = (arrBookings, bookingId) => {
    const booking = arrBookings.find((elem) => elem.id === bookingId);
    booking.status = enum_1.eBookingStatus[enum_1.eBookingStatus.accepted];
    console.log("Booking Accepted: ", booking);
};
acceptBooking(arrBookings, 1);
// ? 5: Online table reservations are done 6hrs in advance for the current date.
// ? 6: Table reservation can be done up to one month in advance.
// ? 7: Give a token number to the customer as an acknowledgement of booking.
const token1 = objBooking1.getToken();
const token2 = objBooking2.getToken();
console.log(token1, token2);
function generateToken() {
    const token = Math.floor(Math.random() * 100000000);
    return token;
}

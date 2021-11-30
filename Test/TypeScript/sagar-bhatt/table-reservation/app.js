"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enum_1 = require("./enum");
const Customer_1 = require("./classes/Customer");
const Country_1 = require("./classes/Country");
const Restaurant_1 = require("./classes/Restaurant");
const Room_1 = require("./classes/Room");
// * Customer
const objCustomer1 = new Customer_1.Customer(1, "sagar", "bhatt", enum_1.eGender.male, "bhattsagar112@gmail.com", 7600608432, "Indian");
const objCustomer2 = new Customer_1.Customer(2, "harsh", "bhatt", enum_1.eGender.male, "bhattharsh19@gmail.com", 7600608432, "Indian");
const customer1 = objCustomer1.getCustomer();
const customer2 = objCustomer2.getCustomer();
const arrCustomer = [customer1, customer2];
console.log("List of Customers: ", arrCustomer);
// * Country
const objCountry1 = new Country_1.Country(1, "India");
const objCountry2 = new Country_1.Country(2, "USA");
const country1 = objCountry1.getCountry();
const country2 = objCountry2.getCountry();
const arrCountry = [country1, country2];
console.log("List of Countries: ", arrCountry);
// * Restaurant
const objRestaurant1 = new Restaurant_1.Restaurant(1, "Marutinandan", "RTO", 1);
const objRestaurant2 = new Restaurant_1.Restaurant(2, "Portobanco", "Los Angeles", 2);
const restaurant1 = objRestaurant1.getRestaurant();
const restaurant2 = objRestaurant2.getRestaurant();
const arrRestaurant = [restaurant1, restaurant2];
console.log("List of Restaurants: ", arrRestaurant);
// * Room
const objRoom1 = new Room_1.Room(1, 1, enum_1.eRoom.Meeting);
const objRoom2 = new Room_1.Room(2, 2, enum_1.eRoom.Casual);
const room1 = objRoom1.getRoom();
const room2 = objRoom2.getRoom();
const arrRoom = [room1, room2];
console.log("List of Rooms: ", arrRoom);

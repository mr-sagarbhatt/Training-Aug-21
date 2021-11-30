"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eBookingStatus = exports.eTableStatus = exports.eMealPlan = exports.eRoom = exports.eGender = void 0;
var eGender;
(function (eGender) {
    eGender[eGender["male"] = 1] = "male";
    eGender[eGender["female"] = 2] = "female";
})(eGender || (eGender = {}));
exports.eGender = eGender;
var eRoom;
(function (eRoom) {
    eRoom[eRoom["couple"] = 1] = "couple";
    eRoom[eRoom["family"] = 2] = "family";
    eRoom[eRoom["Meeting"] = 3] = "Meeting";
    eRoom[eRoom["Casual"] = 4] = "Casual";
})(eRoom || (eRoom = {}));
exports.eRoom = eRoom;
var eMealPlan;
(function (eMealPlan) {
    eMealPlan[eMealPlan["breakfast"] = 1] = "breakfast";
    eMealPlan[eMealPlan["launch"] = 2] = "launch";
    eMealPlan[eMealPlan["dinner"] = 3] = "dinner";
})(eMealPlan || (eMealPlan = {}));
exports.eMealPlan = eMealPlan;
var eTableStatus;
(function (eTableStatus) {
    eTableStatus[eTableStatus["reserved"] = 1] = "reserved";
    eTableStatus[eTableStatus["available"] = 2] = "available";
})(eTableStatus || (eTableStatus = {}));
exports.eTableStatus = eTableStatus;
var eBookingStatus;
(function (eBookingStatus) {
    eBookingStatus[eBookingStatus["reserved"] = 1] = "reserved";
    eBookingStatus[eBookingStatus["pending"] = 2] = "pending";
    eBookingStatus[eBookingStatus["canceled"] = 3] = "canceled";
})(eBookingStatus || (eBookingStatus = {}));
exports.eBookingStatus = eBookingStatus;

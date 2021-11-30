enum eGender {
  male = 1,
  female = 2,
}

enum eRoom {
  couple = 1,
  family = 2,
  Meeting = 3,
  Casual = 4,
}

enum eMealPlan {
  breakfast = 1,
  launch = 2,
  dinner = 3,
}

enum eTableStatus {
  reserved = 1,
  available = 2,
}

enum eBookingStatus {
  reserved = 1,
  pending = 2,
  canceled = 3,
}

export { eGender, eRoom, eMealPlan, eTableStatus, eBookingStatus };
